import { useRouter } from "next/router";
import styled from "@emotion/styled";
import SecondaryButton from "../../src/components/buttons/SecondaryButton";
import React, { useEffect, useState, useMemo, use } from "react";
import { useAppSelector, initializeStore, useAppDispatch } from "../../src/store";
import { PropertyModel } from "../../src/slices/properties";
import { makeAuthedApiRequest } from "../../src/utils/api/apiHelper";
import { AzeretMonoParagraph, H3, H5, MintParagraph } from "../../src/components/Typography/Typography";
import { colors } from "../../src/styles/colors";

import { useDevice } from "../../src/contexts/DeviceContext";
import { fetchOfferById } from "../../src/slices/offers";
import { GetServerSidePropsContext } from 'next';
import {DocumentTypes} from "../../src/components/offerDocuments/LandingPage";
import BasicParentModal from "../../src/components/boxes/modals/BasicParentModal";
import numeral from "numeral";

import Select from "react-select";
import { customStylesTaller } from "../../src/constants";
import { OfferModel } from "../../src/models/offerModel";

import { MOPHeader, MOPSubcontainer, MOPSubheader } from "../../src/components/make-offer/MakeOfferPageComponents";
import { OfferReviewLine } from "../../src/components/make-offer/MakeOfferReviewPage";
import { canUserSignOffer, formatMoney } from "../../src/utils/helpers";
import StyledInputComponent from "../../src/components/boxes/StyledInput";

import { createSignaturesSection } from "../../src/components/make-offer/MakeOfferReviewPage";
import StatusMessage from "../../src/components/stuff/StatusMessage";
import AcknowledgmentCheckbox from "../../src/components/boxes/AcknowledgmentCheckbox";
import { formatPhoneNumber } from "../../src/utils/helpers";

import { fetchSellerDisclosureByPropertyId } from "../../src/slices/sellerDisclosure";
import { sellerDisclosureModel } from "../../src/models/sellerDisclosureModel";
import Link from "next/link";
import { fetchUser } from "../../src/slices/user";
import { fetchDocumentsForOfferById } from "../../src/slices/documents";
import dynamic from 'next/dynamic';
import Spinner from "../../src/components/stuff/LoadingSpinner";
import { AxiosError } from "axios";
const PDFViewer = dynamic(() => import('../../src/components/stuff/PDFView'), { ssr: false });

const OfferHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 92px;
    padding: 0 20px;
    border-bottom: 1px solid #CACFCA;
`

const MOPHeaderBtnContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const ContentBackground = styled.div`
  display: flex;
  justify-content: center;
  background-color: ${colors.gray100};
`;

const FloatingNav = styled.div<{ isMobile?: boolean }>`
  position: fixed;
  bottom: ${(props) => (props.isMobile ? "20px" : "50px")};
  z-index: 100;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const BottomGradientShadow = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 150px;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.3));
  pointer-events: none;
  z-index: 50;
`;

const FloatingNavContainer = styled.div<{ isMobile?: boolean }>`
  padding: 10px;
  display: flex;
  flex-direction: ${(props) => (props.isMobile ? "column" : "row")};
  align-items: center;
  justify-content: center;
  background-color: white;
  border-radius: 16px;
  margin: 0 20px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.15), 0 5px 10px rgba(0, 0, 0, 0.15);
`;
const FloatingDropdownContainer = styled.div<{ isMobile?: boolean, removeBorder?: boolean }>`
  padding-right: ${(props) => (props.isMobile ? "0" : "22px")};
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: ${(props) =>
        props.isMobile ? "none" : props.removeBorder ? 'none' : `1px solid ${colors.gray300}`};
`;
const DocNavButton = styled.button`
  border: 1px solid ${colors.gray600};
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  width: 48px;
  height: 48px;
  &:hover {
    background-color: ${colors.gray100};
  }
  &:active {
    background-color: ${colors.gray200};
  }
  &:disabled {
    background-color: white;
        border: 1px solid ${colors.gray100};
    }
    
`

const ContentContainer = styled.div<{isMobile?: boolean}>`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: ${props => props.isMobile ? '2px' : '24px'};
    background-color: white;
    box-sizing: border-box;
    width: 100%;
