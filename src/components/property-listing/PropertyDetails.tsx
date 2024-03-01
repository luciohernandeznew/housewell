import React, {useState} from 'react';
import {PropertyModel} from "../../slices/properties";
import styled from "@emotion/styled";
import { H3, H5, MintParagraph } from "../Typography/Typography";
import { colors } from "../../styles/colors";
import FullScreenImageViewer from '../stuff/FullScreenImageViewer';

const SectionDivider = styled.div`
    width: 100%;
    height: 1px;
    background-color: rgba(0, 0, 0, 0.07);
`;

const Bubble = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 16px;
    margin-bottom: 16px;
    
    width: 100%;
    
    background: rgba(31, 49, 33, 0.04);
    border: 1px solid #1B311C;
    box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.08);
    border-radius: 8px;
`;

export type PropertyDetailsProps = {
    property: PropertyModel,
    style?: React.CSSProperties;
}



const PropertyDetails = (props: PropertyDetailsProps) => {

    const property = props.property;

    return <div style={props.style}>
        <MintParagraph size='32' weight='medium' style={{marginTop:"12px"}}>Overview</MintParagraph>
        <div style={{ display: "flex" }}>
            <div style={{ flex: 1, flexBasis: "50%" }}>
                <ul>
                    <li><MintParagraph size='14' style={{color:colors.gray1000}} weight='regular'>{property.propertyType}</MintParagraph></li>
                    <li><MintParagraph size='14' style={{color:colors.gray1000}} weight='regular'>Built in {property.yearBuilt}</MintParagraph></li>

                </ul>
            </div>
            <div style={{ flex: 1, flexBasis: "50%" }}>
                <ul>
                    <li><MintParagraph size='14' style={{color:colors.gray1000}} weight='regular'>{property.garageParkingSpaceCount && property.garageParkingSpaceCount > 0 ? `${property.garageParkingSpaceCount} Garage Spaces` : "No Garage"}</MintParagraph></li>
                    <li><MintParagraph size='14' style={{color:colors.gray1000}} weight='regular'>{property.squareFeet} sqft</MintParagraph></li>
                </ul>
            </div>
        </div>
        <SectionDivider style={{ marginBottom: "16px" }} />
        <MintParagraph size='24' style={{color:colors.gray1000}} weight='medium'>About</MintParagraph>
        <MintParagraph style={{marginTop:"24px"}}size='16' weight='regular'>
            {property.marketingDescription
            }
        </MintParagraph>

        <SectionDivider style={{marginTop:"24px",marginBottom: "24px" }} />

        <MintParagraph size='32' weight='medium' style={{marginBottom:"24px"}}>Facts & Features</MintParagraph>
        <MintParagraph size='24' style={{color:colors.gray1000}} weight='medium'>Tax Information</MintParagraph>
        <SectionDivider style={{ marginBottom: "16px" }} />
        <div style={{ display: "flex" }}>
            <div style={{ flex: 1, flexBasis: "50%" }}>
                <ul>
                    <li><MintParagraph size='14' style={{color:colors.gray1000}} weight='regular'>Assessment Year: {property.assessmentYear}</MintParagraph></li>
                </ul>
            </div>
            <div style={{ flex: 1, flexBasis: "50%" }}>
                <ul>
                    <li><MintParagraph size='14' style={{color:colors.gray1000}} weight='regular'>Total Assessed Value: ${parseInt(property?.totalAssessedValue?.toString() || '0', 10).toLocaleString('en-US')}</MintParagraph></li>
                    <li><MintParagraph size='14' style={{color:colors.gray1000}} weight='regular'>Tax Amount: ${parseInt(property?.taxAmount?.toString() || '0', 10).toLocaleString('en-US')}</MintParagraph></li>
                </ul>
            </div>
        </div>

        <MintParagraph size='24'  style={{color:colors.gray1000}} weight='medium'>House Details</MintParagraph>
        <SectionDivider style={{}} />
        <div style={{ display: "flex" }}>
            <div style={{ flex: 1, flexBasis: "50%" }}>
                <ul>
                    <li><MintParagraph size='14' style={{color:colors.gray1000}} weight='regular'>Bedrooms: {property.bedroomCount}</MintParagraph></li>
                    <li><MintParagraph size='14' style={{color:colors.gray1000}} weight='regular'>Bathrooms: {property.bathroomCount}</MintParagraph></li>
                    <li><MintParagraph size='14' style={{color:colors.gray1000}} weight='regular'>School District: {property.schoolDistrict}</MintParagraph></li>
                </ul>
            </div>
            <div style={{ flex: 1, flexBasis: "50%" }}>
                <ul>
                    <li><MintParagraph size='14' style={{color:colors.gray1000}} weight='regular'>HOA Type: {property.homeOwnerAssociationType}</MintParagraph></li>
                    <li><MintParagraph size='14' style={{color:colors.gray1000}} weight='regular'>HOA Fee: ${parseInt(property?.homeOwnerAssociationFee?.toString() || '0', 10).toLocaleString('en-US')}</MintParagraph></li>
                    <li><MintParagraph size='14' style={{color:colors.gray1000}} weight='regular'>HOA Fee Frequency: {property.homeOwnerAssociationFeeFrequency}</MintParagraph></li>
                </ul>
            </div>
        </div>

        <SectionDivider style={{ marginBottom: "24px" }} />

        <div>
        <MintParagraph size='32' style={{color:colors.gray1000, marginBottom: "24px"}} weight='medium'>Estimated House Value</MintParagraph>
            <Bubble>
                <MintParagraph size='24' style={{color:colors.gray1000}} weight='regular'>Estimated price: <b>${parseInt(property?.estimatedValue?.toString() || '0', 10).toLocaleString('en-US')}</b></MintParagraph>
            </Bubble>
            <Bubble>
            <MintParagraph size='24' style={{color:colors.gray1000}} weight='regular'>Estimated range: <b>${parseInt(property?.priceRangeMin?.toString() || '0', 10).toLocaleString('en-US')} - ${parseInt(property?.priceRangeMax?.toString() || '0', 10).toLocaleString('en-US')}</b></MintParagraph>
            </Bubble>
        </div>

    </div>
}

export default PropertyDetails;