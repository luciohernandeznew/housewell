import { GetServerSidePropsContext } from 'next';
import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { colors } from '../../../../../src/styles/colors';
import { makeAuthedApiRequest } from '../../../../../src/utils/api/apiHelper';
import StyledInputWithSuperText from '../../../../../src/components/boxes/StyledInputWithSupertext';
import ParagraphStyledInput from '../../../../../src/components/boxes/ParagraphStyledInput';
import OnboardingScreenFrame from '../../../../../src/components/stuff/OnboardingScreenFrame';
import { useRouter } from 'next/router';
import { useDevice } from '../../../../../src/contexts/DeviceContext';
import { H3, H5, MintParagraph } from '../../../../../src/components/Typography/Typography';
import StatusMessage from '../../../../../src/components/stuff/StatusMessage';
import MultipleChoiceParent from '../../../../../src/components/stuff/MultipleChoiceParent';
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export type BasicPropertyDetails = {
    streetAddress: string,
    addres2?: string,
    city: string,
    state: string,
    zip: string,
    propertyId: string,
    buyerSideCommission: number,
}
export const StyledInput = styled.input<{ isSmall?: boolean }>`
    height: 64px;
    font-size: ${props => props.isSmall ? '16px' : '24px'};
    line-height: ${props => props.isSmall ? '18px' : '24px'};
    font-family: Mint Grotesk Medium;
    border: 1px solid ${colors.gray300};
    border-radius: 8px;
    padding: 0 16px;

    &:focus {
        outline: none;
        border: 2px solid ${colors.darkgreen1000};
        padding: 0 16px;
        box-sizing: border-box;
        border-radius: 8px;
    }
    
    ::placeholder {
        color: ${colors.gray700};
    }
    &:disabled {
        background-color: ${colors.gray100};
        color: ${colors.gray700};
    }
`;

const mapIndexToModelEnum = (index: number) => {
    if (index === 0) return 'YES';
    if (index === 1) return 'NO';
    if (index === 2) return 'UNKNOWN';
};

const mapModelEnumToIndex = (model: string) => {
    if (model === 'YES') return 0;
    if (model === 'NO') return 1;
    if (model === 'UNKNOWN') return 2;
};

const booleanToIndex = (bool: boolean) => {
    if (bool === true) return 0;
    if (bool === false) return 1;
    return -1;
}

const indexToBoolean = (index: number) => {
    if (index === 0) return true;
    if (index === 1) return false;
    return null;
}



