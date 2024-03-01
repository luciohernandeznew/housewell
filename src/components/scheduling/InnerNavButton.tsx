import React from "react";
import styled from "@emotion/styled";
import {colors} from "../../styles/oldColors";
import {P1} from "../Typography/OldTypography";

export type InnerNavButtonStyleProps = {
    selected: boolean
}
// padding: 35px 0 8px 0;
const StyledInnerNavButton = styled.div<InnerNavButtonStyleProps>`
    border-bottom: ${props => props.selected ? `3px solid ${colors.main500}` : "none"};
    padding: ${props => props.selected ? "35px 0 15px 0" : "35px 0 8px 0"};
    
    margin-right: 32px;
    z-index: 2;
`;

export type InnerNavButtonProps = InnerNavButtonStyleProps & {
    text: String,
    onClick: (event?: any) => void;
}

const InnerNavButton = ({ text, selected, onClick } : InnerNavButtonProps) => {
    return(<StyledInnerNavButton selected={selected} onClick={onClick}><P1>{text}</P1></StyledInnerNavButton>)
}

export default InnerNavButton;