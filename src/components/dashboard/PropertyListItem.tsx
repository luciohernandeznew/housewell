import React, { useEffect } from "react";
import styled from "@emotion/styled";
import Image from "next/image";
import NotifBadge from "./NotifBadge";
import {useRouter} from "next/router";
import {PropertyModel} from "../../slices/properties";
import {useAppSelector, useAppDispatch} from "../../store";
import {formatMoney} from "../../utils/format";
import SecondaryButton from "../buttons/SecondaryButton";
import {AzeretMonoParagraph, H4, H6, MintParagraph} from "../Typography/Typography";
import {colors} from "../../styles/colors";
import { useDevice } from "../../contexts/DeviceContext";
import IndividualOnboardingStatusIndicator from "../boxes/properties/IndividualOnboardingStatusIndicator";
import { fetchOffersByPropertyId } from "../../slices/offers";
import { fetchEventsByPropertyDashboard } from "../../slices/events";


const PropertyListContainer = styled.div`
    display: flex;
`;

const ParentDiv = styled.div`
    display: flex;
    border: 1px solid #E0E5E0;
    border-radius: 12px;
    flex-direction: column;
`;

const TextContainer = styled.div<{isMobile?: boolean}>`
    display: flex;
    flex-direction: column;
    padding: 24px 32px;
    padding-top: ${props => props.isMobile ? '0' : '24px'};
    width: 100%;
    min-width: 259px;
    box-sizing: border-box;
    justify-content: flex-start;
    color: ${colors.gray1000};
    
    & > h1, & > h2, & > h4 {
        margin: 0;
    }
`;

const CenteredFlexContainer = styled.div`
    display: flex;
    width: calc(100% - 2*24px);
    margin-left: 24px;
    margin-right: 24px;
    justify-content: space-between;
    align-items: center;
    justify-content: center;

`;

const ActionContainer = styled.div<{isMobile?: boolean}>`
    display: flex;
    flex-direction: column;
    margin-left: auto;
    padding: ${props => props.isMobile ? '24px' : '0 24px'};
    background: #F5F5F5;
    border-top-right-radius: 12px;
    position: relative;
    box-sizing: border-box;`

const OnboardingTrackerContainer = styled.div<{isMobile?: boolean}>`
    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content: flext-start;
    border-top: 1px solid #E0E5E0;
    padding: ${props => props.isMobile ? '16px' : '32px'};
    box-sizing: border-box;
`;

const OnboardingTrackerBar= styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 10px;
    justify-content: space-between;
`
const Line = styled.div`
    height: 1px;
    flex: 1;
    background: ${colors.gray300};
    flex-grow: 1;
    margin-left: 10px;
    margin-right: 10px;
    justify-content: center;
    max-width: 7%;