const SellerDisclosure6 = (props: { sellerDisclosure: any }) => {
    const router = useRouter();
    const { isMobile } = useDevice();
    const prevStep = '/onboarding/property/part-2/seller-disclosure-5?propertyId=' + props.sellerDisclosure.propertyId;
    const nextStep = '/onboarding/property/part-2/seller-disclosure-7?propertyId=' + props.sellerDisclosure.propertyId;
    const disclosureEnumOptions = [{ text: 'Yes' }, { text: 'No' }, { text: 'Unknown/NA' }];
    const booleanOptions = [{ text: 'Yes' }, { text: 'No' }];
    const [selectedWasConstructedBefore1978Index, setSelectedWasConstructedBefore1978Index] = useState(-1);
    const [knownLeadBasedPaintIndex, setKnownLeadBasedPaintIndex] = useState(-1);
    const [knownLeadPaintExtraInfo, setKnownLeadPaintExtraInfo] = useState('');
    const [hasLeadPaintReportsIndex, setHasLeadPaintReportsIndex] = useState(-1);
    const [leadPaintReportsExtraInfo, setLeadPaintReportsExtraInfo] = useState('');


    const { wasConstructedBefore1978, knownLeadPaint, leadPaintExtraInfo, leadBasedPaintReports, leadBasedPaintReportsExtraInfo } = props.sellerDisclosure;

    useEffect(() => {
        if (wasConstructedBefore1978 === null) {
            setSelectedWasConstructedBefore1978Index(-1);
        } else {
            const index = mapModelEnumToIndex(wasConstructedBefore1978);
            setSelectedWasConstructedBefore1978Index(index !== undefined ? index : -1);
        }
        if (knownLeadPaint === null) {
            setKnownLeadBasedPaintIndex(-1);
        } else {
            const index = booleanToIndex(knownLeadPaint);
            setKnownLeadBasedPaintIndex(index !== undefined ? index : -1);
        }
        if (leadPaintExtraInfo === null) {
            setKnownLeadPaintExtraInfo('');
        } else {
            setKnownLeadPaintExtraInfo(leadPaintExtraInfo);
        }
        if (leadBasedPaintReports === null) {
            setHasLeadPaintReportsIndex(-1);
        } else {
            const index = booleanToIndex(leadBasedPaintReports);
            setHasLeadPaintReportsIndex(index !== undefined ? index : -1);
        }
        if (leadBasedPaintReportsExtraInfo === null) {
            setLeadPaintReportsExtraInfo('');
        } else {
            setLeadPaintReportsExtraInfo(leadBasedPaintReportsExtraInfo);
        }
    }, [wasConstructedBefore1978, knownLeadPaint, leadPaintExtraInfo, leadBasedPaintReports, leadBasedPaintReportsExtraInfo]);

    const handleNextSubmit = async () => {
        try {
            const data = {
                propertyId: props.sellerDisclosure.propertyId,
                updateData: {
                    wasConstructedBefore1978: mapIndexToModelEnum(selectedWasConstructedBefore1978Index),
                    knownLeadPaint: indexToBoolean(knownLeadBasedPaintIndex),
                    leadPaintExtraInfo: knownLeadPaintExtraInfo,
                    leadBasedPaintReports: indexToBoolean(hasLeadPaintReportsIndex),
                    leadBasedPaintReportsExtraInfo: leadPaintReportsExtraInfo,
                }
            }
            await makeAuthedApiRequest({ method: 'post', urlExtension: `/v1/sellerDisclosure/updateSellerDisclosure`, data });
            router.push(nextStep);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <OnboardingScreenFrame
            nextOnClick={handleNextSubmit}
            prevStep={prevStep}
            disabledRight={
                selectedWasConstructedBefore1978Index != -1
                    ? false : true
            }
        >
            {isMobile ? <H5 style={{ marginBottom: '24px' }}>Seller&apos;s Disclosure: Part 6</H5> : <H3 style={{ marginBottom: '24px' }}>Seller&apos;s Disclosure: Part 6</H3>}
            <StatusMessage style={{ margin: "8px 0 8px 0" }} hasIcon>
                <MintParagraph size={"14"} weight={"medium"}>Fill out this information about your home to the best of your ability. It&apos;s ok to not know all the details or exact dates, but this helps you fulfill your legal duty to notify buyers of adverse conditions of the property</MintParagraph>
            </StatusMessage>
            <MintParagraph size='24' weight='regular' style={{ marginTop: '24px' }}>1.  Was the Property constructed prior to 1978?</MintParagraph>
            <MultipleChoiceParent buttonHeight='64px' fontSize='20' useChecks style={{ margin: "24px 0 36px 0" }} choices={disclosureEnumOptions} selectedIndex={selectedWasConstructedBefore1978Index} onSelection={(index) => setSelectedWasConstructedBefore1978Index(index)} />
            {selectedWasConstructedBefore1978Index == 0 &&
                <MintParagraph size='24' weight='regular' style={{ marginTop: '24px', marginBottom: '24px' }}>If yes, Parties must complete the Lead Based Paint Disclosure Exhibit F. Buyer must receive the EPA’s Protect Your Family from Lead in Your Home Pamphlet</MintParagraph>
            }
            <MintParagraph size='24' weight='regular' style={{ marginTop: '24px' }}>2.  Is the Seller aware of any lead-based paint or lead-based paint hazards in the housing?</MintParagraph>
            <MultipleChoiceParent buttonHeight='64px' fontSize='20' useChecks style={{ margin: "24px 0 36px 0" }} choices={booleanOptions} selectedIndex={knownLeadBasedPaintIndex} onSelection={(index) => setKnownLeadBasedPaintIndex(index)} />
            {knownLeadBasedPaintIndex == 0 && <ParagraphStyledInput maxLength={450} style={{ marginBottom: '24px' }} label='Please provide the location and extent of lead based paint/hazards:' value={knownLeadPaintExtraInfo ? knownLeadPaintExtraInfo : ""} onChange={(e) => setKnownLeadPaintExtraInfo(e.target.value)} />}
            <MintParagraph size='24' weight='regular' style={{ marginTop: '24px' }}>3.  Is the Seller aware of any lead-based paint testing or evaluation documents relating to the property?</MintParagraph>
            <MultipleChoiceParent buttonHeight='64px' fontSize='20' useChecks style={{ margin: "24px 0 36px 0" }} choices={booleanOptions} selectedIndex={hasLeadPaintReportsIndex} onSelection={(index) => setHasLeadPaintReportsIndex(index)} />
            {hasLeadPaintReportsIndex == 0 && <ParagraphStyledInput maxLength={450} style={{ marginBottom: '24px' }} label='Please list the names of any documents that you are aware of:' value={leadPaintReportsExtraInfo ? leadPaintReportsExtraInfo : ""} onChange={(e) => setLeadPaintReportsExtraInfo(e.target.value)} />}
        </OnboardingScreenFrame>
    )
}
export async function getServerSideProps(context: GetServerSidePropsContext) {
    try {
        const { req, res, query } = context;
        const propertyId = query.propertyId;
        if (!propertyId) {
            return { props: {} };
        }
        const data = { propertyId };
        const response = await makeAuthedApiRequest({ method: 'post', data, urlExtension: '/v1/sellerDisclosure/getSellerDisclosure', isServer: true, req, res });
        return { props: { sellerDisclosure: response.data } };
    } catch (error) {
        console.log("ERROR", error);
        return { props: { basicAddressData: false } }
    }


}

export default SellerDisclosure6;