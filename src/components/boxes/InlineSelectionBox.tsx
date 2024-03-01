import styled from "@emotion/styled";
import {colors} from "../../styles/colors";
import React from "react";
import Image from "next/image";

const BoxContainer = styled.div<{ selected?: boolean }>`
    background-color: ${colors.background};
    border: ${props => !props.selected ? `1px solid rgba(31, 49, 33, 0.1)` : `2px solid ${colors.darkgreen1000}`};
    border-radius: 8px;
    flex: 1;
    margin-bottom: 12px;

    display: flex;
    padding: ${props => props.selected ? '23px 23px 31px 23px' : '24px 24px 32px 24px'};

    &:hover, &:active {
        background-color: rgba(31, 49, 33, 0.04);
        border: ${props => !props.selected ? `1px solid ${colors.darkgreen1000}` : `2px solid ${colors.darkgreen1000}`};
    }
`;

export type InlineSelectionBoxProps = {
    selected?: boolean;
    onClick?: (event?: any) => void;
    children: React.ReactNode;
}

const InlineSelectionBox: React.FC<InlineSelectionBoxProps> = (props: InlineSelectionBoxProps) => {
    return <BoxContainer selected={props.selected} onClick={props.onClick} >
        <Image src={props.selected ? '/icon_svg/multi_check.svg' : '/icon_svg/multi_unchecked.svg'} alt={""} width={40} height={40} style={{marginRight:"24px"}}/>
        <div>{props.children}</div>
    </BoxContainer>
}

export default InlineSelectionBox;