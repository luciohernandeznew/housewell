import React, {useEffect, useState}from "react";
import styled from "@emotion/styled";
import {colors} from "../../styles/colors";
import { MintParagraph, FontSizes } from "../Typography/Typography";
import Image from "next/image";
import { useDevice } from "../../contexts/DeviceContext";

// todo: abstract shared props for all buttons
export type MultipleChoiceButtonProps = MultipleChoiceButtonStyleProps & {
    index?: number;
    text: string;
    activeIconPath?: string;
    inactiveIconPath?: string;
    onClick?: (event?: any) => void;
    fontSize?: FontSizes;
    isRow?: boolean;
}

export type MultipleChoiceButtonStyleProps = {
    selected?: boolean;
    height?: string;
    isRow?: boolean;
}

const StyledMultipleChoiceButton = styled.div<MultipleChoiceButtonStyleProps>`
    background-color: ${colors.background};
    border: ${props => !props.selected ? `1px solid rgba(31, 49, 33, 0.1)` : `2px solid ${colors.darkgreen1000}`};
    border-radius: 8px;
    width: ${props => props.isRow ? "31.2%" : "100%"};
    height: ${props => props.height || "88px"};

    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content: center;

    &:hover {
        background-color: rgba(31, 49, 33, 0.04);
        border: ${props => !props.selected ? `1px solid ${colors.darkgreen1000}` : `2px solid ${colors.darkgreen1000}`};
    }

    &:active {
        background-color: rgba(31, 49, 33, 0.04);
        border: ${props => !props.selected ? `1px solid ${colors.darkgreen1000}` : `2px solid ${colors.darkgreen1000}`};
    }
`;

const ImageAndTextDiv = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: left;
    margin: 24px 24px 24px 24px;
`;



function MultipleChoiceButton({text, selected, height, activeIconPath, inactiveIconPath, onClick, fontSize, isRow}: MultipleChoiceButtonProps) {
    const [loadedActiveIcon, setLoadedActiveIcon] = useState('/icon_svg/onboarding/multiple_choice_selected.svg');
    const [loadedInactiveIcon, setLoadedInactiveIcon] = useState('/icon_svg/onboarding/multiple_choice_unselected.svg');
    const { isMobile } = useDevice();
    const activeIcon = activeIconPath || '/icon_svg/onboarding/multiple_choice_selected.svg';
    const inactiveIcon = inactiveIconPath || '/icon_svg/onboarding/multiple_choice_unselected.svg';

    // Preload the images when the component mounts, probably better to do this via svg fill eventually
    useEffect(() => {
        const imgActive = new window.Image();
        imgActive.src = activeIcon;
        imgActive.onload = () => setLoadedActiveIcon(activeIcon);
        
        const imgInactive = new window.Image();
        imgInactive.src = inactiveIcon;
        imgInactive.onload = () => setLoadedInactiveIcon(inactiveIcon);
    }, [activeIcon, inactiveIcon]);
    return (
        <StyledMultipleChoiceButton isRow={isRow} height={height} selected={selected} onClick={onClick}>
            <ImageAndTextDiv>
                <Image src={selected ? loadedActiveIcon : loadedInactiveIcon} alt={""} width={isMobile ? 30 : 40} height={isMobile ? 30 : 40} style={{marginRight:"12px"}}/>
                <MintParagraph size={fontSize ? fontSize : "32"} weight={"regular"}>{text}</MintParagraph>
            </ImageAndTextDiv>
        </StyledMultipleChoiceButton>
    )
}

export default MultipleChoiceButton;