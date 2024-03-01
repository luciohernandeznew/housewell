import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import {colors} from "../../styles/colors";

export type AutoCompleteStrings = "address-line2" | "address-line1" | "postal-code" | 
                                "country-name" | "email" | "tel" | 
                                "given-name" | "family-name" | "organization" |
                                "current-password" | "new-password" | 'address-level2';

export type StyledInputProps = {
    onChange: (event?: any) => void;
    style?: React.CSSProperties;
    isCursive?: boolean;
    value?: string;
    autoComplete?: AutoCompleteStrings;
    placeholder?: string;
    id?: string;
    marginTop?: string;
    name?: string;
    // if you use password, you must use margintop object not via inline style
    isPassword?: boolean;
    isError?: boolean;
    disabled?: boolean;
    maxLength?: number;
}

type PasswordIconProps = {
    marginTop?: number;
}

type MainStyledInputProps = {
    isError?: boolean;
    paddingRight: string;
    isCursive?: boolean;
}

const StyledInput = styled.input<MainStyledInputProps>`
    width: 100%;
    height: 60px;
    border: 1px solid ${props => props.isError ? colors.redError :colors.gray400};
    border-radius: 8px;

    font-size: 24px;
    line-height: 24px;
    font-family: ${props => props.isCursive ? 'Sacramento' : 'Mint Grotesk Medium'};
    padding-left: 20px;
    box-sizing: border-box;
    padding-right: ${props => props.paddingRight};
    &:focus {
        outline: none;
        border-radius: 0;
        border: 2px solid ${props => props.isError ? colors.redError :colors.darkgreen1000};
        padding-left: 20px;
        box-sizing: border-box;
        border-radius: 8px;
    }

    ::placeholder {
        color: ${colors.gray700};
    }
    &:disabled {
        background-color: ${colors.gray100};
        color: ${colors.gray500};
        cursor: not-allowed;
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



const EyeIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 12C2 12 5 5 12 5C19 5 22 12 22 12C22 12 19 19 12 19C5 19 2 12 2 12Z" stroke="#202626" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="#202626" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);
const EyeSlashIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.88 9.88C9.58526 10.1547 9.34885 10.4859 9.18488 10.8539C9.02091 11.2218 8.93274 11.6191 8.92564 12.0219C8.91853 12.4247 8.99263 12.8248 9.14351 13.1984C9.2944 13.5719 9.51898 13.9113 9.80385 14.1962C10.0887 14.481 10.4281 14.7056 10.8016 14.8565C11.1752 15.0074 11.5753 15.0815 11.9781 15.0744C12.3809 15.0673 12.7782 14.9791 13.1462 14.8151C13.5142 14.6512 13.8454 14.4148 14.12 14.12" stroke="#202626" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M10.73 5.08C11.1513 5.02751 11.5754 5.00079 12 5C19 5 22 12 22 12C21.5529 12.9571 20.9922 13.8569 20.33 14.68" stroke="#202626" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M6.61 6.60999C4.62125 7.96461 3.02987 9.82524 2 12C2 12 5 19 12 19C13.9159 19.0051 15.7908 18.4451 17.39 17.39" stroke="#202626" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 2L22 22" stroke="#202626" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);


function StyledInputComponent({ placeholder, autoComplete, onChange, value, style, id, isPassword, name, marginTop, isError, disabled, isCursive, maxLength }: StyledInputProps) {
    const [passwordShown, setPasswordShown] = useState(false);

    const togglePasswordVisiblity = () => {
        setPasswordShown(!passwordShown);
    }

    return (
        <InputWrapper style={{marginTop}}>
            <StyledInput
                disabled={disabled}
                type={isPassword && !passwordShown ? "password" : "text"}
                style={style}
                placeholder={placeholder}
                autoComplete={autoComplete}
                onChange={(event) => onChange(event)}
                value={value}
                id={id}
                name={name}
                paddingRight={isPassword ? '40px' : '12px'}
                isError={isError}
                isCursive={isCursive}
                maxLength={maxLength}
            />
            {isPassword && !!value && (
                <TogglePasswordIcon 
                    onClick={togglePasswordVisiblity}
                    title={passwordShown ? 'Hide Password' : 'Show Password'}
                    aria-label={passwordShown ? 'Hide Password' : 'Show Password'}>
                    {passwordShown ?  <EyeIcon /> : <EyeSlashIcon />}
                </TogglePasswordIcon>
            )}
        </InputWrapper>
    )
}

export default StyledInputComponent;
