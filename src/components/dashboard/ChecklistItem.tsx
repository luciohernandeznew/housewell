import React from "react";
import styled from "@emotion/styled";
import {H4, MintParagraph} from "../Typography/Typography";

const ChecklistItemContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 16px;
`;

const CLItemNumberContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 16px 21px;
    
    width: 22px;
    min-width: 22px;
    height: 64px;
    
    border: 1px solid #E0E5E0;
    border-radius: 50px;
    margin-right: 24px;
`;

const CLItemInnerContainer = styled.div`
    display: flex;
    flex-direction: column;
    
    & > p {
        line-height: 24px;
    }
`;

export type ChecklistItemProps = {
    num: number,
    title: string,
    text: string
}

const ChecklistItem: React.FC<ChecklistItemProps> = (props: ChecklistItemProps) => {
    return <ChecklistItemContainer>
        <CLItemNumberContainer><H4>{props.num}</H4></CLItemNumberContainer>
        <CLItemInnerContainer>
            <MintParagraph size='20' weight="bold">{props.title}</MintParagraph>
            <MintParagraph size='16' weight="medium">{props.text}</MintParagraph>
        </CLItemInnerContainer>
    </ChecklistItemContainer>
}

export default ChecklistItem;
