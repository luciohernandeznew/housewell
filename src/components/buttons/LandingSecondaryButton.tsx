import React from "react";
import styled from "@emotion/styled";
import {colors} from "../../styles/oldColors";
import {plus_Jakarta_Sans} from "../../styles/oldFonts";

// todo: abstract shared props for all buttons
export type SecondaryButtonProps = {
    text: string;
    icon?: React.ReactNode;
    disabled?: boolean;
    onClick?: (event?: any) => void;
    style?: React.CSSProperties;
}

const StyledSecondaryButton = styled.button`
    background-color: ${colors.background};
    color: ${colors.typographyBlack};
    border: 1px solid ${colors.typographyBlack};
    
    font-size: 16px;
    font-weight: 700;
    
    height: 60px;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 16px 32px;
    border-radius: 8px;
    
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

function SecondaryButton({text, icon, disabled, onClick, style}: SecondaryButtonProps) {
    return (
        <StyledSecondaryButton disabled={disabled} onClick={onClick} style={style}>
            <span className={plus_Jakarta_Sans.className}>{text}</span>
            {/* todo: style icon if necessary */}
            {icon}
        </StyledSecondaryButton>
    )
}

export default SecondaryButton;