import React from 'react';
import styled from "@emotion/styled";
import { colors } from "../../../styles/colors";
import { H2, H4, MintParagraph, AzeretMonoParagraph } from "../../Typography/Typography";
import { BasicProperty } from "../../../models/basicProperty";
import Image from 'next/image';


const EventCardContainer = styled.div<{isOfferContext?: boolean}>`
    display: flex;
    align-items: flex-start;
    align-items: center;
    box-sizing: border-box;
`;


const ContentDiv = styled.div<{isOfferContext?: boolean}>`
    display: flex;
    flex-direction: row;
    border-top: 1px solid ${colors.gray200};
    border-right: 1px solid ${colors.gray200};
    border-bottom-right-radius: ${props => props.isOfferContext ? '0' : '16px'};
    border-top-right-radius: 16px;
    border-bottom: ${props => props.isOfferContext ? 'none' : '1px solid ' + colors.gray200};
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;
    height: 148px;
    padding-right: 12px;
    padding-left: 20px;
    box-sizing: border-box;
`;
const ImageContainer = styled.div<{isOfferContext?: boolean}>`
    border-top-left-radius: 16px;
    border-bottom-left-radius: ${props => props.isOfferContext ? '0' : '16px'};
    width: 148px;
    height: 148px;
    overflow: hidden;
    position: relative;
`;

const StyledImage = styled.img`
    position: absolute;
    left: 50%;
    top: 50%;
    height: 100%;
    transform: translate(-50%, -50%);
`;



const PropertyCard = (props: {property: BasicProperty, children?: React.ReactNode, offerContext?: boolean, removeAddressDetail?: boolean, removePropertySummary?: boolean, isMobile?: boolean}) => {
  
  

    return (
        <EventCardContainer isOfferContext={props.offerContext}>
            <ImageContainer isOfferContext={props.offerContext}>
                <StyledImage 
                    src={props.property.coverImage ? props.property.coverImage : '/property_placeholder.png'} 
                    alt={''} 
                />
            </ImageContainer>
            
            <ContentDiv isOfferContext={props.offerContext}>
                    <div style={{display: 'flex', flexDirection: 'column' }}>
                    <MintParagraph size={props.isMobile ? '14' : "18"} weight="medium" style={{color:colors.gray1000, marginBottom: '13px', marginTop: '12px'}}>
                            {props.offerContext && <span style={{color: colors.gray700}}>List Price </span>}{`$${parseFloat(props.property.listPrice.toString()).toLocaleString()}`}
                        </MintParagraph>
                        <MintParagraph size={props.isMobile ? '14' : "18"} weight="medium" style={{color:colors.gray1000}}>{props.property.streetAddress + (props.property?.address2 ? ' ' + props.property.address2 : '')}</MintParagraph>
                        {!props.removeAddressDetail && <>
                        <MintParagraph size="18" weight="medium" style={{color:colors.gray1000, marginBottom: '19px'}}>{props.property.city + ', ' + props.property.state + ' ' + props.property.zip}</MintParagraph>
                        {!props.removePropertySummary && <MintParagraph size='14' weight="medium" style={{color:colors.gray900}}>{`${props.property.bedroomCount} bed • ${props.property.bathroomCount} bath • Built in ${props.property.yearBuilt}`}</MintParagraph>}</>}
                    </div>
                    {props.children}
            </ContentDiv>
        </EventCardContainer>
    );
};

export default PropertyCard;