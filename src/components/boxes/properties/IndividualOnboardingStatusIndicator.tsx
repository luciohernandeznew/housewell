import React from "react";
import styled from "@emotion/styled";
import {colors} from "../../../styles/colors";
import { MintParagraph, FontSizes } from "../../Typography/Typography";
import Image from "next/image";

// todo: abstract shared props for all buttons
export type IndividualOnboardingStatusIndicatorProps = {
    text: string;
    status: 'todo' | 'in-progress' | 'completed';
    order: '1' | '2' | '3';
    ignoreBackground?: boolean;
    marginLeft?: string;
    fontSize?: FontSizes;
    padding?: string;
}



const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    border-radius: 60px;
`;
const TextWrapper = styled.div`
    display: inline-flex;
`;

const inProgressImageMap = {
    '1': '/icon_svg/property-onboarding/step-number-1.svg',
    '2': '/icon_svg/property-onboarding/step-number-2.svg',
    '3': '/icon_svg/property-onboarding/step-number-3.svg',
}

const fontColorMap = {
    'todo': colors.gray600,
    'in-progress': colors.brandMedGreen,
    'completed': colors.gray900,
}
    


function IndividualOnboardingStatusIndicator({text, status, order, ignoreBackground, marginLeft, fontSize, padding}: IndividualOnboardingStatusIndicatorProps) {
    let iconString = '/icon_svg/property-onboarding/completed-check.svg'; 
    if (status === 'todo') {
        iconString = '/icon_svg/property-onboarding/todo-check.svg';
    }
    if (status === 'in-progress') {
        iconString = inProgressImageMap[order]
    }
    const fontColor = fontColorMap[status];

    return (
        <Container style={{padding: padding ? padding : ignoreBackground ? '' : status === 'in-progress' ? '16px' : '', background: ignoreBackground ? '' : status === 'in-progress' ? colors.brightgreen200 : ''}}>
            <Image src={iconString} width={24} height={24} alt="X"/>
            <TextWrapper>
                <MintParagraph size={fontSize || '20'} weight="medium" style={{color: fontColor, marginLeft: marginLeft || "16px"}}>{text}</MintParagraph>
            </TextWrapper>
        </Container>
    )
}

export default IndividualOnboardingStatusIndicator;