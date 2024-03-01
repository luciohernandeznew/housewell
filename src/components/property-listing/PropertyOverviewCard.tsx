import React from 'react';
import {PropertyModel} from "../../slices/properties";
import styled from "@emotion/styled";
import { MintParagraph } from '../Typography/Typography';
import { colors } from "../../styles/colors";


const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px;
    
    border: 1px solid #334F38;
    border-radius: 8px;
    
    & > h3 {
        margin: 0;
    }
`;

const SectionDivider = styled.div`
    width: 100%;
    height: 1px;
    margin: 14px 0;
    background-color: rgba(0, 0, 0, 0.07);
`;

const VerticalDivider = styled.div`
    width: 1px;
    height: 1.5em;
    background-color: rgba(0, 0, 0, 0.07);
`;

export type PropertyOverviewCardProps = {
    property: PropertyModel,
    style?: React.CSSProperties;
}

const PropertyOverviewCard = (props: PropertyOverviewCardProps) => {
    const { property } = props;
    return <Container style={props.style}>
        <MintParagraph size='18' style={{color:colors.gray1000}} weight='medium'>{property.streetAddress}</MintParagraph>
        <MintParagraph size='18' style={{color:colors.gray1000}} weight='medium'>{property.city}, {property.state} {property.zip}</MintParagraph>

        <SectionDivider />

        <MintParagraph size='24' style={{color:colors.gray1000, margin: "16px 0"}} weight='medium'>${parseInt(property?.listPrice?.toString() || '0', 10).toLocaleString('en-US')}</MintParagraph>

        <SectionDivider />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <MintParagraph size='14' style={{color:colors.gray1000}} weight='medium'>{property.bedroomCount} bed</MintParagraph>
            <VerticalDivider />
            <MintParagraph size='14' style={{color:colors.gray1000}} weight='medium'>{property.bathroomCount} bath</MintParagraph>
            <VerticalDivider />
            <MintParagraph size='14' style={{color:colors.gray1000}} weight='medium'>{property.squareFeet?.toLocaleString('en-US', { maximumFractionDigits: 0 })} sqft</MintParagraph>
            <VerticalDivider />
            <MintParagraph size='14' style={{color:colors.gray1000}} weight='medium'>{property.lotSizeAcres} acres</MintParagraph>
        </div>
    </Container>
}

export default PropertyOverviewCard;