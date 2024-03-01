import styled from "@emotion/styled";

export const Austin = 'Austin News Deck';
export const Mint_Light = 'Mint Grotesk Light';
export const Mint_Regular = 'Mint Grotesk';
export const Mint_Medium = 'Mint Grotesk Medium';
export const Mint_Bold = 'Mint Grotesk Bold';

import { Azeret_Mono, Sacramento } from '@next/font/google';

export const azeretMono = Azeret_Mono({
    weight: ['400'],
    style: ['normal'],
    subsets: ['latin'],
});
export const azeretMonoMedium = Azeret_Mono({
    weight: ['500'],
    style: ['normal'],
    subsets: ['latin'],
});

export const SacramentoRegular = Sacramento({
    weight: ['400'],
    style: ['normal'],
    subsets: ['latin'],
});



// todo: mobile
export const H1_Headline = styled.h1`
    margin: 0;
    font-size: 124px;
    line-height: 124px;
    font-family: ${Austin};
    font-weight: 300;
    letter-spacing: -0.05em;
`;

export type HeaderTypographyProps = {
    display: "xxl" | "xl",
}


const H1_Map = {
    "xxl": {
        "size": "96px",
        "height": "100px",
        "spacing": "-0.05em",
    },
    "xl": {
        "size": "80px",
        "height": "84px",
        "spacing": "-0.04em",
    },
}

export const H1 = styled.h1<HeaderTypographyProps>`
    margin: 0;
    font-size: ${props => H1_Map[props.display].size};
    line-height: ${props => H1_Map[props.display].height};
    font-family: ${Austin};
    font-weight: 300;
    letter-spacing: ${props => H1_Map[props.display].spacing};
`;

export const H2 = styled.h2`
    margin: 0;
    font-size: 64px;
    line-height: 100%;
    font-family: ${Austin};
    font-weight: 300;
    letter-spacing: -0.04em;
`;

export const H3 = styled.h3`
    margin: 0;
    font-size: 48px;
    line-height: 100%;
    font-family: ${Austin};
    font-weight: 300;
    letter-spacing: -0.03em;
`;

export const H4 = styled.h4`
    margin: 0;
    font-size: 40px;
    line-height: 105%;
    font-family: ${Austin};
    font-weight: 300;
    letter-spacing: -0.02em;
`;
export const H5 = styled.h5`
    margin: 0;
    font-size: 32px;
    line-height: 115%;
    font-family: ${Austin};
    font-weight: 300;
    letter-spacing: -0.015em;
`;
export const H6 = styled.h6`
    margin: 0;
    font-size: 28px;
    line-height: 125%;
    font-family: ${Austin};
    font-weight: 300;
    letter-spacing: -0.01em;
`;
export type FontSizes = "32" | "24" | "20" | "18" | "16" | "14" | "13" | "12" | "11"

export type MintParagraphTypographyProps = {
    size: FontSizes,
    weight: "bold" | "medium" | "regular" | "light",
}
export type MonoParagraphTypographyProps = {
    weight: "medium" | "regular",
}

const Mint_Paragraph_Size_Map = {
    "32": {
        "size": "32px",
        "height": "100%",
        "spacing": "-0.5px",
    },
    "24": {
        "size": "24px",
        "height": "100%",
        "spacing": "-0.5px",
    },
    "20": {
        "size": "20px",
        "height": "95%",
        "spacing": "-0.01em",
    },
    "18": {
        "size": "18px",
        "height": "125%",
        "spacing": "-0.01em",
    },
    "16": {
        "size": "16px",
        "height": "125%",
        "spacing": "normal",
    },
    "14": {
        "size": "14px",
        "height": "125%",
        "spacing": "normal",
    },
    '13': {
        "size": "13px",
        "height": "125%",
        "spacing": "normal",
    },
    "12": {
        "size": "12px",
        "height": "125%",
        "spacing": "normal",
    },
    "11": {
        "size": "11px",
        "height": "125%",
        "spacing": "normal",
    }

}

const Mint_Paragraph_Font_Map = {
    "bold": {
        "font": Mint_Bold,
        "weight": "600",
    },
    "medium": {
        "font": Mint_Medium,
        "weight": "500",
    },
    "regular": {
        "font": Mint_Regular,
        "weight": "400",
    },
    "light": {
        "font": Mint_Light,
        "weight": "300",
    }
}

export const MintParagraph = styled.p<MintParagraphTypographyProps>`
    margin: 0;
    font-size: ${props => Mint_Paragraph_Size_Map[props.size].size};
    line-height: ${props => Mint_Paragraph_Size_Map[props.size].height};
    font-family: ${props => Mint_Paragraph_Font_Map[props.weight].font};
    font-weight: ${props => Mint_Paragraph_Font_Map[props.weight].weight};
    letter-spacing: ${props => Mint_Paragraph_Size_Map[props.size].spacing};
`;



export const AzeretMonoParagraph = styled.p<MonoParagraphTypographyProps>`
    margin: 0;
    font-size: 16px;
    line-height: 125%;
    font-family: Azaret Mono;
    font-weight: ${props => props.weight};
    letter-spacing: normal;
    ${props => props.weight === "regular" ? azeretMono.style : azeretMonoMedium.style }
`;

