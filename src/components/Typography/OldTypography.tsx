import styled from "@emotion/styled";
import {
    jakartaBold,
    jakartaSemibold,
    jakartaLight,
    jakartaMedium,
    jakartaRegular,
    maitreeBold,
    maitreeLight,
    maitreeMedium,
    maitreeRegular
} from "../../styles/oldFonts";

export type TypographyProps = {
    weight?: "bold" | "semibold" | "medium" | "light",
    jakarta?: boolean,
    mobile?: boolean
}

const Austin = 'Austin News Deck';
const Mint = 'Mint Grotesk Light'

const maitreeFontMap = {bold: maitreeBold.style, semibold: null, medium: maitreeMedium.style, regular: maitreeRegular.style, light: maitreeLight.style}
const jakartaFontMap = {bold: jakartaBold.style, semibold: jakartaSemibold.style, medium: jakartaMedium.style, regular: jakartaRegular.style, light: jakartaLight.style}

// sorry for this cursed piece of code lol -nichole
function resolveTypographyProps(props: TypographyProps) {
    return props.jakarta ?
        props.weight ?
            jakartaFontMap[props.weight]
            : jakartaFontMap.regular
        : props.weight ?
            maitreeFontMap[props.weight]
            : maitreeFontMap.regular
}

// todo: mobile
export const H1 = styled.h1<TypographyProps>`
    margin: 0;
    font-size: ${props => props.mobile ? "48px" : "80px"};
    line-height: ${props => props.mobile ? "48px" : "74px"};
    font-family: ${Austin};
    font-weight: 300;
    letter-spacing: -0.05em;

`;

export const H2 = styled.h2<TypographyProps>`
    margin: 0;
    font-size: ${props => props.mobile ? "48px" : "64px"};
    line-height:  ${props => props.mobile ? "48px" : "57.6px"};
    font-family: ${Austin};
    font-weight: 300;
    letter-spacing: -0.04em;
`;

export const H3 = styled.h3<TypographyProps>`
    margin: 0;
    font-size: 48px;
    line-height: 100%;
    font-family: ${Austin};
    font-weight: 300;
    letter-spacing: -0.05em;
`;

export const H4 = styled.h4<TypographyProps>`
    margin: 0;
    font-size: ${props => props.jakarta ? (props.mobile ? "18px" : "32px") : (props.mobile ? "32px" : "40px")};
    line-height: ${props => props.jakarta ? (props.mobile ? "32px" : "40px") : (props.mobile ? "40px" : "48px")};
    
    ${props => resolveTypographyProps(props)}
`;

export const H5 = styled.h5<TypographyProps>`
    margin: 0;
    font-size: ${props => props.mobile ? "20px" : "28px"};
    line-height: ${props => props.mobile ? "26px" :  "28.8px"};
    font-family: ${Mint};
    letter-spacing: -0.01em;
`;

export const H6 = styled.h6<TypographyProps>`
    margin: 0;
    font-weight: 500;
    font-size: ${props => props.mobile ? "18px" : "24px"};
    line-height: ${props => props.mobile ? "22.5px" :  "or 34px"};
    font-family: ${Mint};
    letter-spacing: -0.01em;
`;

export const P1 = styled.p<TypographyProps>`
    margin: 0;
    font-size: ${props => props.jakarta ? "20px" : "24px"};
    line-height: ${props => props.jakarta ? "32px" : "36px"};
    
    ${props => resolveTypographyProps(props)}
`;

export const P2 = styled.p<TypographyProps>`
    margin: 0;
    font-weight: 500;
    font-size: ${props => props.mobile ? "14px" : "16px"};
    line-height: ${props => props.mobile ? "16px" :  "18px"};
    font-family: ${Mint};
    letter-spacing: -0.01em;
`;

export const P3 = styled.p<TypographyProps>`
    margin: 0;
    font-weight: 500;
    font-size: ${props => props.mobile ? "18px" : "24px"};
    line-height: ${props => props.mobile ? "22.5px" :  "or 34px"};
    font-family: ${Mint};
    color: #000000;
    letter-spacing: -0.01em;
`;

export const P4 = styled.p<TypographyProps>`
    margin: 0;
    font-size: ${props => props.jakarta ? "12px" : "12px"};
    line-height: ${props => props.jakarta ? "18px" : "18px"};
    font-family: ${Mint};
    
    ${props => resolveTypographyProps(props)}
`;