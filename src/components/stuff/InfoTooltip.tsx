import React, {useState} from "react";
import Image from "next/image";
import {Popover} from "react-tiny-popover";
import {MintParagraph} from "../Typography/Typography";
import styled from "@emotion/styled";
import {colors} from "../../styles/oldColors";
import {useDevice} from "../../contexts/DeviceContext";

const PopoverContainer = styled.div<{isMobile?: boolean}>`
    display: flex;
    flex-direction: column;
    border: 1px solid ${colors.gray300};
    background: white;
    border-radius: 4px;
    padding: 8px;
    max-width: ${props => props.isMobile ? '40vw' : '20vw'};
`;

export type InfoTooltipProps = {
    text: string
}

const Tooltip: React.FC<InfoTooltipProps> = (props: InfoTooltipProps) => {
    const { isMobile } = useDevice();
    return <PopoverContainer isMobile={isMobile}>
        <MintParagraph size={"16"} weight={"regular"}>{props.text}</MintParagraph>
    </PopoverContainer>
}

export const InfoTooltip: React.FC<InfoTooltipProps> = (props: InfoTooltipProps) => {
    
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);

    return <div style={{ display: "flex", alignItems: "center" }}>
        <Popover
            isOpen={isPopoverOpen}
            positions={['bottom']}
            align={'center'}
            padding={4}
            content={<Tooltip text={props.text} />}
            onClickOutside={() => setIsPopoverOpen(false)}
        >
            <Image
                src="/icon_svg/info.svg"
                alt='info icon'
                width={24}
                height={24}
                style={{ marginLeft: "8px", cursor: "pointer" }}
                onClick={(e) => {
                    e.stopPropagation();
                    setIsPopoverOpen(!isPopoverOpen);
                }}
/>

        </Popover>
    </div>
}

export default InfoTooltip;