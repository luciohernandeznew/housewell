import React from "react";
import styled from "@emotion/styled";
import { colors } from "../../styles/colors";
import Link from 'next/link';
import { MintParagraph } from "../Typography/Typography";

const CheckboxContainer = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
`;

const CheckboxInput = styled.input`
    display: none;
`;

const CheckboxLabel = styled.label`
    font-size: 14px;
    margin-left: 10px;
    color: gray;
`;

const StyledCheckbox = styled.div`
    width: 16px;
    height: 16px;
    min-width: 16px;
    border: 1px solid gray;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const CheckedIcon = styled.div`
    width: 14px;
    height: 14px;
    background-color: ${colors.darkgreen1000};
    border-radius: 3px;
`;

type AcknowledgmentCheckboxProps = {
    isChecked: boolean;
    onToggle: () => void;
}

function AcknowledgmentCheckbox({ isChecked, onToggle }: AcknowledgmentCheckboxProps) {
    return (
        <CheckboxContainer onClick={onToggle}>
            <CheckboxInput type="checkbox" checked={isChecked} onChange={onToggle} />
            <StyledCheckbox>
                {isChecked && <CheckedIcon />}
            </StyledCheckbox>
            <MintParagraph size="14" weight='regular' style={{ marginLeft: '10px', color: colors.darkgreen1000 }}>
                I have read and agree to the Housewell <Link onClick={(e)=> (e.stopPropagation())} href="https://housewell.com/terms-of-use" style={{ textDecoration: 'underline', color: 'darkgreen'  }} rel="noopener noreferrer" target="_blank">Terms and Conditions</Link>
            </MintParagraph>
        </CheckboxContainer>
    );
}

export default AcknowledgmentCheckbox;
