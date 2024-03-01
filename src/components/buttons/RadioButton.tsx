import React from "react";
import styled from "@emotion/styled";
import {colors} from "../../styles/oldColors";
import {P2} from "../Typography/OldTypography";

// todo: abstract shared props for all buttons
export type RadioButtonProps = {
    text: string;
    name: string;
    value: string;
    checked?: boolean
    // disabled?: boolean;
    onChange?: (event?: any) => void;
    style?: React.CSSProperties;
}

const RadioButtonContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 8px;
`;

const StyledRadioButton = styled.input`
    height: 20px;
    width: 20px;
    margin: 0 8px 0 0;
    accent-color: ${colors.main800};
    
    &:hover {
        accent-color: ${colors.main900};
    }
`;


function RadioButton({text, name, value, checked,
                         // disabled,
                         onChange,
                         style}: RadioButtonProps) {
    return (
        <RadioButtonContainer style={style}>
            <StyledRadioButton onChange={onChange} checked={checked} type="radio" id={"radio"+value} name={name} value={value} />
            <label htmlFor={"radio"+value}><P2 jakarta>{text}</P2></label>
        </RadioButtonContainer>
    )
}

export default RadioButton;