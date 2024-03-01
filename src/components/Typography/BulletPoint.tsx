import React, {useRef, useEffect, useState} from "react";
import Image from "next/image";
import {TypographyProps} from "./OldTypography";
import {colors} from "../../styles/oldColors";
import styled, {StyledComponent} from "@emotion/styled";

export type BulletPointProps = {
    light?: boolean,
    centered?: boolean,
    text: string,
    // todo: restrict TextType to only Typography
    TextType?: StyledComponent<any>,
    style?: React.CSSProperties,
    isBold?: boolean,
    passedSVGPath?: string,
}

const StyledText = styled.span`
    font-family: 'Mint Grotesk';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 125%;
`;

const BulletPoint: React.FC<BulletPointProps & TypographyProps> = ({light, centered, isBold: isBold, text, TextType, jakarta, weight, mobile, passedSVGPath, style}: BulletPointProps & TypographyProps) => {
    const ref = useRef<HTMLSpanElement>(null);
    const [mounted, setMounted] = useState(false);

        useEffect(() => {
        setMounted(true);
    }, []);
    let imagePath = passedSVGPath ? passedSVGPath : light ? "/icon_svg/bullet_light.svg" : "/icon_svg/check-circle-2.svg";
    const lh = (mounted && ref.current) ? parseInt(getComputedStyle(ref.current).lineHeight.slice(0, -2) as string) : 36;
    const centeredStyle = centered ? {display: "flex", alignItems: "center"} : {};
    return (
        <div style={{...style, color: light ? colors.background : colors.typographyBlack, display: "flex"}}>
            <div style={{...centeredStyle, margin: `${((lh-24)/2) + "px"} 16px ${((lh-24)/2) + "px"} 0`}}>
                {light ?
                    <Image src={imagePath} alt="bullet-light" width="24" height="24"/>
                    : <Image src={imagePath} alt="bullet" width="24" height="24"/>
                }
            </div>
            {TextType ?
                <TextType ref={ref} style={{margin: 0}} jakarta={jakarta} weight={weight}
                          mobile={mobile}>{text}</TextType>
                :
                <StyledText ref={ref} style={{margin: 0, fontWeight: isBold ? '600' : '400'}}>
                    {text}
                </StyledText>
            }
        </div>
    )
}

export default BulletPoint;