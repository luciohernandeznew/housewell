import React from 'react';
import styled from "@emotion/styled";
import {colors} from "../../styles/colors";
import Image from "next/image";

export type MultipleChoiceCardProps = {
    selected?: boolean;
    index?: number;
    onClick?: (event?: any) => void;
    children: React.ReactNode;
}

const CardBody = styled.div<{ selected?: boolean }>`
    background-color: ${colors.background};
    border: ${props => !props.selected ? `1px solid rgba(31, 49, 33, 0.1)` : `2px solid ${colors.darkgreen1000}`};
    border-radius: 8px;
    flex: 1;

    display: flex;
    flex-direction: column;
    padding: ${props => props.selected ? '23px' : '24px'};

    &:hover, &:active {
        background-color: rgba(31, 49, 33, 0.04);
        border: ${props => !props.selected ? `1px solid ${colors.darkgreen1000}` : `2px solid ${colors.darkgreen1000}`};
    }
`;

function MultipleChoiceCard({index, children, selected, onClick}: MultipleChoiceCardProps) {
    return (
        <CardBody key={index} selected={selected} onClick={onClick}>
            <Image src={selected ? '/icon_svg/multi_check.svg' : '/icon_svg/multi_unchecked.svg'} alt={""} width={40} height={40} style={{marginRight:"12px"}}/>
            {children}
        </CardBody>
    )
}

export type MultipleChoiceCardParentProps = {
    choices: MultipleChoiceCardProps[];
    selectedIndex?: number;
    buttonSpacing?: string;
    onSelection: (index: number) => void;
    style?: React.CSSProperties;
}

const CardContainer = styled.div`
    display: flex;
    align-items: stretch;
`;

const MultipleChoiceCards = (props: MultipleChoiceCardParentProps) => {
    const handleSelection = (index: number) => {
        props.onSelection(index);
    };

    return (
        <CardContainer style={props.style}>
            {props.choices.map((choice, index) => (
                <>
                    <MultipleChoiceCard
                        index={index}
                        onClick={() => handleSelection(index)}
                        selected={index==props.selectedIndex}>
                        {choice.children}
                    </MultipleChoiceCard>
                    {(index !== props.choices.length - 1) && <div style={{width: props.buttonSpacing || "12px", height: '12px'}}/>}
                </>
            ))}
        </CardContainer>
    )
}
export default MultipleChoiceCards;