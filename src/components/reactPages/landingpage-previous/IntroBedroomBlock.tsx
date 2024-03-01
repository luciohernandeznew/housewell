// components/CenteredTextImage.js
import React from 'react';
import styled from '@emotion/styled';
import Image from 'next/image';
import { H2, H6 } from '../../Typography/OldTypography';
import { colors } from '../../../styles/oldColors';
import { useRouter } from 'next/router';
import { useDevice } from "../../../contexts/DeviceContext";

export type ResponsiveProps = {
    mobile?: boolean
}

const StyledSecondaryButton = styled.button<ResponsiveProps>`
    background-color: ${colors.mainOrange};
    color: ${colors.background};
    border-radius: 5px;
    
    font-size: 16px;
    
    width: ${props => props.mobile ? '83%' : '195px'};
    height: 56px;
    border: ${props => props.mobile ? '4px solid rgba(255, 255, 255, 0.2)' : 'none'};


    align-items: center;
    justify-content: center;
    font-family: 'Mint Grotesk Bold';
    
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

const Container = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    height: 890px; // Adjust the image height according to your preference
`;

const ImageWrapper = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
`;

const BackgroundImage = styled.img`
    position: absolute;
    min-width: 100%;
    height: 100%;
    left: 50%;
    transform: translateX(-50%);
    object-fit: cover;
`;

const ContentFrame = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    top: 130px;
    height: 519.16px;
    width: 100%;
    max-width: 797px;
    flex-wrap: wrap;
    color: white;
    text-align: center;
    z-index: 2;
`;
const WaitlistBlock = styled.div`
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 80px;
    background: #FFFFFF;
    border-radius: 12px;
`;

const WaitlistEmailInput = styled.input<ResponsiveProps>`
    position: absolute;
    left: 24px;
    top: 24px;
    bottom: 24px;
    font-size: 24px;
    height: 32px;
    font-family: 'Mint Grotesk';
    border: none;
`;

const TextAndLogoBlock = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 649px;
    height: 319.16px;
`

const IntroBedroomBlock = () => {
    const { windowSize } = useDevice();
    const router = useRouter();
    const isMobile = windowSize.width < 715;
    function handleClick() {
        router.push('https://c0d966crs6c.typeform.com/to/CpQwYhfV');
    }
    return (
        <Container>

            <ContentFrame>

                <TextAndLogoBlock>
                    <Image src='/landing/whitelogoandtitletogether.svg' alt="image" width={248} height={41.16} style={{maxWidth:"248px", width:"100%", height:"41.16"}}/>
                    <H2 mobile={isMobile} style={{position:"absolute", top:"121.6px", width: "100%"}}> List your house or make an offer in minutes, not days.</H2>
                    <H6 style={{position:"absolute", top:"261.16px", marginTop:`${isMobile ? "24px" : "0px"}`,letterSpacing: "-0.5px", width: "100%", maxWidth:"578px"}}> Start your journey with us—no more 6% fees, no more antiquated tools, no more waiting. </H6>
                </TextAndLogoBlock>

                {!isMobile ? 
                <WaitlistBlock>
                    <WaitlistEmailInput type="text" placeholder="Enter your email"/>
                    <StyledSecondaryButton style={{position:"absolute", right:"12px", bottom:"12px"}} onClick={handleClick}>
                        <span style={{fontSize:"16px"}}>JOIN WAITLIST</span>
                    </StyledSecondaryButton>
                </WaitlistBlock>
                :   
                <StyledSecondaryButton mobile={isMobile} style={{marginTop:"86px"}} onClick={handleClick}>
                    <span style={{fontSize:"16px"}}>JOIN WAITLIST</span>
                </StyledSecondaryButton>
                }

            </ContentFrame>

            <ImageWrapper>
                <BackgroundImage src='https://dyqpd3w9nj7ap.cloudfront.net/static-web-assets/website/landing/landing_background_desktop.png' alt="image" />
            </ImageWrapper>
        </Container>
  );
};

export default IntroBedroomBlock;