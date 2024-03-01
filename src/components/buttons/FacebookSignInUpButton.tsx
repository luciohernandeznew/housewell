import React from 'react';
import styled from '@emotion/styled';
import { colors } from '../../styles/colors';
import { MintParagraph } from '../Typography/Typography';
import Image from 'next/image';

export type SecondaryButtonProps = {
    style?: React.CSSProperties;
}

const StyledFacebookButton = styled.button`
    background-color: #3975EA;
    color: ${colors.background};
    border-radius: 8px;
    height: 60px;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    
    &:hover {
        background-color: #3364D0;
    }
    
    &:active {
        background-color: #2D53B6;
    }
`;

function FacebookSignInUpButton({ style }: SecondaryButtonProps) {
    const handleFacebookSignIn = () => {
        const clientId = '875401527369751'; // Your Facebook App ID
        const redirectUri = 'https://housewell.com/login?signInType=facebook';
        const scope = 'email';

        const authUrl = `https://www.facebook.com/v12.0/dialog/oauth?client_id=${clientId}`
            + `&redirect_uri=${encodeURIComponent(redirectUri)}`
            + '&response_type=code'
            + `&scope=${encodeURIComponent(scope)}`;

        window.location.href = authUrl;
    };

    return (
        <StyledFacebookButton onClick={handleFacebookSignIn} style={style}>
            <div style={{display:"flex", flexDirection:"row", alignItems:"center"}}>
                <Image src='/icon_svg/onboarding/third-party-sign-in/fb_logo.svg' width={24} height={24} alt="Facebook icon" />
                <MintParagraph style={{marginLeft:"8px"}} size="16" weight="medium">Facebook</MintParagraph>
            </div>
        </StyledFacebookButton>
    )
}

export default FacebookSignInUpButton;
