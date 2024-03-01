import React from "react";
import dayjs from "dayjs";
import styled from "@emotion/styled";
import {colors} from "../../styles/colors";


export const StyledInputContainer = styled.div<{shouldReverse?: boolean}>`
    display: flex;
    width: 100%;
    border: 1px solid ${colors.gray300};
    border-radius: 8px;
    box-sizing: border-box;
    padding: 1px;

    &:focus-within {
        outline: none;
        border: 2px solid ${colors.darkgreen1000};
        padding: 0px;
        box-sizing: border-box;
        border-radius: 8px;
    }
    &:disabled {
        background-color: ${colors.gray100};
        color: ${colors.gray700};
    }
`;

export const StyledLabel = styled.label`
    font-size: 12px;
    line-height: 12px;
    margin-left: 12px;
    margin-top: 8px;
    color: ${colors.gray800};
    font-family: Mint Grotesk Medium;
    margin-bottom: 2px; 
`;

export const StyledInput = styled.input<{isSmall?: boolean}>`
    height: 28px;
    border: none;

    font-size: ${props => props.isSmall ? '16px' : '24px'};
    line-height: ${props => props.isSmall ? '18px' : '24px'};
    font-family: Mint Grotesk Medium;
    margin: 2px 15px 0 10px;

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
export type StyledYearMonthMultiProps = {
    setFirstValue: (value: number | '') => void;
    firstValue: number;
    firstPlaceholder: string;
    setSecondValue: (value: number | '') => void;
    secondValue: number;
    secondPlaceholder: string;
    style?: React.CSSProperties;
    disabled?: boolean;
    idPrefix?: string;
    isSmall?: boolean;
    allowOnlyNumbers?: boolean;
}
const StyledYearMonthMultiInput: React.FC<StyledYearMonthMultiProps> = (props: StyledYearMonthMultiProps) => {
    const handleNumericInputChange = (value: string, setValue: (value: number | '') => void) => {
        const numericValue = value.replace(/[^0-9]/g, '');
        setValue(numericValue === '' ? '' : parseInt(numericValue));
    };
    


    return <StyledInputContainer style={props.style}>
        <div style={{ display: "flex", width: '100%', flexDirection: "column", flex: "1", borderRight: `1px solid ${colors.gray300}`, paddingBottom: "8px", paddingRight:'20px' }}>
            <StyledLabel htmlFor={`${props.idPrefix}_1`}>Years</StyledLabel>
            <StyledInput
                isSmall={props.isSmall}
                style={{width:'100%'}}
                id={`${props.idPrefix}_1`}
                min="0"
                max="99"
                value={props.firstValue}
                onChange={(e) => handleNumericInputChange(e.target.value, props.setFirstValue)}
                disabled={props.disabled}
                placeholder={props.firstPlaceholder}
                required
            />
        </div>

        <div style={{ display: "flex", flexDirection: "column", flex: "1", paddingBottom: "8px", width: props.isSmall ? '100%' : '10%'}}>
           <StyledLabel htmlFor={`${props.idPrefix}_DateInput`}>Months</StyledLabel>
            <StyledInput
                isSmall={props.isSmall}
                style={{width: props.isSmall ? '140px' : ''}}
                id={`${props.idPrefix}_2`}
                min={0}
                max={11}
                value={props.secondValue}
                onChange={(e) => handleNumericInputChange(e.target.value, props.setSecondValue)}
                disabled={props.disabled}
                placeholder={props.secondPlaceholder}
                required
            />
        </div>
        </StyledInputContainer>
}

export default StyledYearMonthMultiInput;