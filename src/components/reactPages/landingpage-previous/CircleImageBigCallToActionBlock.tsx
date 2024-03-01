// components/CenteredTextImage.js
import React from 'react';
import styled from '@emotion/styled';
import { H1, H5, H6 } from '../../Typography/OldTypography';
import { colors } from '../../../styles/oldColors';
import { useDevice } from "../../../contexts/DeviceContext";
import Image from 'next/image';

type ResponsiveProps = {
    width: number
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    top: 0;
    width: 100%;
    background-color: ${colors.background};
`;

const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    max-width: 1202px;

    text-align: center;
    margin-top: 120px;
    margin-bottom: 193px;
`;
const LineContainer = styled.div`
    position: absolute;
    width: 100%;

    z-index: 2;
`;

// sorry it's heinous, i can explain the calculation if u wanna talk about it
const LeftLine = styled.div<ResponsiveProps>`
    position: absolute; 
    top: 94px;
    width: ${props => (props.width >= 1202) ? "179" : props.width*.15}px;
    left: ${props => (props.width >= 1202) ? "292" : props.width*.175 + 81}px;
    z-index: 3;
    background-color: #0A0806;
    height: 1px;
`;
const RightLine = styled.div<ResponsiveProps>`
    position: absolute; 
    top: 94px;
    width: ${props => (props.width >= 1217) ? "179" : props.width*.15}px;
    right: ${props => (props.width >= 1217) ? "292" : props.width*.175 + 81}px;
    z-index: 3;
    background-color: #0A0806;
    height: 1px;
`;
    

const ParentCircleImagesAndTextRowContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    text-align: center;
`;

const ParentCircleImagesAndTextColumnContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 100%;

    text-align: center;
`;


const ChildImageAndTextContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 322px;
    height: 242px;
    text-align: center;
`;
const ParentContainer = styled.div`
  position: relative;
  width: 100%;
`;

const CircleImageBigCallToActionBlock = () => {
    const { windowSize } = useDevice();
    const isMobile = (windowSize.width <= 980);
    return (
        <Container>
            <ContentContainer>
                <H1 mobile={isMobile} style={{marginTop:"0px", width: "100%", maxWidth:"867px"}}> The new, best way to buy or sell a house. Period.</H1>
                <H5 mobile={isMobile} style={{marginTop:"32px", width: "100%", maxWidth:"578px"}}> No more 6% fees, no more antiquated tools, no more waiting on a realtor.</H5>
                <ParentContainer style={{marginTop:`${isMobile ? "80px": "120px"}`}}>
                    {!isMobile ? <LineContainer>
                        <LeftLine width={windowSize.width}></LeftLine>
                        <RightLine width={windowSize.width}></RightLine>
                    </LineContainer>
                    : null}
                    {!isMobile ?
                        <ParentCircleImagesAndTextRowContainer>
                            <ChildImageAndTextContainer>
                                <Image src="/landing/Listing_Sign.svg" alt='image'width={164} height={164}></Image>
                                <H6 style={{marginTop:"32px", width: "100%", maxWidth:"322px",  fontSize:"18px", lineHeight:"22.5px"}}>We walk you through our simplified step-by-step real estate process</H6>
                            </ChildImageAndTextContainer>
                            <ChildImageAndTextContainer>
                                <Image src="/landing/Mobile_Handheld.svg" alt='image'width={164} height={164}></Image>
                                <H6 style={{marginTop:"32px", width: "100%", maxWidth:"322px",  fontSize:"18px", lineHeight:"22.5px"}}>Get tools realtors use—without waiting days and without fees</H6>
                            </ChildImageAndTextContainer>
                            <ChildImageAndTextContainer>
                                <Image src="/landing/Mobile_Profile.svg" alt='image'width={164} height={164}></Image>
                                <H6 style={{marginTop:"32px", width: "100%", maxWidth:"322px",  fontSize:"18px", lineHeight:"22.5px"}}> List your house in minutes, not days.</H6>
                            </ChildImageAndTextContainer>
                        </ParentCircleImagesAndTextRowContainer>
                    : 
                        <ParentCircleImagesAndTextColumnContainer>
                            <ChildImageAndTextContainer>
                                <Image src="/landing/Listing_Sign.svg" alt='image'width={164} height={164}></Image>
                                <H6 style={{marginTop:"32px", width: "100%", maxWidth:"322px", fontSize:"18px", lineHeight:"22.5px"}}>We walk you through our simplified step-by-step real estate process</H6>
                            </ChildImageAndTextContainer>
                            <ChildImageAndTextContainer style={{marginTop:"100px"}}>
                                <Image src="/landing/Mobile_Handheld.svg" alt='image'width={164} height={164}></Image>
                                <H6 style={{marginTop:"32px", width: "100%", maxWidth:"322px", fontSize:"18px", lineHeight:"22.5px"}}>Get tools realtors use—without waiting days and without fees</H6>
                            </ChildImageAndTextContainer>
                            <ChildImageAndTextContainer style={{marginTop:"100px"}}>
                                <Image src="/landing/Mobile_Profile.svg" alt='image'width={164} height={164}></Image>
                                <H6 style={{marginTop:"32px", width: "100%", maxWidth:"322px", fontSize:"18px", lineHeight:"22.5px"}}>Send and sign everything—all online, all included in our pricing</H6>
                            </ChildImageAndTextContainer>
                        </ParentCircleImagesAndTextColumnContainer>
                    }
                </ParentContainer>
            </ContentContainer>
        </Container>
    );
};

export default CircleImageBigCallToActionBlock;