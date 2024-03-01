import React from "react";
import styled from "@emotion/styled";
import {colors} from "../../styles/oldColors";
import {plus_Jakarta_Sans} from "../../styles/oldFonts";

// todo: abstract shared props for all buttons
export type PrimaryButtonProps = PrimaryButtonStyleProps & {
    text: string;
    disabled?: boolean;
    onClick?: (event?: any) => void;
    style?: React.CSSProperties;
}

export type PrimaryButtonStyleProps = {
    light?: boolean;
}

const StyledPrimaryButton = styled.button<PrimaryButtonStyleProps>`
    background-color: ${props => props.light ? colors.main700 : colors.main500};
    color: ${colors.background};
    border: none;
    
    font-size: 16px;
    font-weight: 700;
    white-space: nowrap;
    border-radius: 8px;
    
    height: 60px;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 16px 32px;
    
    &:hover {
        background-color: ${colors.main800};
    }
    
    &:active {
        color: ${colors.background};
        background-color: ${props => props.light ? colors.main900 : colors.main950};
    }
    
    &:disabled {
        opacity: 0.6;
        color: ${colors.gray400};
        pointer-events: none;
    }
`;

function PrimaryButton({text, light, disabled, onClick, style}: PrimaryButtonProps) {
    return (
        <StyledPrimaryButton light={light} disabled={disabled} onClick={onClick} style={style}>
            <span className={plus_Jakarta_Sans.className}>{text}</span>
        </StyledPrimaryButton>
    )
}

export default PrimaryButton;