import React, { useEffect, useState } from 'react';
import BottomNav from '../../headerFooter/BottomNav';
import styled from '@emotion/styled';
import {colors} from "../../../styles/oldColors";
import {useRouter} from "next/router";
import MultipleChoiceParent from '../../stuff/MultipleChoiceParent';
import OnboardingScreenFrame from '../../stuff/OnboardingScreenFrame';
import {H2, MintParagraph} from '../../Typography/Typography';
import { H3 } from "../../Typography/OldTypography";
import {useDevice} from "../../../contexts/DeviceContext";
import { azeretMonoMedium } from '../../../styles/oldFonts';
import BulletPoint from "../../Typography/BulletPoint";
import SecondaryButton from "../../buttons/SecondaryButton";
import { makeAuthedApiRequest } from '../../../utils/api/apiHelper';
import { getCookie } from 'cookies-next';




type ResponsiveProps = {
    isMobile: boolean;
}

const Title = styled.div`
    width: 100%;
    font-family: 'Austin News Deck';
    font-style: normal;
    font-weight: 300;
    
    text-align: center;
    letter-spacing: -0.05em;
`

const Subtitle = styled.div`
    font-family: 'Mint Grotesk';
    font-style: normal;
    font-weight: 400;
    margin: 0 auto;
    
    text-align: center;
    letter-spacing: -0.5px;
`;

const Block = styled.div<ResponsiveProps>`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: ${props => props.isMobile ? "80px 16px 80px 16px" : "100px 0 140px 0"};
    margin-bottom: ${props => props.isMobile ? "0" : "150px"};
`;

const BlockSubBlock = styled.div<{color: string} & ResponsiveProps>`
    position: relative;
    display: flex;
    flex-direction: column;
    width: ${props => props.isMobile ? "100%" : "50%"};
    
    background: linear-gradient(180deg, ${props => props.color} -11.78%, rgba(224, 101, 13, 0) 18.61%), #FFFFFF;
    border: 1px solid rgba(0, 0, 0, 0.08);
    box-shadow: 0px 78px 78px rgba(0, 0, 0, 0.04), 0px 20px 43px rgba(0, 0, 0, 0.05);
    border-radius: 20px;
`;
const Line = styled.div`
    margin-top: 16px;
    width: 100%;
    height: 0px;
    border: .3px solid #BDBDBD; 
`;

const BlockSubBlockTitle = styled.div`
    font-family: 'Mint Grotesk Medium';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 125%;
    text-align: left;
    color: #5A5754;
`
const StyledH4 = styled.h4`
    margin-top: 44px;
    font-weight: 500;
    font-size: 14px;
    line-height: 115%;

    letter-spacing: 0.1em;
    text-transform: uppercase;
    ${props => azeretMonoMedium.style}
`;

const StyledSecondaryButton = styled.button`
    background-color: ${colors.mainOrange};
    color: ${colors.background};
    border-radius: 5px;
    
    font-size: 16px;
    font-weight: 700;
    
    width: 195px;
    height: 56px;


    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
    &:hover {
        color: ${colors.background};
        background-color: ${colors.darkOrange};
    }
    
    &:active {
        color: ${colors.background};
        background-color: ${colors.darkerOrange};
    }
    
    &:disabled {
        color: ${colors.gray600};
        background-color: ${colors.gray300};
        border: 1px solid ${colors.gray600};
    }
`;


