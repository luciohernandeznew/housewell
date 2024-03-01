import React, { useState } from "react";
import styled from "@emotion/styled";
import {colors} from "../../styles/colors";
import Image from "next/image";
import { margin } from "polished";



export type StyledIncrementDecrementProps = {
    onChange: (value: number) => void;
    style?: React.CSSProperties;
    initialValue: number;
    increment: number;
    text: string;
    id?: string;
}

const StyledParentDiv = styled.div`
    width: 100%;
    height: 60px;
    border: 1px solid ${colors.gray400};
    border-radius: 8px;

    font-size: 24px;
    line-height: 24px;
    font-family: Mint Grotesk Medium;
    box-sizing: border-box;

    display: flex;
    align-items: center;
    justify-content: space-between;
`;
const StyledButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 15%;
    border: none;
    background-color: transparent;
`;
const StyledText = styled.span`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 70%;
`;





const plusIcon = <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5 12H12M19 12H12M12 12V5M12 12V19" stroke="#1B311C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

const minusIcon = <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5 12H12H19" stroke="#1B311C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>




function StyledIncrementDecrementComponent({ onChange, initialValue, style, id, increment, text }: StyledIncrementDecrementProps) {
    const [value, setValue] = useState(initialValue);

    const incrementValue = () => {
        setValue(prev => prev + increment);
        onChange(value + increment);
    };

    const decrementValue = () => {
        if (value > increment) {
            setValue(prev => prev - increment);
            onChange(value - increment);
        }
    };

    return (
        <StyledParentDiv style={style} id={id}>
            <StyledButton onClick={decrementValue}>{minusIcon}</StyledButton>
            <StyledText>{`${value.toFixed(1).replace(/\.0$/, '')} ${text}`}</StyledText>
            <StyledButton onClick={incrementValue}>{plusIcon}</StyledButton>
        </StyledParentDiv>
    )
}


export default StyledIncrementDecrementComponent;
