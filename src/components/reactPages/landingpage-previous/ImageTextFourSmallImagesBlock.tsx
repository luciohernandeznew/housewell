import React from 'react';
import styled from '@emotion/styled';
import Image from 'next/image';
import { H1, H5, H6 } from '../../Typography/OldTypography';
import { colors } from '../../../styles/oldColors';
import { useDevice } from "../../../contexts/DeviceContext";
import { is } from 'useragent';

export type ResponsiveProps = {
    mobile?: boolean
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    top: 0;
    width: 100%;
    background-color: #FFF3EA;
`;

const ContentContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: row-reverse;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 1367px;
    text-align: center;
    margin-top: 120px;
    margin-bottom: 130px;
`;

const SpacingBlock = styled.div`
    width: 100%;
`;

const TextAndSmallImageDiv = styled.div<ResponsiveProps>`
    width: 100%;
    min-width: ${props => props.mobile ? "0px" : "620px"};
    max-width: 675px;
    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content:flex-start;
    text-align: left;
`

const SmallImageBlockContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    width: 100%;
    height: 170px;
    margin-top: 80px;
`
const MobileSmallImsageBlockContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    margin-top: 80px;
`
const IndividualImageBlockContainer = styled.div<ResponsiveProps>`
    position: relative;
    display:flex;
    flex-direction: row;
    align-items: center;
    width: 325px;
    height: 61px;
    margin-top: ${props => props.mobile ? "40px" : "0px"};
`
const StyledH6 = styled.h6`
    margin: 0;
    font-weight: 500;
    font-size: 18px;
    line-height:22.5px;
    font-family: Mint Grotesk Medium;
`;







const IntroBedroomBlock = () => {
    const { isMobile, windowSize } = useDevice();
    return (
        <Container>
            <ContentContainer>
                {!isMobile ? <Image src="/landing/Second_Hero_Desktop.jpg" style={{borderRadius:"20px"}} width={660} height={479} alt='missing image'/>
                : <Image src="/landing/Second_Hero_Mobile.jpg" width={329} height={330} alt='missing image'/>}
                {windowSize.width < 1350 && <SpacingBlock style={{height:`${isMobile ? "64px" : "32px"}`}}/>}
                <TextAndSmallImageDiv mobile={isMobile}>
                    <H1 mobile={isMobile} style={{marginLeft:`${isMobile ? "24px" : "0"}`,marginRight:`${isMobile ? "24px" : "0"}`}}>Everything you need, all in one place</H1>
                    <H5 style={{marginTop:`${isMobile ? "24px" : "32px"}`, marginLeft:`${isMobile ? "24px" : "0"}`,marginRight:`${isMobile ? "24px" : "0"}`,fontSize:"22px", lineHeight:"27.5px"}}>Start your journey with us—no more 6% fees, no more antiquated tools, no more waiting.</H5>
                    {!isMobile ? <SmallImageBlockContainer>
                        <IndividualImageBlockContainer>
                            <Image src="/landing/Home_checked.svg" width={61} height={61} alt='missing image'/>
                            <StyledH6 style={{marginLeft:"20px"}}>List your home in all the right places</StyledH6>
                        </IndividualImageBlockContainer>
                        <IndividualImageBlockContainer>
                            <Image src="/landing/Mini_Calendar.svg" width={61} height={61} alt='missing image'/>
                            <StyledH6 style={{marginLeft:"20px"}}>Plan & Schedule Showings</StyledH6>
                        </IndividualImageBlockContainer>
                        <IndividualImageBlockContainer>
                            <Image src="/landing/Chat_Logo.svg" width={61} height={61} alt='missing image'/>
                            <StyledH6 style={{marginLeft:"20px"}}>Talk to a licensed realtor whenever you’re stuck</StyledH6>
                        </IndividualImageBlockContainer>
                        <IndividualImageBlockContainer>
                            <Image src="/landing/Doc_Logo.svg" width={61} height={61} alt='missing image'/>
                            <StyledH6 style={{marginLeft:"20px"}}>Manage all of your contracts in one place</StyledH6>
                        </IndividualImageBlockContainer>
                    </SmallImageBlockContainer>
                    : <MobileSmallImsageBlockContainer>
                        <IndividualImageBlockContainer>
                            <Image src="/landing/Home_checked.svg" width={61} height={61} alt='missing image'/>
                            <StyledH6 style={{marginLeft:"20px"}}>List your home in all the right places</StyledH6>
                        </IndividualImageBlockContainer>
                        <IndividualImageBlockContainer mobile>
                            <Image src="/landing/Chat_Logo.svg" width={61} height={61} alt='missing image'/>
                            <StyledH6 style={{marginLeft:"20px"}}>Talk to a licensed realtor whenever you’re stuck</StyledH6>
                        </IndividualImageBlockContainer>
                        <IndividualImageBlockContainer mobile>
                            <Image src="/landing/Mini_Calendar.svg" width={61} height={61} alt='missing image'/>
                            <StyledH6 style={{marginLeft:"20px"}}>Plan & Schedule Showings</StyledH6>
                        </IndividualImageBlockContainer>
                        <IndividualImageBlockContainer mobile>
                            <Image src="/landing/Doc_Logo.svg" width={61} height={61} alt='missing image'/>
                            <StyledH6 style={{marginLeft:"20px"}}>Manage all of your contracts in one place</StyledH6>
                        </IndividualImageBlockContainer>
                        </MobileSmallImsageBlockContainer>
                    }

                </TextAndSmallImageDiv>
            </ContentContainer>
        </Container>
  );
};

export default IntroBedroomBlock;