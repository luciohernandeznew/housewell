import React from "react";
import styled from "@emotion/styled";
import { colors } from "../../styles/colors";
import { MintParagraph } from "../Typography/Typography";
import Image from "next/image";
import { getCookie } from "cookies-next";

export type SecondaryButtonProps = {
    style?: React.CSSProperties;
}

const StyledGoogleButton = styled.button`
    background-color: ${colors.background};
    color: ${colors.gray700};
    border: 1px solid ${colors.gray300};
    border-radius: 8px;
    height: 60px;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    
    &:hover {
        color: ${colors.gray700};
        background-color: #F8F8F8;
        border: 1px solid ${colors.gray600};
    }
    
    &:active {
        color: ${colors.gray700};
        background-color: #F5F5F5;
        border: 1px solid ${colors.gray600};
    }
`;

function GoogleSignInUpButton({ style }: SecondaryButtonProps) {

    const handleGoogleSignIn = () => {
        const redirectUrl = getCookie('redirectUrl');
        if (redirectUrl) {
            localStorage.setItem('redirectUrl', redirectUrl as string);
        }
        const clientId = '977078964771-1ff46gcjcaqf1qmlqgnhsm0v2l3o0p0f.apps.googleusercontent.com';
        const redirectUri = 'https://housewell.com/login?signInType=google';
        const scope = 'https://www.googleapis.com/auth/userinfo.email';

        const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}` 
            + `&redirect_uri=${encodeURIComponent(redirectUri)}`
            + '&response_type=code'
            + `&scope=${encodeURIComponent(scope)}`;

        window.location.href = authUrl;
    };

    return (
        <StyledGoogleButton onClick={handleGoogleSignIn} style={style}>
            <div style={{display:"flex", flexDirection:"row", alignItems:"center"}}>
                <Image src='/icon_svg/onboarding/third-party-sign-in/google_logo.svg' width={24} height={24} alt="Google icon" />
                <MintParagraph style={{marginLeft:"8px"}}size="16" weight="medium">Google</MintParagraph>
            </div>
        </StyledGoogleButton>
    )
}

export default GoogleSignInUpButton;
