import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import {colors} from "../../styles/colors";
import Image from "next/image";

export type StyledInputProps = {
    onChange: (event?: any) => void;
    onSend: (event?: any) => void;
    style?: React.CSSProperties;
    value?: string;
    placeholder?: string;
    id?: string;
    marginTop?: string;
    // if you use password, you must use margintop object not via inline style
    isPassword?: boolean;
}

type PasswordIconProps = {
    marginTop?: number;
}

const StyledInput = styled.input`
    width: 100%;
    height: 60px;
    border: 1px solid ${colors.gray400};
    border-radius: 8px;

    font-size: 24px;
    line-height: 24px;
    font-family: Mint Grotesk Medium;
    padding-left: 20px;
    box-sizing: border-box;
    padding-right: 40px;
    &:focus {
        outline: none;
        border-radius: 0;
        border: 2px solid ${colors.darkgreen1000};
        padding-left: 20px;
        box-sizing: border-box;
        border-radius: 8px;
    }

    ::placeholder {
        color: ${colors.gray700};
    }
`;


const InputWrapper = styled.div`
    position: relative;
    width: 100%;
`;

const TogglePasswordIcon = styled.div<PasswordIconProps>`
    position: absolute;
    right: 20px;
    top: 34px;
    transform: translateY(-50%);
    cursor: pointer;
`;



const SendMessageIcon = () => <Image src="/icon_svg/send_message.svg" alt="" width={24} height={24} />;


function StyledInputComponent({ placeholder, onChange, onSend, value, style, id, marginTop }: StyledInputProps) {

    return (
        <InputWrapper style={{marginTop}}>
            <StyledInput
                style={style}
                placeholder={placeholder}
                onChange={(event) => onChange(event)}
                value={value}
                id={id}
            />
            <TogglePasswordIcon onClick={onSend}>
                <SendMessageIcon></SendMessageIcon>
            </TogglePasswordIcon>

        </InputWrapper>
    )
}

export default StyledInputComponent;