const ChoosePlan = () => {
    const [selected, setSelected] = useState(-1);

    const [isRightDisabled, setIsRightDisabled] = useState(selected === -1);
    function handleSelection(index: number) {
        setSelected(index);
        setIsRightDisabled(false);
    }
    const router = useRouter()
    const { isMobile } = useDevice();

    const handleNextSubmit = async (planType: string) => {
        try {
            const data = {
                planType,
            }
            await makeAuthedApiRequest({method: 'post', urlExtension: `/v1/user/updateUserPlanType`, data});
            router.push('/dashboard');
        } catch (error) {
            console.log(error);
        }
      }

    return (
        <OnboardingScreenFrame prevStep='/onboarding/user/part-1/collaborate' nextStep='/dashboard' maxWidth="923px" disabledRight={isRightDisabled} removeBottomNav>
                <H2 style={{maxWidth:"585px", width:"100%", marginBottom:"12px"}}>Choose your plan</H2>
                <MintParagraph size={"24"} weight={"medium"} style={{maxWidth:"585px", width:"100%", marginBottom:"64px", color: "#838A83"}}>You can always upgrade later</MintParagraph>
                <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: "923px", width:"100%", flexDirection: isMobile ? "column" : "row"}}>
                    <BlockSubBlock color={"rgba(173, 173, 173, 0.2)"} isMobile={isMobile} style={{maxWidth:"426px", padding: isMobile ? "0 0 0 0" : "0 0 0 0"}}>
                        <div style={{display: "flex", flexDirection: "column", flexGrow: 1, padding:"28px"}}>
                            <H3 weight="medium">Standard</H3>
                            <BlockSubBlockTitle style={{marginTop: "32px"}}>$0 to list</BlockSubBlockTitle>
                            <Line/>
                            <BlockSubBlockTitle style={{marginTop: "16px"}}>$499 when you sell</BlockSubBlockTitle>
                            <Line/>
                            <StyledH4>What you get</StyledH4>
                            <BulletPoint centered style={{marginTop: isMobile ? "18px" : "20px"}} mobile={isMobile}
                                        text={"Quickly and easily list on top real estate sites, Housewell, and MLS"}
                            />
                            <BulletPoint centered style={{marginTop: isMobile ? "18px" : "20px"}} jakarta mobile={isMobile}
                                        text={"Conveniently schedule tours"}
                            />
                            <BulletPoint centered style={{marginTop: isMobile ? "18px" : "20px"}} jakarta mobile={isMobile}
                                        text={"Manage offers & close with Housewell Tools"}
                            />
                            <SecondaryButton onClick={() => handleNextSubmit("standard")} size="large" text="Select Plan" hasArrow isLight style={{width: "100%", marginTop: isMobile ? "80px" : "218px"}}/>
                        </div>
                    </BlockSubBlock>
                    {isMobile ? <div style={{height: "40px"}}/> : null}
                    <BlockSubBlock color={"rgba(224, 101, 13, 0.2)"} style={{maxWidth:"426px"}} isMobile={isMobile}>
                        <div style={{display: "flex", flexDirection: "column", flexGrow: 1, padding: "28px"}}>
                            <H3 weight="medium">Premium</H3>
                            <BlockSubBlockTitle style={{marginTop: "32px"}}>$0 to list</BlockSubBlockTitle>
                            <Line/>
                            <BlockSubBlockTitle style={{marginTop: "16px"}}>1% when you sell</BlockSubBlockTitle>
                            <Line/>
                            <StyledH4>What you get</StyledH4>
                            <BulletPoint centered style={{marginTop: isMobile ? "18px" : "20px"}} jakarta mobile={isMobile}
                                        text={"Everything in the standard plan, plus"}
                            />
                            <BulletPoint centered style={{marginTop: isMobile ? "18px" : "20px"}} jakarta mobile={isMobile}
                                        text={"Professional photography, video, 3d tour"}
                            />
                            <BulletPoint centered style={{marginTop: isMobile ? "18px" : "20px"}} jakarta mobile={isMobile}
                                        text={"Pre-listing inspection"}
                            />
                            <BulletPoint centered style={{marginTop: isMobile ? "18px" : "20px"}} jakarta mobile={isMobile}
                                        text={"7 days a week access to local realtors for any of your questions"}
                            />
                            <BulletPoint centered style={{marginTop: isMobile ? "18px" : "20px"}} jakarta mobile={isMobile}
                                        text={"Professional Price Estimate"}
                            />
                            <BulletPoint centered style={{marginTop: isMobile ? "18px" : "20px"}} jakarta mobile={isMobile}
                                        text={"Only deal with serious buyers with financing verification and background checks"}
                            />

                            <SecondaryButton onClick={() => handleNextSubmit("premium")} size="large" text="Select Plan" hasArrow isLight style={{width: "100%", marginTop: "80px"}}/>
                        </div>
                    </BlockSubBlock>
                </div>
                {isMobile ? <div style={{height: "40px"}}/> : <div style={{height: "80px"}}/> }
        </OnboardingScreenFrame>
    )
}
export default ChoosePlan;