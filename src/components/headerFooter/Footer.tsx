import React from "react";
import styled from "@emotion/styled";
import Link from "next/link";
import TextButton from "../buttons/TextButton";
import Image from "next/image";
import { opacify } from "polished";
import {allerta_Stencil} from "../../styles/oldFonts";
import {colors} from "../../styles/oldColors";
import {H5, H6, P2, P3, P4} from "../Typography/OldTypography";
import useWindowSize, {isLarge, ResponsiveProps} from "../../utils/windowSizing/useWindowSize";
import { useRouter } from 'next/router'

const Container = styled.div`
    border-top: 1px solid ${opacify(-0.5, colors.typographyBlack)};
`;

const FooterNav = styled.div<ResponsiveProps>`
    display: flex;
    justify-content: space-between;
    padding: ${props => isLarge(props.width) ? "40px 20% 40px 20%" : "24px 16px 24px 16px"};
    
    flex-direction: ${props => isLarge(props.width) ? "row" : "column"};
`;

const IconBox = styled(Link)`
    display: flex;
    align-items: center;
    justify-content: space-between;
    align-self: center;
    width: 148px;
    height: 48px;
    text-decoration: none;
    color: ${colors.typographyBlack};
    font-size: 32.19px;
    
    & > span {
        margin-top: 12px;
    }
`

const LinkContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const Block = styled.div<ResponsiveProps>`
    display: flex;
    flex-direction: ${props => isLarge(props.width) ? "row" : "column-reverse"};
    text-align: ${props => isLarge(props.width) ? "left" : "center"};
    background-color: ${opacify(-0.5, colors.pastel50)};
    color: ${colors.typographyBlack};
    
    padding: ${props => isLarge(props.width) ? "48px 20% 32px 20%" : "24px 16px 24px 16px"};
`;

const EndContainer = styled.div<ResponsiveProps>`
    color: ${colors.typographyBlack};
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: ${props => isLarge(props.width) ? "72px" : "50px"};
    
    padding: ${props => isLarge(props.width) ? "0px 20% 0px 20%" : "0px 16px 0px 16px"};
`;

/* todo: remove "REAL ESTATE" and other placeholders */
const Footer: React.FC = () => {
    const { height, width } = useWindowSize();
    const router = useRouter()
    const { pathname } = router
    if(pathname.startsWith('/onboarding')) {
        return null;
    }
    return (
        <Container>
            <FooterNav width={width}>
                <IconBox href="/">
                    <Image src="/MainIcon.svg" alt="me" width="46" height="48"/>
                    <span className={allerta_Stencil.className}>Seleri</span>
                </IconBox>

                <LinkContainer style={{paddingTop: isLarge(width) ? "0" : "24px"}}>
                    <Link href="/sell">
                        <TextButton style={{paddingRight: isLarge(width) ? "120px" : ""}} text={"Sell"}/>
                    </Link>
                    <Link href="/buy">
                        <TextButton style={{paddingRight: isLarge(width) ? "120px" : ""}} text={"Buy"}/>
                    </Link>
                    <Link href="/how-it-works">
                        <TextButton style={{paddingRight: isLarge(width) ? "120px" : ""}} text={"Agents"}/>
                    </Link>
                    <Link href="/faq">
                        <TextButton text={"FAQ"}/>
                    </Link>
                </LinkContainer>
            </FooterNav>

            {/* todo: mobile font changes */}
            <Block width={width}>
                <div style={{flexShrink: isLarge(width) ? "2" : "1", marginRight: isLarge(width) ? "128px" : "0"}}>
                    <H5 weight="medium" style={{margin: 0, padding: isLarge(width) ? "0 0 24px 0" : "36px 0 16px 0"}}>About Us</H5>
                    <P3 jakarta weight="light" style={{paddingBottom: isLarge(width) ? "24px" : "16px"}}>The REAL ESTATE, a real estate agency led by Christopher Bibby, utilizes years of experience and success in Toronto to deliver unparalleled real estate services.</P3>
                    <P4 jakarta>*Data obtained from the Toronto Real Estate Board for condominium units sold in all Central Districts (C01-C15) combined for the calendar years of 2012-2019 and does not include rentals, commercial or any other non mls sale |</P4>
                </div>
                <div style={{flexShrink: "1"}}>
                    <H5 weight="medium" style={{margin: 0, paddingBottom: isLarge(width) ? "24px" : "16px"}}>Get In Touch</H5>
                    <div style={{display: "flex", flexDirection: isLarge(width) ? "row" : "column", justifyContent: "space-between", paddingBottom: "24px"}}>
                        <div>
                            <P2 weight="medium" style={{paddingBottom: "8px"}}>Office</P2>
                            <P3 weight="light" jakarta>678.602.9511</P3>
                        </div>
                        <div>
                            <P2 weight="medium" style={{paddingBottom: "8px", paddingTop: isLarge(width) ? 0 : "24px"}}>Direct</P2>
                            <P3 weight="light" jakarta>678.602.9511</P3>
                        </div>
                        <div>
                            <P2 weight="medium" style={{paddingBottom: "8px", paddingTop: isLarge(width) ? 0 : "24px"}}>Email</P2>
                            <P3 weight="light" jakarta>parker@homeli.one</P3>
                        </div>
                    </div>
                    <div>
                        <P2 weight="medium" style={{paddingBottom: "8px"}}>Address</P2>
                        <P3 weight="light" jakarta>Christopher Bibby, Broker c/o RE/MAX Hallmark Bibby Group Realty, Brokerage 170 Merton Street Toronto, Ontario M4S 1A1</P3>
                    </div>
                </div>
            </Block>

            <EndContainer width={width}>
                {isLarge(width) ? <P3 jakarta>© REALESTATE</P3> : <H6 jakarta mobile>© REALESTATE</H6>}
                <div style={{display: "flex"}}>
                    <Link href="/privacy-policy">
                        {isLarge(width) ? <P3 style={{paddingRight: "8px", borderRight: `1px solid ${opacify(-0.8, colors.gray400)}`}} jakarta>Privacy Policy</P3>
                            : <H6 style={{paddingRight: "8px", borderRight: `1px solid ${opacify(-0.8, colors.gray400)}`}} jakarta mobile>Privacy Policy</H6>}
                    </Link>
                    <Link href="/tos">
                        {isLarge(width) ? <P3 style={{paddingLeft: "8px"}} jakarta>Terms of Use</P3> :
                            <H6 style={{paddingLeft: "8px"}} jakarta mobile>Terms of Use</H6>}
                    </Link>
                </div>
            </EndContainer>
        </Container>
    )
}

export default Footer;