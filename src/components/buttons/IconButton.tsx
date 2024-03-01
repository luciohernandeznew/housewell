import React from "react";
import styled from "@emotion/styled";
import {colors} from "../../styles/oldColors";

// todo: abstract shared props for all buttons
export type IconButtonProps = {
    icon?: React.ReactNode;
    disabled?: boolean;
    onClick?: (event?: any) => void;
    style?: React.CSSProperties;
    isSecond?: boolean
}
type StyledIconProps ={
    isSecond?: boolean
}

const StyledIconButton = styled.button<StyledIconProps>`
    background-color: ${colors.background};
    color: ${colors.typographyBlack};
    border: 1px solid ${colors.typographyBlack};
    border-radius: 2px;
    margin-left: ${({ isSecond }) => (isSecond ? "-2px" : "")};
    
    font-size: 16px;
    font-weight: 700;
    
    height: 24px;
    width: 24px;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    &:hover {
        background-color: ${colors.gray50};
    }
    
    &:active {
        color: ${colors.background};
        background-color: ${colors.gray950};
    }
    
    &:disabled {
        color: ${colors.gray600};
        background-color: ${colors.gray300};
        border: 1px solid ${colors.gray600};
    }
`;

function IconButton({icon, disabled, onClick, isSecond, style}: IconButtonProps) {
    return (
        <StyledIconButton disabled={disabled} isSecond={isSecond} onClick={onClick} style={style}>
            {/* todo: style icon if necessary */}
            {icon}
        </StyledIconButton>
    )
}

export default IconButton;