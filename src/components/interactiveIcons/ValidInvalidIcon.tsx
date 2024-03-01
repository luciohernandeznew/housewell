import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import {colors} from "../../styles/colors";
import { MintParagraph } from "../Typography/Typography";
// check

const CheckSVG = () => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_854_9570)">
        <circle cx="7" cy="7" r="7" fill="#45C779"/>
        <path d="M4 7L6 9L10 5" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
        </g>
        <defs>
        <clipPath id="clip0_854_9570">
        <rect width="14" height="14" fill="white"/>
        </clipPath>
        </defs>
    </svg>
);
const WarningSVG = () => (
    <svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M7.76217 0.986649C7.34091 0.337387 6.65926 0.338181 6.23852 0.986649L0.178978 10.3258C-0.242282 10.9751 0.105602 11.5 0.954849 11.5H13.0458C13.8925 11.5 14.2425 10.9743 13.8217 10.3258L7.76217 0.986649ZM7 8C6.60553 8 6.27475 7.70214 6.23354 7.30983L5.95521 4.66028C5.89007 4.04008 6.37639 3.5 7 3.5C7.62361 3.5 8.10993 4.04008 8.04479 4.66028L7.76646 7.30983C7.72525 7.70214 7.39447 8 7 8ZM5.83333 9.5C5.83333 10.0534 6.34936 10.5 7 10.5C7.65064 10.5 8.16667 10.0534 8.16667 9.5C8.16667 8.9466 7.65064 8.5 7 8.5C6.34936 8.5 5.83333 8.9466 5.83333 9.5Z" fill="#F46363"/>
    </svg>
  );
const ParentDiv = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
`;

export type StyledInputProps = {
    style?: React.CSSProperties;
    isValid?: boolean;
    text?: string;
}

function StyledInputComponent({ style, isValid, text }: StyledInputProps) {
    return (
        <ParentDiv style={style}>
            {isValid ? 
            <>
                <CheckSVG/>
            </> :
            <>
                <WarningSVG/>
            </>
            }
            <MintParagraph weight="medium" size="14" style={{marginLeft: "6px", color: isValid ? colors.gray1000 : colors.gray700}}>{text}</MintParagraph>
        </ParentDiv>
    )
}

export default StyledInputComponent;



