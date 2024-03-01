import React from "react";
import styled from "@emotion/styled";
import {colors} from "../../styles/colors";
import { MintParagraph, FontSizes } from "../Typography/Typography";
import Image from "next/image";

// todo: abstract shared props for all buttons
export type SecondaryButtonProps = {
    style?: React.CSSProperties;
}

const StyledFacebookButton = styled.button`
    background-color: #333333;
    color: ${colors.background};

    border-radius: 8px;
    height: 60px;
    width: 100%;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    
    &:hover {
        background-color: #4F4F4F;
    }
    
    &:active {
        background-color: #666666;
    }
`;

// todo: hook it up to fb sign in flow
function FacebookSignInUpButton({ style }: SecondaryButtonProps) {
    return (
        <StyledFacebookButton style={style}>
            <div style={{display:"flex", flexDirection:"row", alignItems:"center"}}>
            <Image src='/icon_svg/onboarding/third-party-sign-in/apple_logo.svg' width={24} height={24} alt="appl icon" />
            <MintParagraph style={{marginLeft:"8px"}}size="16" weight="medium">Apple</MintParagraph>
            </div>
        </StyledFacebookButton>
    )
}

export default FacebookSignInUpButton;