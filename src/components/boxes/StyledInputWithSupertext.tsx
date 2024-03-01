import React, {useEffect, useState, useRef} from "react";
import styled from "@emotion/styled";
import {colors} from "../../styles/colors";
import numeral from "numeral";

export type AutoCompleteStrings = "address-line2" | "address-line1" | "address-level2" | "postal-code" | "country-name" | "email" | "tel" | "given-name" | "family-name" | "organization";

export type StyledInputProps = {
    onChange: (event?: any) => void;
    style?: React.CSSProperties;
    inputStyle?: React.CSSProperties;
    value?: string;
    autoComplete?: AutoCompleteStrings;
    placeholder?: string;
    id?: string;
    label: string;
    disabled?: boolean;
    moneyFormat?: boolean;
    step?: number | string;
    type?: React.HTMLInputTypeAttribute;
    min?: number;
    max?: number;
    shortened?: boolean;
}

export const cleanNumericValue = (value: string): string => {
    const indexOfDot = value.indexOf('.');
    if (indexOfDot !== -1) {
      value = value.substring(0, indexOfDot);
    }
    return value.replace(/[^0-9]/g, '');
};

const StyledInputContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    border: 1px solid ${colors.gray300};
    border-radius: 8px;
    padding: 1px 1px 8px 1px;
    box-sizing: border-box;

    &:focus-within {
        outline: none;
        border: 2px solid ${colors.darkgreen1000};
        padding: 0 0 7px 0;
        box-sizing: border-box;
        border-radius: 8px;
    }
    &:disabled {
        background-color: ${colors.gray100};
        color: ${colors.gray700};
    }
`;

const StyledLabel = styled.label`
    font-size: 12px;
    line-height: 12px;
    margin-left: 12px;
    margin-top: 8px;
    color: ${colors.gray800};
    font-family: Mint Grotesk Medium;
    margin-bottom: 2px; // Adjust as needed
`;

const StyledInput = styled.input<{shortened?: boolean}>`
    width: ${props => props.shortened ? "84%" : "93%"};
    height: 28px;
    border: none;
    margin-right: 15px;

    font-size: 24px;
    line-height: 24px;
    font-family: Mint Grotesk Medium;
    margin-left: 10px;
    margin-top: 2px;

    &:focus {
        outline: none;
        border-radius: 0;
    }
    
    ::placeholder {
        color: ${colors.gray700};
    }
    &:disabled {
        background-color: ${colors.gray100};
        color: ${colors.gray700};
    }
`;

function StyledInputWithSuperTextComponent(props: StyledInputProps) {
    const [displayValue, setDisplayValue] = useState<string>("");
    const inputRef = useRef<HTMLInputElement>(null); // 1. Create a ref

    const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target !== inputRef.current) {
            if (inputRef.current) {
                inputRef.current.focus();
            }
        }
    };
    

    useEffect(() => {
        setDisplayValue( numeral(props.value).format('$ 0,0'));
    }, [props.value]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectionStart = event.target.selectionStart || 0;
        const rawValue = event.target.value.replace(/[^0-9]/g, '');
        let formattedValue;

        // Calculate cursor position after formatting
        let cursorPosition = selectionStart || 0;
        let nonNumericBefore = 0;
        let nonNumericAfter = 0;

        if (props.moneyFormat) {
            if (rawValue === "") {
                formattedValue = "$ 0";
            } else {
                const newValue = parseInt(rawValue);
                formattedValue = !isNaN(newValue) ? numeral(newValue).format('$ 0,0') : "$ 0";
            }
            
            // Count non-numeric characters before the cursor in the original value
            nonNumericBefore = (event.target.value.substring(0, selectionStart).match(/[^0-9]/g) || []).length;

            // Update the display value
            setDisplayValue(formattedValue);
            event.target.value = formattedValue;

            // Count non-numeric characters before the cursor in the formatted value
            nonNumericAfter = (formattedValue.substring(0, cursorPosition).match(/[^0-9]/g) || []).length;

            // Adjust cursor position
            cursorPosition += (nonNumericAfter - nonNumericBefore);
        }

        props.onChange(event);

        // Set cursor position after state update
        setTimeout(() => {
            if (inputRef.current && inputRef.current.type !== 'number') {
                inputRef.current.selectionStart = inputRef.current.selectionEnd = Math.max(0, cursorPosition);
            }
        }, 0);
    };
    

    return (
        <StyledInputContainer style={props.style} onClick={handleContainerClick}>
            {props.label && <StyledLabel htmlFor={props.id}>{props.label}</StyledLabel>}
            <StyledInput
                id={props.id}
                ref={inputRef}
                type={props.type || "text"}
                placeholder={props.placeholder}
                autoComplete={props.autoComplete}
                onChange={handleChange}
                value={props.moneyFormat ? displayValue : props.value}
                disabled={props.disabled}
                step={props.step}
                style={props.inputStyle}
                min={props.min}
                max={props.max}
                shortened={props.shortened}
            />
        </StyledInputContainer>
    )
}

export default StyledInputWithSuperTextComponent;