`;

const rightSVG = (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
<path d="M6.75 4.5L11.25 9L6.75 13.5" stroke="#1B311C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>)
const rightGraySVG = (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M6.75 4.5L11.25 9L6.75 13.5" stroke="#B3B9B3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
);

const leftGraySVG = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="19"
        viewBox="0 0 18 19"
        fill="none"
    >
        <path
            d="M11.25 14L6.75 9.5L11.25 5"
            stroke="#B3B9B3"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
    </svg>
);

const leftSVG = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="19"
        viewBox="0 0 18 19"
        fill="none"
    >
        <path
            d="M11.25 14L6.75 9.5L11.25 5"
            stroke="#1B311C"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
    </svg>
);

type DocumentType = {
    value: string;
    label: string;
    numberPages: number;
    url?: string;
};

type SignatureRole = 'BUYER_1' | 'BUYER_2' | 'SELLER_1' | 'SELLER_2' | 'BUYER_AGENT'| 'SELLER_AGENT' | 'NONE';



const OfferReviewPage = (props: { property: PropertyModel, error: boolean}) => {
    
    const router = useRouter();
    const { offerId } = router.query;
    const offer: OfferModel = useAppSelector((state) => state.offersReducer.selectedOffer);

    const { isMobile, windowSize } = useDevice();
    const [ signedDocuments, setSignedDocuments ] = useState<DocumentTypes[]>([]);
    const addDocument = (newDocument: DocumentTypes) => {
        const documentExists = signedDocuments.some(doc => doc === newDocument);
        if (!documentExists) {
            const updatedDocuments = [...signedDocuments, newDocument];
            setSignedDocuments(updatedDocuments);
            return updatedDocuments;
        }
        return signedDocuments;
    };
    
    const [ selectedDocumentIndex, setSelectedDocumentIndex ] = useState(0);
    const [ shouldShowModal, setShouldShowModal ] = useState(false);
    const [ shouldShowIntroModal, setShouldShowIntroModal ] = useState(offer?.status !== 'ACCEPTED');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [selectedPage, setSelectedPage] = useState(1);


    const [signatureRole, setSignatureRole] = useState<SignatureRole>('SELLER_AGENT');
    const [brokerageName, setBrokerageName] = useState('');
    const [brokerageLicenseNumber, setBrokerageLicenseNumber] = useState('');
    const [brokerAddress, setBrokerAddress] = useState('');
    const [licenseeLicenseNumber, setLicenseeLicenseNumber] = useState('');

    const [initialPamphlet, setInitialPamphlet] = useState('');
    const [initial10DayPeriod, setInitial10DayPeriod] = useState('');
    const [initialAgentResponsibility, setInitialAgentResponsibility] = useState('');

    const [purchaseAndSaleAgreementSignature, setPurchaseAndSaleAgreementSignature] = useState('');
    const [sellerDisclosureSignature, setSellerDisclosureSignature] = useState('');
    const [leadBasedPaintDisclosureSignature, setLeadBasedPaintDisclosureSignature] = useState('');
    const [temporaryOccupancyBuyerSignature, setTemporaryOccupancyBuyerSignature] = useState('');
    const [temporaryOccupancySellerSignature, setTemporaryOccupancySellerSignature] = useState('');
    const [closingAttorneyAsHolderOfEarnestMoneySignature, setClosingAttorneyAsHolderOfEarnestMoneySignature] = useState('');
    const [escalationSignature, setEscalationSignature] = useState('');
    const [shouldShowSignatureSendScreen, setShouldShowSignatureSendScreen] = useState(false);
    const [apiResponseMessage, setApiResponseMessage] = useState('');
    const [headerMessage, setHeaderMessage] = useState('Signing Documents');
    
    const [isAcknowledgementChecked, setIsAcknowledgementChecked] = useState(false);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchUser());
        dispatch(fetchDocumentsForOfferById({id: offerId as string}));
    }, [dispatch, offerId]);
    const documents = useAppSelector((state) => state.documentsReducer.documents);
    const documentStatus = useAppSelector((state) => state.documentsReducer.status);

    const currentDocumentTotalPages = documents?.[selectedDocumentIndex]?.numberPages || 0;

    const user = useAppSelector((state) => state.userReducer.user);
    const isOfferExpired = () => {
        const currentDate = new Date();
        const expiryDate = new Date(offer?.expiryDate as Date);
        return currentDate > expiryDate;
    };
    const sellerDisclosureProperty: sellerDisclosureModel = useAppSelector((state) => state.sellerDisclosureReducer.sellerDisclosureProperty);



    const [currentSignatureScreen, setCurrentSignatureScreen] = useState(0);


    const [isNextEnabled, setIsNextEnabled] = useState(false);

    const closeIntroModal = () => {
        setShouldShowIntroModal(false)
    }
    const closeModal = () => {
        setShouldShowModal(false)
    }

    function updateEnabled(
        firstName: string,
        lastName: string,
        address: string,
        phoneNumber: string,
        signature: string,
        acknowledgement: boolean
    ) {
        setIsNextEnabled(!!lastName && !!firstName && !!phoneNumber && !!signature && !!address && acknowledgement);
    }

    const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formattedNumber = formatPhoneNumber(e.target.value);
        setPhone(formattedNumber);
        updateEnabled(firstName, lastName, address, formattedNumber, purchaseAndSaleAgreementSignature, isAcknowledgementChecked);
    };
    const getNavigationUrl = () => {
        switch (signatureRole) {
            case 'BUYER_1':
            case 'BUYER_2':
            case 'BUYER_AGENT':
                return `/make-offer?offerId=${offer.id}`;
            case 'SELLER_1':
            case 'SELLER_2':
            case 'SELLER_AGENT':
                return `/offer-details?offerId=${offer.id}&propertyId=${offer.propertyId}`;
            default:
                return ''; // default case, might not be used
        }
    };
    useEffect(() => {
        if (!user) {
            setSignatureRole('NONE');
            return;
        }
        if (user.id === offer.buyerAgentUserId) {
            setSignatureRole('BUYER_AGENT');
            return;
        }
        if (user.id === offer.sellerAgentUserId) {
            setSignatureRole('SELLER_AGENT');
            return;
        }
        if (user.id === offer.buyerUserId) {
            setSignatureRole('BUYER_1');
            return;
        }
        if (user.id === offer.secondBuyerUserId) {
            setSignatureRole('BUYER_2');
            return;
        }
        if (user.id === offer.sellerSignerUserId) {
            setSignatureRole('SELLER_1');
            return;
        }
        if (user.id === offer.secondSellerSignerUserId) {
            setSignatureRole('SELLER_2');
            return;
        }
        setSignatureRole('NONE');
    }, [user, offer]);
    if (props.error) {
        return (
            <div>There was an error loading this page. Please try again.</div>
        )
    }
    const isOfferSignable = offer?.status === 'PREPARING' || offer?.status === 'PENDING-BUYER-SIGNATURE' || offer?.status === 'PENDING-SELLER-SIGNATURE' && !isOfferExpired();
    const canUserSign = canUserSignOffer(offer, user?.id);


    const {
        knownLeadPaint,
        leadPaintExtraInfo,
        leadBasedPaintReports,
        leadBasedPaintReportsExtraInfo
    } = sellerDisclosureProperty[props.property.id];
    const property = props.property || {} as PropertyModel;
    

    const address2String = property.address2 ? property.address2 + ' ' : '';
    const addressData = property.city + ', ' + property.state + ' ' + property.zip;

    const downPaymentPercent = (offer.downPaymentAmt && offer.offerAmt) 
    ? Math.round((offer.downPaymentAmt / offer.offerAmt) * 10000) / 100
    : 0;
    const offerPrice = numeral(offer.offerAmt);
    const realtorFee = offerPrice.value() as number * (offer.buyerSideCommission! / 100);
    const signaturesChildren = createSignaturesSection(offer);


    const nextSignatureScreen = async (document: DocumentTypes) => {
        try {
            let signed = addDocument(document);
            if (currentSignatureScreen === documents.length - 1 || signatureRole === 'BUYER_AGENT' || signatureRole === 'SELLER_AGENT') {
                if (signatureRole === 'SELLER_AGENT' && initialAgentResponsibility) {
                    signed = ['LEAD_BASED', 'PSA']
                }
                setShouldShowSignatureSendScreen(true);
                const now = new Date();
                const data = {
                    purchaseAndSaleAgreementSignature,
                    sellerDisclosureSignature,
                    leadBasedPaintDisclosureSignature,
                    temporaryOccupancyBuyerSignature,
                    temporaryOccupancySellerSignature,
                    closingAttorneyAsHolderOfEarnestMoneySignature,
                    escalationSignature,
                    documents,
                    offerId: offer.id,
                    updatedAt: offer.updatedAt,
                    firstName,
                    lastName,
                    address,
                    phone,
                    isAcknowledgementChecked,
                    signatureTimestamp: now.toISOString(),
                    signedDocuments: signed,
                    brokerageName,
                    brokerageLicenseNumber,
                    brokerAddress,
                    licenseeLicenseNumber,
                    initialPamphlet,
                    initial10DayPeriod,
                    initialAgentResponsibility,
                }
    
                const response = await makeAuthedApiRequest({ method: 'post', data, urlExtension: '/v1/offer/signOffer' });
                
                if (response.status >= 200 && response.status < 300) {
                    setApiResponseMessage("Congrats! You just successfully signed this offer, if everyone in your group has signed the other side will be notified. If not, tell your group members to sign so you can get this offer submitted.");
                    setHeaderMessage("Offer Signed");
                    dispatch(fetchDocumentsForOfferById({ id: offer.id }));
                    dispatch(fetchOfferById({ offerId: offer.id }));
                } else {
                    throw new Error(response.statusText || "Error occurred while signing documents.");
                }
            }
            if (currentSignatureScreen < documents.length - 1) {
                setCurrentSignatureScreen(prevScreen => prevScreen + 1);
            }
        } catch (error) {
            const axiosError = error as AxiosError;
            if (axiosError.response) {
                // Set the header message based on the status code
                if (axiosError.response.status === 401) {
                    setHeaderMessage("Error signing offer");
                } else if (axiosError.response.status >= 500) {
                    setHeaderMessage("Error signing offer");
                } else {
                    setHeaderMessage("Error");
                }
        
                // Set the response message
                const message = typeof axiosError.response.data === 'string' 
                                ? axiosError.response.data 
                                : "An unexpected error occurred. Please refresh the page and try again. If this continues, reach out to support@housewell.com for assistance.";
                setApiResponseMessage(message + ". If this error is not correct, please reach out to Housewell for assistance either via message or email at support@housewell.com");
            } else {
                setHeaderMessage("Error");
                setApiResponseMessage("An unexpected error occurred. Please try again.");
            }
        }
    };
    

    const prevSignatureScreen = () => {
        if (currentSignatureScreen > 0) {
            setCurrentSignatureScreen(prevScreen => prevScreen - 1);
        }
    }

    const getSignatureContent = (documentType: DocumentType) => {
        if (shouldShowSignatureSendScreen || apiResponseMessage) {
            return (
                <div>
                    <H3 style={{ marginBottom: '24px' }}>{headerMessage}</H3>
                    {apiResponseMessage && <MintParagraph size={isMobile ? '24' : '32'} weight="medium" style={{ marginTop: isMobile ? '24px' : '0' }}>
                        {apiResponseMessage}
                    </MintParagraph>}
                    {!apiResponseMessage && <Spinner />}
                </div>
            );
        }
        
        const possessionDate = new Date(offer.possessionDate as Date);
        const formattedPossessionDate = `${possessionDate.toLocaleString('en-US', { month: 'long' })} ${possessionDate.getDate()} ${possessionDate.getFullYear()}`;
        const closingDate = new Date(offer.closingDate as Date);
        const formattedClosingDate = `${closingDate.toLocaleString('en-US', { month: 'long' })} ${closingDate.getDate()}, ${closingDate.getFullYear()}`;
        switch (documentType.value) {
            case 'PSA':
                // Return JSX content specific to PSA
                return  (
                    <ContentContainer isMobile={isMobile}>
                <MintParagraph size={isMobile ? '24' : "32"} weight="medium" style={{marginTop: isMobile ? '24px': '0'}}>Sign Purchase and Sale Agreement</MintParagraph>
                <MOPSubcontainer style={{ marginBottom: "48px", width: '100%', borderTop: 'none'}}>
                    <MOPHeaderBtnContainer>
                        <MOPHeader title={"Financial Overview"}/>
                    </MOPHeaderBtnContainer>

                    <OfferReviewLine title={"Offer Amount"} body={`${formatMoney(offer.offerAmt)}`} />
                    <OfferReviewLine title={"Offer Type"} body={offer.offerType === "ESCALATION" ? "Escalation-clause" : "Fixed-price"} />
                    <OfferReviewLine title={"Financing"} body={offer.loanType === "VA" ? "VA Loan" : (offer.loanType === "FHA" ? "FHA Loan" : "Conventional Loan") } />
                    <OfferReviewLine title={"Down Payment"} body={`${formatMoney(offer.downPaymentAmt)} (${downPaymentPercent}%)`} />
                    <OfferReviewLine title={"Seller's Contribution"} body={`${formatMoney(offer.sellerClosingAmt)}`} />
                    {!offer.buyerAgentUserId && <OfferReviewLine title={`Housewell Rebate (${offer.buyerSideCommission}%)`} body={`$${realtorFee.toLocaleString('en-US', { maximumFractionDigits: 0 })}`} />}
                    <OfferReviewLine title={"Earnest Money"} body={`${formatMoney(offer.earnestMoneyAmt)}`} noBorder />
                </MOPSubcontainer>
                <MOPSubcontainer style={{ marginBottom: "48px", width: '100%', borderTop: 'none'}}>
                    <MOPHeaderBtnContainer>
                        <MOPHeader title={"Signatures"}/>
                    </MOPHeaderBtnContainer>

                        {signaturesChildren.length > 0 ? signaturesChildren : <MintParagraph size={"18"} weight={"medium"}>No contingencies selected.</MintParagraph>}
                </MOPSubcontainer>
                <MOPSubheader title={"Phone"} margin="12px 0"/>
                <StyledInputComponent
                        style={{width:"100%"}}
                        placeholder="Phone"
                        autoComplete="address-line1"
                        onChange={handlePhoneNumberChange}
                        value={phone}
                    />
                <MOPSubheader title={"Current Street Address"} margin="12px 0"/>
                <StyledInputComponent
                        style={{width:"100%"}}
                        placeholder="Address"
                        autoComplete="address-line1"
                        onChange={(e) => {
                            setAddress(e.target.value); 
                            updateEnabled(firstName, lastName, e.target.value, phone, purchaseAndSaleAgreementSignature, isAcknowledgementChecked); 
                        }}
                        value={address}
                    />
                
                <MOPSubheader title={"First Name"} margin="12px 0"/>
                <StyledInputComponent
                        style={{width:"100%"}}
                        placeholder="First Name"
                        autoComplete="given-name"
                        onChange={(e) => {
                            setFirstName(e.target.value);
                            updateEnabled(e.target.value, lastName, address, phone, purchaseAndSaleAgreementSignature, isAcknowledgementChecked); 
                        }}
                        value={firstName}
                    />
                <MOPSubheader title={"Last Name"} margin="12px 0"/>
                <StyledInputComponent
                        style={{width:"100%"}}
                        placeholder="Last Name"
                        autoComplete="family-name"
                        onChange={(e) => {
                            setLastName(e.target.value); 
                            updateEnabled(firstName, e.target.value, address, phone, purchaseAndSaleAgreementSignature, isAcknowledgementChecked); 
                        }}
                        value={lastName}
                />
                {(signatureRole === 'BUYER_AGENT' || signatureRole === 'SELLER_AGENT') && 
                <>
                    <MOPSubcontainer style={{ marginBottom: "48px", width: '100%', borderTop: 'none'}}>
                        <MOPHeaderBtnContainer>
                            <MOPHeader title={"Brokerage & Agent Info"}/>
                        </MOPHeaderBtnContainer>
                        <MOPSubheader title={"Brokerage Name"} margin="12px 0"/>
                        <StyledInputComponent
                            style={{width:"100%"}}
                            placeholder="Brokerage Name"
                            onChange={(e) => {
                                setBrokerageName(e.target.value); 
                            }}
                            value={brokerageName}
                        />
                        <MOPSubheader title={"Brokerage License Number"} margin="12px 0"/>
                        <StyledInputComponent
                            style={{width:"100%"}}
                            placeholder="Brokerage License Number"
                            onChange={(e) => {
                                setBrokerageLicenseNumber(e.target.value); 
                            }}
                            value={brokerageLicenseNumber}
                        />
                        <MOPSubheader title={"Broker Address"} margin="12px 0"/>
                        <StyledInputComponent
                            style={{width:"100%"}}
                            placeholder="Broker Address"
                            onChange={(e) => {
                                setBrokerAddress(e.target.value);
                            }}
                            value={brokerAddress}
                        />
                        <MOPSubheader title={"Licensee License Number"} margin="12px 0"/>
                        <StyledInputComponent
                            style={{width:"100%"}}
                            placeholder="License Number"
                            onChange={(e) => {
                                setLicenseeLicenseNumber(e.target.value);
                            }}
                            value={licenseeLicenseNumber}
                        />
                    </MOPSubcontainer>
                    {(signatureRole === 'SELLER_AGENT' && documents.some(doc => doc.value === 'LEAD_BASED')) && 
                        <><MOPSubheader title={"Lead Paint Responsibility"} margin="12px 0"/>
                            <StatusMessage style={{ margin: "0" }} hasIcon>
                                <MintParagraph size={"14"} weight={"medium"}>Initial here to acknowledge your responsibility under 42 U.S.C. 4852d and are aware of your responsibility to ensure compliance.</MintParagraph>
                            </StatusMessage>
                            <StyledInputComponent
                                style={{width:"100%", marginBottom: '12px'}}
                                placeholder="XXX"
                                onChange={(e) => {
                                    setInitialAgentResponsibility(e.target.value); 
                                }}
                                maxLength={4}
                                isCursive
                                value={initialAgentResponsibility}
                            />
                        </>}

                        
                </>}
                <MOPSubheader title={"Signature"} margin="12px 0"/>
                <StatusMessage style={{ margin: "0" }} hasIcon>
                    <MintParagraph size={"14"} weight={"medium"}>This is how your signature will appear on the Purchase and Sale Agreement.</MintParagraph>
                </StatusMessage>
                <StyledInputComponent
                        style={{width:"100%", marginBottom: '12px'}}
                        placeholder="Signature"
                        onChange={(e) => {
                            setPurchaseAndSaleAgreementSignature(e.target.value); 
                            updateEnabled(firstName, lastName, address, phone, e.target.value,isAcknowledgementChecked); 
                        }}
                        isCursive
                        value={purchaseAndSaleAgreementSignature}
                />
                <AcknowledgmentCheckbox
                    isChecked={isAcknowledgementChecked}
                    onToggle={() => {
                        const newCheckedState = !isAcknowledgementChecked;
                        setIsAcknowledgementChecked(newCheckedState);
                        updateEnabled(firstName, lastName, address, phone, purchaseAndSaleAgreementSignature, newCheckedState);
                    }}
                />
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop:'20px', width: '100%'}}>
                    <div></div>
                    <SecondaryButton disabled={!isNextEnabled} text={currentSignatureScreen === documents.length - 1 ? "Sign & Finish" : "Sign"} size="medium" hasArrow onClick={() => nextSignatureScreen('PSA')}></SecondaryButton>
                </div>

            </ContentContainer>
                );


            case 'TEMP_OCC_BUYER':
                // Return JSX content specific to TEMP_OCC_BUYER
                return (<ContentContainer isMobile={isMobile}>
                    <MOPSubcontainer style={{ marginBottom: "48px", width: '100%', borderTop: 'none'}}>
                        <MOPHeaderBtnContainer>
                            <MOPHeader title={"Sign Temporary Occupancy Buyer"}/>
                        </MOPHeaderBtnContainer>
    
                        <OfferReviewLine title={"Possession Date"} body={formattedPossessionDate} />
                        <OfferReviewLine title={"Closing Date"} body={formattedClosingDate} />
                        <OfferReviewLine title={"Daily Rental Cost"} body={`${formatMoney(offer.tempOccBuyerDailyCost)}`} />
                    </MOPSubcontainer>
                    <MOPSubheader title={"Signature"} margin="12px 0"/>
                    <StatusMessage style={{ margin: "0" }} hasIcon>
                        <MintParagraph size={"14"} weight={"medium"}>This is how your signature will appear on the Temporary Occupancy Buyer.</MintParagraph>
                    </StatusMessage>
                    <StyledInputComponent
                            style={{width:"100%", marginBottom: '12px'}}
                            placeholder="Signature"
                            onChange={(e) => {
                                setTemporaryOccupancyBuyerSignature(e.target.value); 
                            }}
                            isCursive
                            value={temporaryOccupancyBuyerSignature}
                    />
                    
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop:'20px', width: '100%'}}>
                        <SecondaryButton text="Back" isLight size="medium" onClick={prevSignatureScreen}></SecondaryButton>
                        <SecondaryButton disabled={!isNextEnabled || !temporaryOccupancyBuyerSignature} text={currentSignatureScreen === documents.length - 1 ? "Sign & Finish" : "Sign"} size="medium" onClick={() => nextSignatureScreen('TEMP_OCC_BUYER')} hasArrow></SecondaryButton>
                    </div>
    
                </ContentContainer>);
            case 'TEMP_OCC_SELLER':
                // Return JSX content specific to TEMP_OCC_SELLER
                return (<ContentContainer isMobile={isMobile}>
                    <MOPSubcontainer style={{ marginBottom: "48px", width: '100%', borderTop: 'none'}}>
                        <MOPHeaderBtnContainer>
                            <MOPHeader title={"Sign Temporary Occupancy Seller"}/>
                        </MOPHeaderBtnContainer>
                        <OfferReviewLine title={'Closing Date'} body={formattedClosingDate} />
                        <OfferReviewLine title={"Possession Date"} body={formattedPossessionDate} />
                        <OfferReviewLine title={"Late Fee"} body={`$100`} />
                        <OfferReviewLine title={"Daily Overdue Penalty"} body={`${formatMoney(offer.tempOccPenaltyAmt)}`} />
                    </MOPSubcontainer>
                    <MOPSubheader title={"Signature"} margin="12px 0"/>
                    <StatusMessage style={{ margin: "0" }} hasIcon>
                        <MintParagraph size={"14"} weight={"medium"}>This is how your signature will appear on the Temporary Occupancy Seller.</MintParagraph>
                    </StatusMessage>
                    <StyledInputComponent
                            style={{width:"100%", marginBottom: '12px'}}
                            placeholder="Signature"
                            onChange={(e) => {
                                setTemporaryOccupancySellerSignature(e.target.value); 
                            }}
                            isCursive
                            value={temporaryOccupancySellerSignature}
                    />
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop:'20px', width: '100%'}}>
                        <SecondaryButton text="Back" isLight size="medium" onClick={prevSignatureScreen}></SecondaryButton>
                        <SecondaryButton disabled={!isNextEnabled || !temporaryOccupancySellerSignature} text={currentSignatureScreen === documents.length - 1 ? "Sign & Finish" : "Sign"} size="medium" onClick={() => nextSignatureScreen('TEMP_OCC_SELLER')} hasArrow></SecondaryButton>
                    </div>
    
                </ContentContainer>);
            case 'ESCALATION':
                return (<ContentContainer isMobile={isMobile}>
                    <MOPSubcontainer style={{ marginBottom: "48px", width: '100%', borderTop: 'none'}}>
                        <MOPHeaderBtnContainer>
                            <MOPHeader title={"Sign Escalation Clause"}/>
                        </MOPHeaderBtnContainer>
    
                        <OfferReviewLine title={"Offer Price"} body={`${formatMoney(offer.offerAmt)}`} />
                        <OfferReviewLine title={"Escalation Amount"} body={`${formatMoney(offer.escalationAmt)}`} />
                        <OfferReviewLine title={"Escalation Max Amount"} body={`${formatMoney(offer.escalationMaxAmt)}`} />
                    </MOPSubcontainer>
                    <MOPSubheader title={"Signature"} margin="12px 0"/>
                    <StatusMessage style={{ margin: "0", width: '100%', boxSizing: 'border-box' }} hasIcon>
                        <MintParagraph size={"14"} weight={"medium"}>This is how your signature will appear on the Escalation Clause.</MintParagraph>
                    </StatusMessage>
                    <StyledInputComponent
                            style={{width:"100%", marginBottom: '12px'}}
                            placeholder="Signature"
                            onChange={(e) => {
                                setEscalationSignature(e.target.value); 
                            }}
                            isCursive
                            value={escalationSignature}
                    />
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop:'20px', width: '100%'}}>
                        <SecondaryButton text="Back" isLight size="medium" onClick={prevSignatureScreen}></SecondaryButton>
                        <SecondaryButton disabled={!isNextEnabled || !escalationSignature} text={currentSignatureScreen === documents.length - 1 ? "Sign & Finish" : "Sign"} size="medium" hasArrow onClick={() => nextSignatureScreen('ESCALATION')}></SecondaryButton>
                    </div>
    
                </ContentContainer>);
            case 'CLOSING_ATTORNEY_HOLDER':
                return (<ContentContainer isMobile={isMobile}>
                    <MOPSubcontainer style={{ marginBottom: "48px", width: '100%', borderTop: 'none'}}>
                        <MOPHeaderBtnContainer>
                            <MOPHeader title={"Sign Attorney as Holder of Earnest Money"}/>
                        </MOPHeaderBtnContainer>
    
                        <OfferReviewLine title={"Closing Attorney"} body={offer.closingAttorney as string} />
                        <OfferReviewLine title={"Closing Attorney Address"} body={offer.closingAttorneyAddress as string} />
                        <OfferReviewLine title={"Closing Attorney Phone"} body={offer.closingAttorneyPhone as string} />
                        <OfferReviewLine title={"Closing Attorney Email"} body={offer.closingAttorneyEmail as string} />
                    </MOPSubcontainer>
                    <MOPSubheader title={"Signature"} margin="12px 0"/>
                    <StatusMessage style={{ margin: "0" }} hasIcon>
                        <MintParagraph size={"14"} weight={"medium"}>This is how your signature will appear on the Attorney as Holder of Earnest Money.</MintParagraph>
                    </StatusMessage>
                    <StyledInputComponent
                            style={{width:"100%", marginBottom: '12px'}}
                            placeholder="Signature"
                            onChange={(e) => {
                                setClosingAttorneyAsHolderOfEarnestMoneySignature(e.target.value); 
                            }}
                            isCursive
                            value={closingAttorneyAsHolderOfEarnestMoneySignature}
                    />
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop:'20px', width: '100%'}}>
                        <SecondaryButton text="Back" isLight size="medium" onClick={prevSignatureScreen}></SecondaryButton>
                        <SecondaryButton disabled={!isNextEnabled || !closingAttorneyAsHolderOfEarnestMoneySignature} text={currentSignatureScreen === documents.length - 1 ? "Sign & Finish" : "Sign"} size="medium" hasArrow onClick={() => nextSignatureScreen('CLOSING_ATTORNEY_HOLDER')}></SecondaryButton>
                    </div>
    
                </ContentContainer>);
            case 'LEAD_BASED':
                return (<ContentContainer isMobile={isMobile}>
                    <MOPSubcontainer style={{ marginBottom: "48px", width: '100%', borderTop: 'none'}}>
                        <MOPHeaderBtnContainer>
                            <MOPHeader title={"Sign Lead Based Paint Disclosure"}/>
                        </MOPHeaderBtnContainer>
    
                        <OfferReviewLine title={"Is Seller aware of lead based paint or lead based hazards on the property"} body={knownLeadPaint ? 'Yes' : "No"} />
                        {leadPaintExtraInfo && <OfferReviewLine title={"Description/location of hazards"} body={leadPaintExtraInfo} />}
                        <OfferReviewLine title={"Does Seller have records and/or reports pertaining to lead- based paint and/or lead-based paint hazards"} body={leadBasedPaintReports ? 'Yes' : "No"} />
                        {leadBasedPaintReportsExtraInfo && <OfferReviewLine title={"Names of documents (available upon request)"} body={leadBasedPaintReportsExtraInfo} />}
                    </MOPSubcontainer>
                    {(signatureRole === 'BUYER_1' || signatureRole === "BUYER_2") &&
                    <><MOPSubheader title={"Signature"} margin="12px 0"/>
                    <StatusMessage style={{ margin: "0" }} hasIcon>
                        <MintParagraph size={"14"} weight={"medium"}>Initial here to acknowledge you have read the pamphlet <Link href="https://www.epa.gov/sites/default/files/2020-04/documents/lead-in-your-home-portrait-color-2020-508.pdf" style={{ textDecoration: 'underline', color: 'darkgreen'}} rel="noopener noreferrer" target="_blank">Protect Your Family from Lead in Your Home</Link>.</MintParagraph>
                    </StatusMessage>
                    <StyledInputComponent
                        style={{width:"100%", marginBottom: '12px'}}
                        placeholder="XXX"
                        onChange={(e) => {
                            setInitialPamphlet(e.target.value); 
                        }}
                        isCursive
                        maxLength={4}
                        value={initialPamphlet}
                     />
                    
                     <StatusMessage style={{ margin: "0" }} hasIcon>
                        <MintParagraph size={"14"} weight={"medium"}>Initial here to acknowledge you are aware that you have a 10 day period to do a risk assessment of lead based hazards on the property</MintParagraph>
                    </StatusMessage>
                    <StyledInputComponent
                        style={{width:"100%", marginBottom: '12px'}}
                        placeholder="XXX"
                        onChange={(e) => {
                            setInitial10DayPeriod(e.target.value); 
                        }}
                        maxLength={4}
                        isCursive
                        value={initial10DayPeriod}
                     /></>
                    }
                    <StatusMessage style={{ margin: "0" }} hasIcon>
                        <MintParagraph size={"14"} weight={"medium"}>This is how your signature will appear on the Lead Based Paint Disclosure.</MintParagraph>
                    </StatusMessage>
                    <StyledInputComponent
                            style={{width:"100%", marginBottom: '12px'}}
                            placeholder="Signature"
                            onChange={(e) => {
                                setLeadBasedPaintDisclosureSignature(e.target.value); 
                            }}
                            isCursive
                            value={leadBasedPaintDisclosureSignature}
                    />
                                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop:'20px', width: '100%'}}>
                        <SecondaryButton text="Back" isLight size="medium" onClick={prevSignatureScreen}></SecondaryButton>
                        <SecondaryButton disabled={(signatureRole === 'BUYER_1' || signatureRole === "BUYER_2") ? !isNextEnabled || !leadBasedPaintDisclosureSignature || !initial10DayPeriod || !initialPamphlet : !isNextEnabled || !leadBasedPaintDisclosureSignature} text={currentSignatureScreen === documents.length - 1 ? "Sign & Finish" : "Sign"} size="medium" hasArrow onClick={() => nextSignatureScreen('LEAD_BASED')}></SecondaryButton>
                    </div>
                    </ContentContainer>
                )
            case 'SELLER_DISCLOSURE':
                return (<ContentContainer isMobile={isMobile}>
                    <MOPSubcontainer style={{ marginBottom: "12px", width: '100%', borderTop: 'none'}}>
                        <MOPHeaderBtnContainer>
                            <MOPHeader title={"Sign Seller's Disclosure"}/>
                        </MOPHeaderBtnContainer>
                        <StatusMessage style={{ margin: "0", width: '100%', boxSizing:'border-box' }} hasIcon>
                        <MintParagraph size={"14"} weight={"medium"}>The purpose of the Seller&apos;s Disclosure is to help the seller(s) fulfill their legal obligation to disclose any known material defects of the property. However, this is not a substitution for buyer due diligence or inspections.</MintParagraph>
                    </StatusMessage>
    
                    </MOPSubcontainer>
                    <MOPSubheader title={"Signature"} margin="12px 0"/>
                    <StatusMessage style={{ margin: "0", width: '100%', boxSizing:'border-box' }} hasIcon>
                        <MintParagraph size={"14"} weight={"medium"}>This is how your signature will appear on the Seller&apos;s disclosure.</MintParagraph>
                    </StatusMessage>
                    <StyledInputComponent
                            style={{width:"100%", marginBottom: '12px'}}
                            placeholder="Signature"
                            onChange={(e) => {
                                setSellerDisclosureSignature(e.target.value);
                            }}
                            isCursive
                            value={sellerDisclosureSignature}
                    />
                                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop:'20px', width: '100%'}}>
                        <SecondaryButton text="Back" isLight size="medium" onClick={prevSignatureScreen}></SecondaryButton>
                        <SecondaryButton disabled={!isNextEnabled || !sellerDisclosureSignature} text={currentSignatureScreen === documents.length - 1 ? "Sign & Finish" : "Sign"} size="medium" hasArrow onClick={() => nextSignatureScreen('SELLER_DISCLOSURE')}></SecondaryButton>
                    </div>
                    </ContentContainer>
                )
                    
            default:
                console.log('Document type not found');
                return null;
        }
    };

    if (documentStatus === 'loading') {
        return <div>
            <OfferHeader style={{height: isMobile ? '40px': '60px'}}>
        <div style={{display:'flex'}}><SecondaryButton size={isMobile ? 'small' : 'medium'} hasArrow isLight borderless reverseArrow text={"Back"} style={{ height: isMobile ? '35px' : '40px'}} onClick={() => router.push(`/make-offer?offerId=${offer.id}`)} /> </div>
        <div style={{textAlign: "center" }}>
            {!isMobile && <><AzeretMonoParagraph weight="regular" style={{ margin: 0, color:colors.darkgreen1000 }}>OFFER REVIEW</AzeretMonoParagraph>
            <MintParagraph size="20" weight="medium" style={{marginTop:'6px'}}>
                {property.streetAddress + ' ' + address2String}
                <span style={{ color: colors.gray700 }}>{addressData}</span>
            </MintParagraph></>}
        </div>
        {!isMobile && <div style={{ display: "flex" }}>
            <div style={{width: '170px'}}></div>
        </div>}
        </OfferHeader>
        <div>
            <H3 style={{margin: '0 0 24px 0'}}>Preparing Documents...</H3>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%'}}>
                <Spinner/>
            </div>
        </div>
        </div>
    }

    if (documentStatus === 'failed') {
        return <div>
            <OfferHeader style={{height: isMobile ? '40px': '60px'}}>
        <div style={{display:'flex'}}><SecondaryButton size={isMobile ? 'small' : 'medium'} hasArrow isLight borderless reverseArrow text={"Back"} style={{ height: isMobile ? '35px' : '40px'}} onClick={() => router.push(`/make-offer?offerId=${offer.id}`)} /> </div>
        <div style={{textAlign: "center" }}>
            {!isMobile && <><AzeretMonoParagraph weight="regular" style={{ margin: 0, color:colors.darkgreen1000 }}>OFFER REVIEW</AzeretMonoParagraph>
            <MintParagraph size="20" weight="medium" style={{marginTop:'6px'}}>
                {property.streetAddress + ' ' + address2String}
                <span style={{ color: colors.gray700 }}>{addressData}</span>
            </MintParagraph></>}
        </div>
        {!isMobile && <div style={{ display: "flex" }}>
            <div style={{width: '170px'}}></div>
        </div>}
        </OfferHeader>
        <div>
            <MintParagraph size="32" weight="medium">There was an error loading the documents for your offer. Please reload the page and try again. Reach out to support@housewell.com if issues persist.</MintParagraph>
        </div>
        </div>    }


    return <div style={{position: 'relative'}}>
        <OfferHeader style={{height: isMobile ? '40px': '60px'}}>
            {signatureRole !== 'NONE' && (
                <div style={{display:'flex'}}>
                    <SecondaryButton
                        size={isMobile ? 'small' : 'medium'}
                        hasArrow
                        isLight
                        borderless
                        reverseArrow
                        text={"Back"}
                        style={{ height: isMobile ? '35px' : '40px'}}
                        onClick={() => router.push(getNavigationUrl())}
                    />
                </div>
            )}
            <div style={{textAlign: "center" }}>
                {!isMobile && <><AzeretMonoParagraph weight="regular" style={{ margin: 0, color:colors.darkgreen1000 }}>OFFER REVIEW</AzeretMonoParagraph>
                <MintParagraph size="20" weight="medium" style={{marginTop:'6px'}}>
                    {property.streetAddress + ' ' + address2String}
                    <span style={{ color: colors.gray700 }}>{addressData}</span>
                </MintParagraph></>}
            </div>
            {!isMobile && <div style={{ display: "flex" }}>
                <div style={{width: '170px'}}></div>
            </div>}
        </OfferHeader>

        <ContentBackground>
            {isMobile ? <PDFViewer file={documents?.[selectedDocumentIndex]?.url} currentPage={selectedPage}/> : 
                <iframe style={{height: isMobile ? 'calc(100vh - 51px)' : 'calc(100vh - 71px)', width: "100%" }} src={documents?.[selectedDocumentIndex]?.url}>
                    </iframe>
                }
        </ContentBackground>
        {shouldShowModal ? 
        
        <BasicParentModal closeModal={closeModal}>
             {getSignatureContent(documents[currentSignatureScreen])}
        </BasicParentModal> 
        
        : <>{!shouldShowIntroModal && <FloatingNav isMobile={isMobile}>
            <FloatingNavContainer isMobile={isMobile}>
                <FloatingDropdownContainer removeBorder={!canUserSign || !isOfferSignable} isMobile={isMobile}>
                    <Select
                        styles={customStylesTaller(isMobile ? .53 * windowSize.width : 230)}
                        value={documents.find((doc) => doc.value === documents[selectedDocumentIndex].value)}
                        isLoading={documents.length === 0}
                        isSearchable={false}
                        name="select-document"
                        options={documents}
                        menuPlacement="top"
                        onChange={(selectedOption) => {setSelectedDocumentIndex(documents.findIndex((doc) => doc.value === selectedOption?.value)); setSelectedPage(1);}}
                    />
                    <DocNavButton 
                        style={{marginLeft: '8px'}}
                        disabled={isMobile ? (selectedPage === 1) : (selectedDocumentIndex === 0)} 
                        onClick={() => {
                            if (isMobile) {
                                setSelectedPage(selectedPage - 1);
                            } else {
                                setSelectedDocumentIndex(selectedDocumentIndex - 1);
                            }
                        }}
                    >
                        {isMobile ? (selectedPage === 1 ? leftGraySVG : leftSVG) : (selectedDocumentIndex === 0 ? leftGraySVG : leftSVG)}
                    </DocNavButton>

                    <DocNavButton 
                        disabled={isMobile ? (selectedPage === currentDocumentTotalPages) : (selectedDocumentIndex === (documents.length - 1))} 
                        onClick={() => {
                            if (isMobile) {
                                setSelectedPage(selectedPage + 1);
                            } else {
                                setSelectedDocumentIndex(selectedDocumentIndex + 1);
                            }
                        }}
                        style={{marginLeft: '4px'}}
                    >
                        {isMobile ? (selectedPage === currentDocumentTotalPages ? rightGraySVG : rightSVG) : (selectedDocumentIndex === (documents.length - 1) ? rightGraySVG : rightSVG)}
                    </DocNavButton>
                
                </FloatingDropdownContainer>
                {(canUserSign && isOfferSignable) && <SecondaryButton
                    size="medium"
                    onClick={() => setShouldShowModal(true)}
                    text="Continue to Sign"
                    hasArrow
                    style={{marginLeft: isMobile ? '0' : '22px', width: isMobile ? '100%' : 'auto', marginTop: isMobile ? '10px' : '0'}}
                />}
            </FloatingNavContainer>
        </FloatingNav>}</>}
        {shouldShowIntroModal && <BasicParentModal closeModal={closeIntroModal} nonClosable>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'left', justifyContent: 'flex-start', padding: '17px', }}>
            
            <MintParagraph size="32" weight="medium">Review these documents carefully</MintParagraph>
            <MintParagraph size='16' weight="regular" style={{ marginTop: "16px", marginBottom: "32px" }}>This is a legally binding offer for your review. Please review these documents carefully as they are the source of truth for the offer.</MintParagraph>
            <StatusMessage style={{ margin: "12px 0 36px 0" }} hasIcon>
                <MintParagraph size={"14"} weight={"medium"}>Though we have taken great care to ensure that these documents fulfill the needs of most home buyers and sellers, every home purchase is different and our documents may not perfectly fit your needs. Please review these documents carefully. You can reach out to Housewell through messages if you have general questions about the documents or consult with your attorney or agent to receive specialized advice.</MintParagraph>
            </StatusMessage>

            <SecondaryButton size="medium" onClick={() => setShouldShowIntroModal(false)} text="Acknowledge" hasArrow style={{ width: "100%" }} />
            </div>

            </BasicParentModal>
        }
        <BottomGradientShadow />
    </div>
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    try {
      const store = initializeStore();
      const { req, res } = context;
      const { offerId } = context.query;
      let propertyId = context.query.propertyId;
      if (!propertyId) {
        console.log('no property id, fetching offer')
        console.log('offer id', offerId)
        const offerResponse = await makeAuthedApiRequest({method: 'post', data: {id: offerId}, urlExtension: '/v1/offer/getOffer', isServer: true, req, res});
        const offer  = offerResponse.data;
        propertyId = offer.propertyId;
        console.log('property id', propertyId)
      }
      const offerIdString = offerId as string;
      await store.dispatch(fetchOfferById({offerId: offerIdString, isServer: true, req: context.req, res: context.res }));
      await store.dispatch(fetchSellerDisclosureByPropertyId({propertyId: propertyId as string, isServer: true, req: context.req, res: context.res }))

      const data = { propertyId };
      const response = await makeAuthedApiRequest({method: 'post', data, urlExtension: '/v1/property/propertyInfo', isServer: true, req, res});
      const { offersReducer, sellerDisclosureReducer } = store.getState();
      console.log("sellerdisclosure reducers", sellerDisclosureReducer);
      return { props: { initialState: { offersReducer, sellerDisclosureReducer }, property: response.data.property } };
    } catch (error) {
        console.log("ERROR", error);
        return { props: { error: true } };
    }
}

export default OfferReviewPage;
