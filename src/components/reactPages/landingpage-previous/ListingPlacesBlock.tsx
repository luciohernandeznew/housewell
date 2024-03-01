// components/CenteredTextImage.js
import React from 'react';
import styled from '@emotion/styled';
import Image from 'next/image';
import { H1,H4, H5, H6 } from '../../Typography/OldTypography';
import { position } from 'polished';
import { colors } from '../../../styles/oldColors';
import SecondaryButton from '../../buttons/LandingSecondaryButton';
import { useRouter } from 'next/router';
import { useDevice } from "../../../contexts/DeviceContext";
import ImageSwiper from "../../stuff/ImageSwiper";
import { azeretMono } from '../../../styles/oldFonts';


const svgs = ["/icon_svg/Realtor.com.svg", "/icon_svg/Redfin.svg", "/icon_svg/Zillow.svg", "/icon_svg/FMLS.svg", "/icon_svg/Trulia.svg", ]
const svgsMobile = ["/icon_svg/FMLS.svg", "/icon_svg/Realtor.com_mobile.svg", "/icon_svg/Redfin_mobile.svg", "/icon_svg/Trulia_mobile.svg", "/icon_svg/Zillow_mobile.svg"]

const ContentFrame = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 180px;
  width: 100%;
  color: black;
  text-align: center;
  border-bottom: .5px solid black;
`;

const StyledH4 = styled.h4`
    font-size: 14px;
    font-weight: 400;
    line-height: 16.1px;
    color: ${colors.gray900};
    margin: 0;
    ${props => azeretMono.style}
`;


const IntroBedroomBlock = () => {
    const { isMobile } = useDevice();
    const router = useRouter();
    return (
        <ContentFrame>
            <div>
                {!isMobile ?
                    <StyledH4 style={{margin: "40px 0 24px 0"}}>LIST IN ALL THE RIGHT PLACES (INCLUDING THE MLS)—IN ONE STEP</StyledH4>
                    : <H5 style={{margin: "24px 0 24px 0", textAlign: "center"}} mobile>List on the major listing sites</H5>
                }
            </div>
            <div style={{display: "flex", width: "100%", maxWidth:"1066.7px", height: "61px", justifyContent: "space-between", alignContent: "center"}}>
                {!isMobile ? svgs.map(svg => (
                        <div key={svg} style={{position: "relative", width: "100%", height: "100%"}}>
                            <Image fill src={svg} alt="An SVG Icon" />
                        </div>
                    )
                ) : <ImageSwiper locs={svgsMobile} isActive={isMobile}/>}
            </div>
        </ContentFrame>
    );
};

export default IntroBedroomBlock;