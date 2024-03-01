import React from "react";
import {useDevice} from "../../../contexts/DeviceContext";
import {H2, H3, H4, H6} from "../../Typography/OldTypography";
import {colors} from "../../../styles/oldColors";
import BulletPoint from "../../Typography/BulletPoint";
import PrimaryButton from "../../buttons/PrimaryButton";
import styled from "@emotion/styled";
import { useRouter } from 'next/router';
import { azeretMonoMedium } from '../../../styles/oldFonts';


type ResponsiveProps = {
    isMobile: boolean
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

const PricingBlock: React.FC = (props: {}) => {
    const { isMobile, windowSize } = useDevice();
    const router = useRouter();

    return (<Block isMobile={isMobile}>
        <div style={{maxWidth:  isMobile ? "400px" : "867px", color: isMobile ? "#121212" : "#0A0806"}}>
            <Title style={{paddingBottom: isMobile ? "24px" : "32px", fontSize: isMobile ? "48px" : "80px", lineHeight: isMobile ? "100%" : "92%"}}>
                Our Pricing
            </Title>
            <Subtitle style={{paddingBottom: isMobile ? "80px" : "96px", fontSize: isMobile ? "20px" : "28px", lineHeight: isMobile ? "26px" : "120%", width: "100%", maxWidth: "578px"}}>
                Get all the professional realtor tools, for a fraction of the cost
            </Subtitle>
        </div>
        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: "923px", width:"100%", flexDirection: isMobile ? "column" : "row"}}>
            <BlockSubBlock color={isMobile ? "#FFFFFF" : "rgba(173, 173, 173, 0.2)"} isMobile={isMobile} style={{maxWidth:"426px", padding: isMobile ? "0 0 64px 0" : "0 0 0 0"}}>
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

                    <StyledSecondaryButton onClick={() => router.push('https://c0d966crs6c.typeform.com/to/CpQwYhfV')} style={{width: "100%", marginTop: isMobile ? "80px" : "218px"}}>
                        <span style={{fontSize: "16px"}}>JOIN WAITLIST</span>
                    </StyledSecondaryButton>
                </div>
            </BlockSubBlock>
            {isMobile ? <div style={{height: "40px"}}/> : null}
            <BlockSubBlock color={isMobile ? "#FFFFFF" :"rgba(224, 101, 13, 0.2)"} style={{maxWidth:"426px"}} isMobile={isMobile}>
                <div style={{display: "flex", flexDirection: "column", flexGrow: 1, padding: isMobile ? "24px 24px 24px 24px" : "24px"}}>
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

                    <StyledSecondaryButton onClick={() => router.push('https://c0d966crs6c.typeform.com/to/CpQwYhfV')} style={{width: "100%", marginTop: "80px"}}>
                        <span style={{fontSize: "16px"}}>JOIN WAITLIST</span>
                    </StyledSecondaryButton>
                </div>
            </BlockSubBlock>
        </div>
    </Block>)
}

export default PricingBlock;