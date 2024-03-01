import React, {ReactNode} from 'react';
import Collapsible from 'react-collapsible';
import styled from "@emotion/styled";
import Image from "next/image";
import {MintParagraph} from "../Typography/Typography";
import {colors} from "../../styles/colors";

const StyledHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 0;
`;

export type AccordionProps = {
    style?: React.CSSProperties,
    mobile?: boolean,
    isTransparent?: boolean,
    removePadding?: boolean,
    items: {header: string, body: ReactNode}[]
    transitionTime?: number,
}

type HeaderProps = {
    text: string,
    mobile?: boolean,
    isOpen?: boolean,
}

const Header = ({ text, mobile, isOpen }: HeaderProps) => {
    return (<div style={{ padding: "0 16px" }}>
        <StyledHeader style={{ borderBottom: isOpen ? `1px solid ${colors.gray200}` : "none" }}>
            <MintParagraph size={"16"} style={{margin: 0}} weight="medium">{text}</MintParagraph>
            <div style={{margin: `0`,
                transform: isOpen ? "rotate(180deg) translateY(2px)" : "rotate(0deg) translateY(2px)",
                transition: "transform 0.5s"}}>
                <Image
                    src="/icon_svg/arrowdown.svg"
                    alt="accordion arrow"
                    width="24"
                    height="24"
                />
            </div>
        </StyledHeader>
    </div>)
}

type BodyProps = {
    body: ReactNode,
    mobile?: boolean,
    removePadding?: boolean,
}

const Body = ({ body, removePadding, mobile }: BodyProps) => {
    return (<div style={{padding: removePadding ? "" : "12px 16px"}}>
        {body}
    </div>)
}

// todo: restrict multiple
const Accordion = ({ style, items, mobile, removePadding, isTransparent, transitionTime }: AccordionProps) => {
    return (
        <div style={{...style, borderRadius: "8px", background: isTransparent ? "" : colors.gray100}}>
            {items.map((item, index) => (<div key={index}>
                <Collapsible
                    transitionTime={transitionTime || 500}
                    trigger={<Header text={item.header} mobile={mobile} isOpen={false}/>}
                    triggerWhenOpen={<Header text={item.header} mobile={mobile} isOpen={true}/>}
                >
                    <Body body={item.body} removePadding={removePadding} mobile={mobile}/>
                </Collapsible>
            </div>))}
        </div>
    );
};

export default Accordion;