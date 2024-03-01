import React from "react";
import {useDevice} from "../../../contexts/DeviceContext";
import WaitlistInput from "./WaitlistInput";
import styled from "@emotion/styled";
import {colors} from "../../../styles/oldColors";
import { useRouter } from 'next/router';
import { azeretMonoMedium } from '../../../styles/oldFonts';

const TextBlock = styled.div`
    font-family: 'Austin News Deck';
    font-style: normal;
    font-weight: 300;
    font-size: 64px;
    line-height: 100%;
    
    letter-spacing: -0.05em;
    
    color: #0A0806;
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

const StyledH4 = styled.h4`
    font-style: "normal";
    font-weight: "500";
    font-size: "14px";
    line-height: "115%";
    text-transform: "uppercase";
    color: "#0A0806";
    padding-bottom: "20px";
    letter-spacing: 0.1em;
    ${props => azeretMonoMedium.style}
`;

const GoodbyeEmailBlock: React.FC = (props: {}) => {
    const { windowSize } = useDevice();
    const isMobile = windowSize.width < 935;
    const router = useRouter();
    return <div style={{display: "flex", margin: isMobile ? "80px 24px 0 24px" : "120px 5% 0 5%", flexDirection: isMobile ? "column" : "row", justifyContent:"space-between"}}>
        <div style={{display: "flex", flexBasis: isMobile ? "100%" : "47%"}}>
            <TextBlock>
                <span>
                    Goodbye to the hassle.
                </span>
                {isMobile ? <>&nbsp;</> : <br />}
                <span>
                    Hello to
                </span>
                &nbsp;
                <span style={{color: "#E0650D"}}>
                    {isMobile ? "the new, better way to sell your home."
                        : "the new, better way buying or selling a home."}
                </span>
            </TextBlock>
        </div>
        
        { isMobile ? <StyledSecondaryButton onClick={() => router.push('https://c0d966crs6c.typeform.com/to/CpQwYhfV')} style={{width: "100%", marginTop: "80px"}}>JOIN WAITLIST</StyledSecondaryButton> :
            <div style={{display: "flex", flexBasis: "47%", flexDirection: "column"}}>
            <StyledH4>GET NOTIFIED</StyledH4>
                <WaitlistInput handleClick={() => router.push('https://c0d966crs6c.typeform.com/to/CpQwYhfV')}/>
            </div>
        }
    </div>
}

export default GoodbyeEmailBlock;