import React from "react";
import styled from "@emotion/styled";
import {colors} from "../../styles/colors";
import { MintParagraph, FontSizes } from "../Typography/Typography";
import Image from "next/image";

// todo: abstract shared props for all buttons
export type SecondaryButtonProps = {
    text: string;
    disabled?: boolean;
    onClick?: (event?: any) => void;
    style?: React.CSSProperties;
    isLight?: boolean;
    size: "small" | "medium" | "large";
    icon?: string;
    hasArrow?: boolean;
    reverseArrow?: boolean;
    borderless?: boolean;
    iconWidth?: number;
    iconHeight?: number;
    iconSpacing?: string;
}
const sizeMap = {
    "small": {
        "height": "36px",
        "fontsize": "14",
        "borderRadius": "4px",
        "arrowSpacing": "20.5px",
        "paddingLeft": "16px",
        "paddingRight": "12.5px",
        "arrowHeight": 11.67,
        "arrowWidth": 15
    }, 
    "medium": {
        "height": "49px",
        "fontsize": "18",
        "borderRadius": "6px",
        "arrowSpacing": "20px",
        "paddingLeft": "20px",
        "paddingRight": "23px",
        "arrowHeight": 14,
        "arrowWidth": 18
    },
    "large": {
        "height": "60px",
        "fontsize": "24",
        "borderRadius": "6px",
        "arrowSpacing": "24px",
        "paddingLeft": "32px",
        "paddingRight": "28px",
        "arrowHeight": 18.67,
        "arrowWidth": 24

    }
};

type StyledSecondaryButtonProps = {
    size: "small" | "medium" | "large";
    isLight?: boolean;
    hasArrow?: boolean;
    borderless?: boolean;
    reverseArrow?: boolean;
}

const StyledSecondaryButton = styled.button<StyledSecondaryButtonProps>`
    background-color: ${props => props.isLight ? colors.background :colors.darkgreen1000};
    color: ${props => props.isLight ? colors.typographyBlack : colors.background};
    border: ${props => props.borderless ? "none" : props.isLight ? `1px solid ${colors.gray300}` : colors.darkgreen1000};

    border-radius: ${props => sizeMap[props.size].borderRadius};
    height: ${props => sizeMap[props.size].height};

    display: flex;
    flex-direction: ${props => props.reverseArrow ? 'row-reverse' : 'row'};
    align-items: center;
    justify-content: center;
    padding-left: ${props => props.hasArrow ? sizeMap[props.size].paddingLeft : "40px"};
    padding-right: ${props => props.hasArrow ? sizeMap[props.size].paddingRight : "40px"};
    cursor: pointer;
    
    &:hover {
        color: ${props => props.isLight ? colors.typographyBlack : colors.background};
        background-color: ${props => props.borderless ? props.isLight ? colors.gray100 : colors.darkgreen800 : props.isLight ? colors.background : colors.darkgreen800};
        border: ${props => props.borderless ? "none" : props.isLight ? `1px solid ${colors.darkgreen1000}` : colors.darkgreen800};
    }
    
    &:active {
        color: ${props => props.isLight ? colors.typographyBlack : colors.background};
        background-color: ${props => props.borderless ? props.isLight ? colors.gray100 : colors.darkgreen800 : props.isLight ? colors.background : colors.darkgreen800};
        border: ${props => props.borderless ? "none" : props.isLight ? `1px solid ${colors.darkgreen1000}` : colors.darkgreen800};
    }
    
    &:disabled {
        color: ${props=> props.isLight ? colors.gray300 : colors.gray600 };
        background-color: ${props=> props.isLight ? colors.gray100 : colors.gray300 };
        border: ${props=> props.isLight ? `1px solid ${colors.gray400}` : "none" };
    }
`;

const iconMap = {
    light: {
        disabled: "/icon_svg/onboarding/arrow_light_grey.svg",
        enabled: "/icon_svg/onboarding/arrow_black.svg"
    },
    dark: {
        disabled: "/icon_svg/onboarding/arrow_dark_grey.svg",
        enabled: "/icon_svg/onboarding/arrow_green.svg"
    }
}

function SecondaryButton({text, hasArrow, disabled, borderless, reverseArrow, onClick, style, isLight, icon, iconWidth, iconHeight, iconSpacing, size, ...props}: SecondaryButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
    const lightString = isLight ? "light" : "dark";
    const disabledString = disabled ? "disabled" : "enabled";
    const iconString = icon ? icon : reverseArrow ? '/icon_svg/onboarding/arrow-left.svg' : iconMap[lightString][disabledString];
    return (
        <StyledSecondaryButton borderless={borderless} reverseArrow={reverseArrow} disabled={disabled} size={size} onClick={onClick} hasArrow={hasArrow} isLight={isLight} style={style} {...props} >
            <MintParagraph size={sizeMap[size].fontsize as FontSizes} weight="medium">{text}</MintParagraph>
            {hasArrow ?
                <div style={{width: iconSpacing || sizeMap[size].arrowSpacing}} />
                : null
            }
            {hasArrow ?
                <Image src={ iconString} width={iconWidth || sizeMap[size].arrowWidth} height={iconHeight || sizeMap[size].arrowHeight} alt="arrow right" />
                : null
            }
        </StyledSecondaryButton>
    )
}

export default SecondaryButton;