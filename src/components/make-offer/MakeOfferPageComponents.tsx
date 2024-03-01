import {MintParagraph} from "../Typography/Typography";
import {colors} from "../../styles/colors";
import React from "react";
import styled from "@emotion/styled";
import InfoTooltip from "../stuff/InfoTooltip";

export const MOPSubcontainer = styled.div`
    border-top:  1px solid ${colors.gray200};
`;

export const MOPSubheader = (props: {title: string, info?: string, margin?: string}) => {
    return <div style={{ display: "flex", alignItems: "center", margin: props.margin || `20px 0 ${props.info ? '8px' : '10px'} 0` }}>
        <MintParagraph size={"16"} weight={"medium"}>{props.title}</MintParagraph>
        {props.info && <InfoTooltip text={props.info} />}
    </div>
}

export const MOPHeader = (props: {title: string, style?: React.CSSProperties}) => {
    return <MintParagraph size={"24"} weight={"medium"} style={props.style ? props.style : { margin: "30px 0 36px 0" }}>{props.title}</MintParagraph>
}

export const TextCardBody = (props: { text: string, subtext: string }) => {
    return <>
        <MintParagraph size={"24"} weight={"medium"}
                       style={{color: colors.gray1000, marginTop: "24px"}}>{props.text}</MintParagraph>
        {props.subtext && <MintParagraph size={"16"} weight={"medium"}
                                         style={{color: colors.gray800, marginTop: "12px"}}>{props.subtext}</MintParagraph>}
    </>
}

export const TitleBodyCard = (props: { title: string, subtitle: string, body: string, topMargin?: string }) => {
    return <>
        <MintParagraph size={"24"} weight={"medium"}
                       style={{color: colors.gray1000, marginTop: props.topMargin }}>{props.title}</MintParagraph>
        <MintParagraph size={"16"} weight={"medium"}
                       style={{color: colors.gray800, marginTop: "4px"}}>{props.subtitle}</MintParagraph>
        <MintParagraph size={"16"} weight={"medium"}
                       style={{color: colors.gray800, marginTop: "12px"}}>{props.body}</MintParagraph>
    </>
}