import styled from "@emotion/styled";
import React from "react";
import Image from "next/image";
import { colors } from "../../styles/colors";

export type SchedulingIconButtonProps = {
    onClick?: (event?: any) => void;
    style?: React.CSSProperties;
    icon: string;
    iconWidth: number;
    iconHeight: number;
}

const Button = styled.button`
    background-color: ${colors.gray100};
    border-radius: 8px;
    height: 60px;
    width: 60px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    &:hover {
        background-color: ${colors.gray200};
    }
`

function SchedulingIconButton({onClick, style, icon, iconWidth, iconHeight, ...props}: SchedulingIconButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <Button onClick={onClick} style={style} {...props}>
            <Image src={icon} width={iconWidth} height={iconHeight} alt="icon"/>
        </Button>
    )
}
export default SchedulingIconButton
