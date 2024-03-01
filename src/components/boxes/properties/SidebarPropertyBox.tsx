import React, { useState } from "react";
import styled from "@emotion/styled";
import { H6, H5, H4, MintParagraph } from "../../Typography/Typography";
import Image from "next/image";
import { colors } from "../../../styles/colors";
import { baseURL } from "../../../constants";
import { useRouter } from "next/router";


export type MapProperty = {
    id: string;
    hover: boolean;
    imageUrl: string;
    streetAddress: string;
    address2?: string;
    zip?: string;
    city?: string;
    state?: string;
    neighborhood?: string;
    longitude?: number;
    latitude?: number;
    price?: string;
    bedrooms?: number;
    bathrooms?: number;
    squareFeet?: number;
    style?: React.CSSProperties;
    listPrice?: number;
}

const OuterBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
`;
const Footer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content: flex-start;
    width: 100%;
    padding 16px;
    box-sizing: border-box;
`;

const ParentContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 6px;
    box-sizing: border-box;
    &:hover {
        cursor: pointer;
        box-shadow: 0px 0px 10px 1px rgba(0,0,0,0.1);
        border: 1px solid ${colors.orange1000};
        box-sizing: border-box;
    }
`;

const ImageContainer = styled.div`
    width: 100%;
    overflow: hidden;
    position: relative;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    padding-top: calc(3 / 5 * 100%);

    img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    border: 1px solid ${colors.gray200};
    border-top: none;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
    width: 100%;
    box-sizing: border-box;
    padding: 24px;
`;

function PropertyBox ({ id, streetAddress, address2, imageUrl, city, state, zip, price, bedrooms, bathrooms, squareFeet, style, listPrice}: MapProperty) {
    const propertyLink = `/property-listing?propertyId=${id}`;
    const router = useRouter();
    

    return (
            <ParentContainer onClick={() => router.push(propertyLink)}>
                        <ImageContainer>
                          <img src={imageUrl} alt="Example" />
                        </ImageContainer>
                        <TextContainer>
                            <MintParagraph size="20" weight="medium">{`$${parseFloat(listPrice!.toString()).toLocaleString()}`}</MintParagraph>
                            <H6 style={{fontWeight:'500', marginTop: '20px'}}>{streetAddress + (!!address2 ? ' ' + address2 : '')}</H6>
                            <H6 style={{fontWeight:'500', marginTop: '0px'}}>{city + ', ' + state + ' ' + zip}</H6>
                            <MintParagraph size='14' weight="medium" style={{color:colors.gray900, marginTop: '40px'}}>{`${bedrooms} bed • ${bathrooms} bath • ${squareFeet} sqft`}</MintParagraph>

                        </TextContainer>
                      </ParentContainer>
    )
}


export default PropertyBox;
