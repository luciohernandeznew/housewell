import React from "react";
import styled from "@emotion/styled";
import {colors} from "../../styles/colors";
import Image from "next/image";

export type StatusMessageProps = {
    children: React.ReactNode,
    style?: React.CSSProperties,
    hasIcon?: boolean,
    secondary?: boolean
}

const Container = styled.div<{secondary?: boolean}>`
    padding: 10px;
    background: ${props => !props.secondary ? colors.brightgreen200 : colors.gray100};
    color: ${props => !props.secondary ? colors.darkgreen1000 : colors.gray900};
    display: flex;
    align-items: center;
    border-radius: 8px;
`;

const DarkGreenContainer = styled.div`
    padding: 10px;
    background: ${colors.darkgreen1000};
    color: ${colors.brightgreen200};
    display: flex;
    align-items: top;
    border-radius: 8px;
`;

export const DarkStatusMessage: React.FC<StatusMessageProps> = (props: StatusMessageProps) => {
    return <DarkGreenContainer style={props.style}>
        {props.hasIcon && <Image src="/icon_svg/info_light_green.svg" alt='info icon' width={24} height={24} style={{ marginRight: "12px" }} />}
        {props.children}
    </DarkGreenContainer>
}

const StatusMessage: React.FC<StatusMessageProps> = (props: StatusMessageProps) => {
    return <Container style={props.style} secondary={props.secondary}>
        {props.hasIcon && <Image src="/icon_svg/info_green.svg" alt='info icon' width={24} height={24} style={{ marginRight: "12px" }} />}
        {props.children}
    </Container>
}

export default StatusMessage;