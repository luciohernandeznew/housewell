import React, {useState} from "react";
import styled from "@emotion/styled";
import {colors} from "../../styles/colors";

export type AutoCompleteStrings = "address-line2" | "address-line1" | "address-level2" | "postal-code" | "country-name" | "email" | "tel" | "given-name" | "family-name" | "organization";

export type StyledInputProps = {
    onChange: (event?: any) => void;
    style?: React.CSSProperties;
    value: string;
    autoComplete: AutoCompleteStrings;
    placeholder?: string;
    id?: string;
    label?: string; // Added label prop
}

const StyledInputContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    border: 1px solid ${colors.gray300};
    border-radius: 8px;
    height: 60px;
    box-sizing: border-box;

    &:focus-within {
        outline: none;
        border: 2px solid ${colors.darkgreen1000};
        box-sizing: border-box;
        border-radius: 8px;
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

const StyledInput = styled.input`
    width: 93%;
    height: 28px;
    border: none;
    margin-right: 15px;

    font-size: 24px;
    line-height: 24px;
    font-family: Mint Grotesk Medium;
    margin-left: 10px;

    &:focus {
        outline: none;
        border-radius: 0;
    }
    
    ::placeholder {
        color: ${colors.gray700};
    }
`;

function StyledSqFtInputWithSupertextComponent({ placeholder, autoComplete, onChange, value, style, id, label }: StyledInputProps) {
    const [localValue, setLocalValue] = useState<string>(value);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // strip out non-digit characters and " sq ft" from the end
        const newValue = e.target.value.replace(/[^\d]/g, '');
        setLocalValue(newValue);
        const eventObject = {
            target: {
                value: newValue,
            },
        };
        onChange(eventObject);
      };
    
      const handleBlur = () => {
        // append " sq ft" to the end when the input loses focus, if there's a value
        if (localValue && localValue.trim() !== '') {
          setLocalValue(localValue + ' sq ft.');
        }
      };
    
      const handleFocus = () => {
        // remove " sq ft" from the end when the input is focused
        if (!localValue) {
            return;
        }
        setLocalValue(localValue.replace(/ sq ft./g, ''));
      };
    return (
        <StyledInputContainer style={style}>
            {label && <StyledLabel htmlFor={id}>{label}</StyledLabel>}
            <StyledInput
                id={id}
                type="text"
                placeholder={placeholder}
                autoComplete={autoComplete}
                onBlur={handleBlur}
                onFocus={handleFocus}
                onChange={(event) => handleChange(event)}
                value={localValue}
            />
        </StyledInputContainer>
    )
}

export default StyledSqFtInputWithSupertextComponent;
