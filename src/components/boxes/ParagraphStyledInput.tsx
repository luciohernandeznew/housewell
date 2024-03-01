
import React, { useRef, useEffect } from "react";
import styled from "@emotion/styled";
import {colors} from "../../styles/colors";


export type StyledInputProps = {
    onChange: (event?: any) => void;
    style?: React.CSSProperties;
    value?: string;
    placeholder?: string;
    id?: string;
    marginTop?: string;
    label?: string;
    maxLength?: number;
}
const StyledLabel = styled.label`
    font-size: 16px;
    line-height: 24px;
    color: ${colors.gray700};
    margin-bottom: 8px;
`;

const StyledTextarea = styled.textarea`
    width: 100%;
    padding: 12px 18px 12px 18px;
    border: 1px solid ${colors.gray400};
    border-radius: 8px;

    color: ${colors.gray900};
    font-family: 'Mint Grotesk';
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
    word-break: break-word;
    resize: none;
    overflow: auto;
    box-sizing: border-box;

    &:focus {
        outline: none;
        border: 2px solid ${colors.darkgreen400};
        padding: 11px 17px 11px 17px;
    }

    ::placeholder {
        color: ${colors.gray500};
    }

    :-ms-input-placeholder { /* Internet Explorer 10-11 */
        color: ${colors.gray500};
    }

    ::-ms-input-placeholder { /* Microsoft Edge */
        color: ${colors.gray500};
    }
`;



const InputWrapper = styled.div`
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: left;
`;







function StyledInputComponent({ placeholder, label, onChange, value, style, id, marginTop, maxLength }: StyledInputProps) {
    
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);


    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "inherit"; // Reset the height
            const computed = window.getComputedStyle(textareaRef.current);
            const height = parseInt(computed.getPropertyValue("border-top-width"), 10)
                         + parseInt(computed.getPropertyValue("padding-top"), 10)
                         + textareaRef.current.scrollHeight
                         + parseInt(computed.getPropertyValue("border-bottom-width"), 10);

            textareaRef.current.style.height = `${height}px`;
        }
    }, [value]); // Recalculate every time the value changes

    return (
        <InputWrapper style={{marginTop}}>
            {label && <StyledLabel htmlFor={id}>{label}</StyledLabel>}
            <StyledTextarea
                ref={textareaRef} // Attach the ref
                style={{...style, overflowY: 'hidden'}} // hide the vertical scrollbar
                placeholder={placeholder}
                onChange={(event) => onChange(event)}
                value={value}
                id={id}
                maxLength={maxLength}
            />
        </InputWrapper>
    )
}
export default StyledInputComponent;
