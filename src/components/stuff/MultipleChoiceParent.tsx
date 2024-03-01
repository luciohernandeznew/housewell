import React, { useEffect, useState } from 'react';
import MultipleChoiceButton, { MultipleChoiceButtonProps } from '../buttons/MultipleChoiceButton';
import { useDevice } from "../../contexts/DeviceContext";
import { FontSizes } from '../Typography/Typography';



export type MultipleChoiceParentProps = {
    multipleSelectable?: boolean;
    choices: MultipleChoiceButtonProps[];
    selectedIndex?: number;
    buttonSpacing?: string;
    buttonHeight?: string;
    onSelection: (index: any) => void;
    style?: React.CSSProperties;
    useChecks?: boolean;
    fontSize?: FontSizes;
    child?: React.ReactNode;
    childIndex?: number;
    defaultChecks?: any
    isRow?: boolean;
}

const MultipleChoiceParent = (props: MultipleChoiceParentProps) => {
    const { isMobile } = useDevice();
    const { defaultChecks } = props
    const [indexArray, setIndexArray] = useState<any>(defaultChecks);

    const handleSelection = (index: number) => {
        if (props.multipleSelectable) {
            indexArray[index] = !indexArray[index]
            setIndexArray((indexArray: Array<any>) => {
                return [...indexArray];
            });
            props.onSelection(indexArray);
        }
        else {
            props.onSelection(index);
        }
    };

    useEffect(() => {
        setIndexArray(defaultChecks)
    }, [defaultChecks])
    const containerStyle: React.CSSProperties = {
        display: 'flex',
        flexDirection: props.isRow ? 'row' : 'column', // Conditionally set flex direction
        flexWrap: props.isRow ? 'wrap' : 'nowrap', // Add wrap to handle overflow if in row layout
        ...props.style,
    };


    return (
        <div style={containerStyle}>
            {
                    props.choices.map((choice, index) => (
                        <React.Fragment key={index}>
                        <MultipleChoiceButton
                            height={props.buttonHeight || isMobile ? "64px" : "88px"}
                            onClick={() => handleSelection(index)}
                            text={choice.text}
                            selected={props.multipleSelectable ? indexArray[index] : index == props.selectedIndex}
                            activeIconPath={props.useChecks ? '/icon_svg/multi_check.svg' : undefined}
                            inactiveIconPath={props.useChecks ? '/icon_svg/multi_unchecked.svg' : undefined}
                            fontSize={props.fontSize}
                            isRow={props.isRow}
                        />
                        {(index === props.childIndex && index == props.selectedIndex) && (props.child)}
                        {(index !== props.choices.length - 1) && !props.isRow && <div style={{ height: props.buttonSpacing || "12px" }} />}
                        {(index !== props.choices.length - 1) && props.isRow && <div style={{ width: props.buttonSpacing || "3%" }} />}
                    </React.Fragment>
                    ))
            }
        </div>
    )
}
export default MultipleChoiceParent;