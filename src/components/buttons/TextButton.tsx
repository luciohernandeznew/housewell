import React from "react";
import styled from "@emotion/styled";
import {colors} from "../../styles/oldColors";
import {plus_Jakarta_Sans} from "../../styles/oldFonts";

// todo: abstract shared props for all buttons
export type TextButtonProps = {
    text: string;
    disabled?: boolean;
    onClick?: (event?: any) => void;
    style?: React.CSSProperties;
}

const StyledTextButton = styled.button`
    background-color: transparent;
    color: ${colors.typographyBlack};
    border: none;
    
    font-size: 16px;
    font-weight: 700;
    
    &:hover {
        text-decoration-line: underline;
    }
`;

function TextButton({text, disabled, onClick, style}: TextButtonProps) {
    return (
        <StyledTextButton disabled={disabled} onClick={onClick} style={style}>
            <span className={plus_Jakarta_Sans.className}>{text}</span>
        </StyledTextButton>
    )
}

export default TextButton;