import React from "react";
import styled from "@emotion/styled";
import {colors} from "../../styles/colors";
import { MintParagraph, FontSizes } from "../Typography/Typography";
import Image from "next/image";
import numeral from "numeral";


// todo: abstract shared props for all buttons
export type DiffAndIconProps = {
    offerPrice: number;
    listingPrice: number;
}
function DiffAndIcon({offerPrice, listingPrice}: DiffAndIconProps) {
    const diff = (offerPrice) - (listingPrice);
    const absoluteDiff = Math.abs(diff);
    const formattedDiff = numeral(absoluteDiff).format('0a');
    let formattedDiffText = '';
    let diffIcon = '';
    if (diff > 0) {
        formattedDiffText = `$${formattedDiff} over asking`;
        diffIcon = '/icon_svg/offers-screen/up-arrow.svg';
    } else if (diff < 0) {
        formattedDiffText = `$${formattedDiff} under asking`;
        diffIcon = '/icon_svg/offers-screen/down-arrow.svg';
    } else {
        formattedDiffText = 'Full Price';
        diffIcon = '/icon_svg/offers-screen/equal.svg';
    }
    return (
        <div style={{display:'flex', alignItems:'flex-start'}}>
            <Image src={diffIcon} width={20} height={20} alt='icon'></Image>
            <MintParagraph style={{marginLeft:'8px', color: diff < 0 ? colors.orange1000 : '#219653', whiteSpace: 'nowrap'}} size="14" weight="medium">{formattedDiffText}</MintParagraph>
        </div>
    )
}

export default DiffAndIcon;