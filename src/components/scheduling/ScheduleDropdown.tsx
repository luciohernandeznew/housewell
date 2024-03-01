import styled from "@emotion/styled";
import React, { useState } from "react";
import {colors} from "../../styles/oldColors";
// import everything from scheduilingConstants.ts
import {
    FIFTEEN_MIN_INTERVAL_OPTIONS,
} from "./schedulingConstants";

export type TimeDropdownProps = {
    currentTime: string;
    isSecond?: boolean;
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  }
  
type StyledSelectProps = {
  isSecond?: boolean;
};
const StyledDropdown = styled.select<StyledSelectProps>`
  appearance: none;
  background-color: transparent;
  border: 1px solid ${colors.typographyBlack};
  border-radius: 0;
  font-size: 16px;
  padding: 10px;
  width: 100%;
  alignItems: center;
  border-top-left-radius: ${({ isSecond }) => (isSecond ? "0" : "4px")};
  border-top-right-radius: ${({ isSecond }) => (isSecond ? "0" : "4px")};
  border-bottom-left-radius: ${({ isSecond }) => (isSecond ? "4px" : "0")};
  border-bottom-right-radius: ${({ isSecond }) => (isSecond ? "4px" : "0")};
  margin-top: ${({ isSecond }) => (isSecond ? "-1px" : "")};
  &:focus {
    outline: none;
  }

  &::-ms-expand {
    display: none;
  }
  
`;

  
  function TimeDropdown({ currentTime, onChange, isSecond }: TimeDropdownProps) {

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        onChange(event);
    };
  
    return (
        <div>
          <StyledDropdown value={currentTime} isSecond={isSecond} onChange={handleChange}>
            {FIFTEEN_MIN_INTERVAL_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </StyledDropdown>
        </div>
      );
  }
  
export default TimeDropdown;
  