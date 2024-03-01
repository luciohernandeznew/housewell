import React from "react";
import styled from "@emotion/styled";
import {colors} from "../../styles/oldColors";
import {plus_Jakarta_Sans} from "../../styles/oldFonts";
import { css } from '@emotion/react';

// todo: abstract shared props for all buttons
export type SelectableButtonProps = SelectableButtonStyleProps & {
    text: string;
    disabled?: boolean;
    icon?: React.ReactNode;
    onClick?: (event?: any) => void;
    style?: React.CSSProperties;
}

export type SelectableButtonStyleProps = {
    selected?: boolean;
}

const StyledSelectableButton = styled.button<SelectableButtonStyleProps>`
    background-color: ${colors.background};
    color: ${colors.typographyBlack};
    border: ${props => !props.selected ? `1px solid ${colors.typographyBlack}` : `2.5px solid ${colors.main500}`};

    font-size: 16px;
    font-weight: 700;

    height: 60px;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 16px 32px;

    &:hover {
        background-color: ${colors.gray50};
    }

    &:active {
        color: ${colors.background};
        background-color: ${colors.gray950};
    }
`;

function SelectableButton({text, selected, disabled, icon, onClick, style}: SelectableButtonProps) {
    return (
        <StyledSelectableButton selected={selected} disabled={disabled} onClick={onClick} style={style}>
            <span className={plus_Jakarta_Sans.className}>{text}</span>
            {icon}
        </StyledSelectableButton>
    )
}

export default SelectableButton;