`

export type PropertylistItemProps = {
    property: PropertyModel
}


const PropertylistItem: React.FC<PropertylistItemProps> = (props: PropertylistItemProps) => {
    const router = useRouter();
    const { property } = props;
    const { windowSize } = useDevice();
    const isMidsize = (windowSize.width <= 1150);
    const isMobile = windowSize.width < 1030;
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchOffersByPropertyId({propertyId: property.id}));
        dispatch(fetchEventsByPropertyDashboard({propertyId: property.id}));
    }, [dispatch, property.id]);
    
    const isPropertyOnboardingCompleted = property.onboardingStep === 'completed'
    const events = useAppSelector((state) => state.eventReducer.eventsByProperty[property.id]);
    const offers = useAppSelector((state) => state.offersReducer.offersByProperty);
    const eventLength = events?.length;

    const bedBathBuiltString = `${property.bedroomCount ? property.bedroomCount + ' bed' : ''}${property.bathroomCount ? ' • ' + property.bathroomCount + ' bath' : ''}${property.yearBuilt ? ' • Built in ' + property.yearBuilt : ''}`;

    const firstStepStatus = property?.onboardingStep?.includes('part-1') ? 'in-progress' : 'completed';
    const secondStepStatus = property?.onboardingStep?.includes('part-2') ? 'in-progress' : firstStepStatus === 'completed' ? 'completed' : 'todo';
    const thirdStepStatus = property?.onboardingStep?.includes('part-3') ? 'in-progress' : secondStepStatus === 'completed' ? 'completed' : 'todo';
    
    return <ParentDiv>
        
    <PropertyListContainer>
        {isMobile ? <></> :
            !property.coverImage ?
                <Image
                src='/property_placeholder.png'
                alt="/property_placeholder.png"
                style={{ borderTopLeftRadius: "12px", borderBottomLeftRadius: !isPropertyOnboardingCompleted ? '0' : "12px" }}
                height={287}
                width={428} />
                :
                <Image
                    src={property.coverImage || ''}
                    alt="/property_placeholder.png"
                    style={{ borderTopLeftRadius: "12px", borderBottomLeftRadius: !isPropertyOnboardingCompleted ? '0' : "12px" }}
                    height={287}
                    width={428} />
        }
        {!isMidsize ? 
            <TextContainer>
                <MintParagraph style={{ paddingBottom: "16px" }} size={"32"} weight={"medium"}>{property.listPrice ? formatMoney(property.listPrice) : "List Price Not Set"}</MintParagraph>
                <H4>{property.streetAddress ? property.streetAddress: "Street Address Not Set"}</H4>
                {property.address2 && <H4>{property.address2}</H4>}
                <H4>{`${property.city ? property.city + ',' : ''} ${property.state ? property.state : ''} ${property.zip ? property.zip : ''}`}</H4>
                <MintParagraph style={{ justifySelf: "flex-end", marginTop: "auto" }} size={"20"} weight={"medium"}>
                    {bedBathBuiltString}
                </MintParagraph>
            </TextContainer> 
            :
            <TextContainer isMobile={isMobile}>
                {isMobile && <CenteredFlexContainer>
                {property.status === 'PREPARING' ? <AzeretMonoParagraph 
                    weight="regular" 
                    style={{
                        padding: '6px 18px',
                        borderTopLeftRadius: '0px', // Flat top-left corner
                        borderTopRightRadius: '0px', // Flat top-right corner
                        borderBottomLeftRadius: '38px', 
                        borderBottomRightRadius: '38px',
                        backgroundColor: colors.orange200,
                        fontSize: isMobile ? '10px' : '12px',
                        color: colors.orange1000
                    }}>
                    NOT LISTED
                    </AzeretMonoParagraph> 
                    : property.status === "LISTED" 
                    ? <AzeretMonoParagraph 
                    weight="regular" 
                    style={{
                        padding: '6px 18px',
                        borderTopLeftRadius: '0px', // Flat top-left corner
                        borderTopRightRadius: '0px', // Flat top-right corner
                        borderBottomLeftRadius: '38px', 
                        borderBottomRightRadius: '38px',
                        backgroundColor: colors.brightgreen1000,
                        fontSize: isMobile ? '10px' : '12px',
                        color: colors.darkgreen1000
                    }}>
                    LISTED
                    </AzeretMonoParagraph> 
                    : <AzeretMonoParagraph 
                    weight="regular" 
                    style={{
                        padding: '6px 18px',
                        borderTopLeftRadius: '0px', // Flat top-left corner
                        borderTopRightRadius: '0px', // Flat top-right corner
                        borderBottomLeftRadius: '38px', 
                        borderBottomRightRadius: '38px',
                        backgroundColor: colors.gray200,
                        fontSize: isMobile ? '10px' : '12px',
                        color: colors.gray1000
                    }}>
                    PENDING
                    </AzeretMonoParagraph> }
                </CenteredFlexContainer>}
                <MintParagraph style={{ paddingBottom: "16px", marginTop: '16px' }} size={"24"} weight={"medium"}>{property.listPrice ? formatMoney(property.listPrice) : "List Price Not Set"}</MintParagraph>
                <H6>{property.streetAddress ? property.streetAddress: "Street Address Not Set"}</H6>
                {property.address2 && <H6>{property.address2}</H6>}
                <H6>{`${property.city ? property.city + ',' : ''} ${property.state ? property.state : ''} ${property.zip ? property.zip : ''}`}</H6>
                <MintParagraph style={{ justifySelf: "flex-end", marginTop: "auto" }} size={"18"} weight={"medium"}>
                    {bedBathBuiltString}
                </MintParagraph>
            </TextContainer> 
        }
        {isMobile ? 
            <></>
            : <ActionContainer style={{ borderBottomRightRadius: !isPropertyOnboardingCompleted ? '0' : "12px" }}>
                <CenteredFlexContainer>
                {property.status === 'PREPARING' ? <AzeretMonoParagraph 
                    weight="regular" 
                    style={{
                        padding: '6px 18px',
                        borderTopLeftRadius: '0px', // Flat top-left corner
                        borderTopRightRadius: '0px', // Flat top-right corner
                        borderBottomLeftRadius: '38px', 
                        borderBottomRightRadius: '38px',
                        backgroundColor: colors.orange200,
                        fontSize: isMobile ? '10px' : '12px',
                        color: colors.orange1000
                    }}>
                    NOT LISTED
                </AzeretMonoParagraph> 
                : property.status === "LISTED" 
                ? <AzeretMonoParagraph 
                weight="regular" 
                style={{
                    padding: '6px 18px',
                    borderTopLeftRadius: '0px', // Flat top-left corner
                    borderTopRightRadius: '0px', // Flat top-right corner
                    borderBottomLeftRadius: '38px', 
                    borderBottomRightRadius: '38px',
                    backgroundColor: colors.brightgreen1000,
                    fontSize: isMobile ? '10px' : '12px',
                    color: colors.darkgreen1000
                }}>
                LISTED
            </AzeretMonoParagraph> 
               : <AzeretMonoParagraph 
               weight="regular" 
               style={{
                   padding: '6px 18px',
                   borderTopLeftRadius: '0px', // Flat top-left corner
                   borderTopRightRadius: '0px', // Flat top-right corner
                   borderBottomLeftRadius: '38px', 
                   borderBottomRightRadius: '38px',
                   backgroundColor: colors.gray200,
                   fontSize: isMobile ? '10px' : '12px',
                   color: colors.gray1000
               }}>
               PENDING
           </AzeretMonoParagraph> }
                </CenteredFlexContainer>
                    <AzeretMonoParagraph weight={"medium"} style={{ paddingBottom: "24px", letterSpacing: "0.1em", marginTop: '15px' }}>ACTIVITY</AzeretMonoParagraph>
                    <div style={{ display: "flex", alignItems: "center", borderBottom: "1px solid #000000", paddingBottom: "18px" }}>
                        <H4 style={{ margin: "0 16px 0 0" }}><span style={{marginRight: "12px"}} >{eventLength}</span>{(eventLength === 1) ? 'Showing' : 'Showings'}</H4>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", paddingTop: "18px" }}>
                        <H4 style={{ margin: "0 16px 0 0" }}><span style={{marginRight: "12px", color: offers?.[property.id]?.length === 0 ? colors.gray600 : colors.typographyBlack}} >{offers?.[property.id]?.length}</span>{offers?.[property.id]?.length === 1 ? 'Offer' : 'Offers'}</H4>
                        {/*{agreements.length > 0 && <NotifBadge num={agreements.length} />}*/}
                    </div>
                    <SecondaryButton
                        size="medium"
                        isLight
                        hasArrow
                        style={{ marginTop: "auto", marginBottom:"20px", minWidth: "200px" }} text={"View details"}
                        onClick={() => router.push({ pathname: '/property-admin', query: { propertyId: property.id }, })}
                    />
            </ActionContainer> }
            </PropertyListContainer>
        {isMobile ?
           <ActionContainer isMobile style={{ width: '100%', boxSizing: 'border-box', borderRadius:'0' }}>
           <AzeretMonoParagraph weight={"medium"} style={{ paddingBottom: "24px", letterSpacing: "0.1em" }}>ACTIVITY</AzeretMonoParagraph>
           <div style={{ display: "flex", alignItems: "center", borderBottom: "1px solid #000000", paddingBottom: "18px" }}>
               <H4 style={{ margin: "0 16px 0 0" }}><span style={{marginRight: "12px"}} >{eventLength}</span>{(eventLength === 1) ? 'Showing' : 'Showings'}</H4>
           </div>
           <div style={{ display: "flex", alignItems: "center", paddingTop: "18px", marginBottom: '12px' }}>
               <H4 style={{ margin: "0 16px 0 0" }}><span style={{marginRight: "12px", color: offers?.[property.id]?.length === 0 ? colors.gray600 : colors.typographyBlack}} >{offers?.[property.id]?.length}</span>{offers?.[property.id]?.length === 1 ? 'Offer' : 'Offers'}</H4>
               {/*{agreements.length > 0 && <NotifBadge num={agreements.length} />}*/}
           </div>
           <SecondaryButton
               size="medium"
               isLight
               hasArrow
               style={{ marginTop: "auto", minWidth: "200px" }} text={"View details"}
               onClick={() => router.push({ pathname: '/property-admin', query: { propertyId: property.id }, })}
           />
   </ActionContainer> : <></> }
    {!isPropertyOnboardingCompleted && 
        <OnboardingTrackerContainer isMobile={isMobile}>
             <AzeretMonoParagraph weight={"medium"} style={{letterSpacing: "0.1em" }}>NEXT STEPS</AzeretMonoParagraph>
            {isMobile ?  
                <div style={{display:'flex', marginTop:'12px', width:'calc(100% - 2*24px)', marginLeft: '24px', marginRight: '24px', justifyContent:'space-between', alignItems:'center'}}>
                {firstStepStatus === 'in-progress' ? <IndividualOnboardingStatusIndicator order='1' marginLeft="8px" ignoreBackground status={firstStepStatus} text={isMobile ? 'Property details' : "Enter your property details"}/> 
                : secondStepStatus === 'in-progress' ? <IndividualOnboardingStatusIndicator order='2' marginLeft="8px" ignoreBackground status={secondStepStatus} text="Seller's disclosure"/> 
                : <IndividualOnboardingStatusIndicator marginLeft="8px" order='3' ignoreBackground status={thirdStepStatus} text="Finish Up"/>}
                <SecondaryButton 
                    style={{}}
                    size="small"
                    hasArrow
                    onClick={() => router.push({ pathname: property.onboardingStep, query: { propertyId: property.id } })}
                    text="Continue">
                </SecondaryButton>
                </div > :<OnboardingTrackerBar>
                <IndividualOnboardingStatusIndicator order='1' status={firstStepStatus} text="Enter your property details"/>
                <Line/>
                <IndividualOnboardingStatusIndicator order='2' status={secondStepStatus} text="Set description & price"/>
                <Line/>
                <IndividualOnboardingStatusIndicator order='3' status={thirdStepStatus} text="Finish up & sign"/>
                <SecondaryButton 
                    style={{marginLeft:'2%'}}
                    size="large"
                    hasArrow
                    onClick={() => router.push({ pathname: property.onboardingStep, query: { propertyId: property.id } })}
                    text="Continue">
                </SecondaryButton>
            </OnboardingTrackerBar>}
        </OnboardingTrackerContainer>}

    </ParentDiv>
}

export default PropertylistItem;