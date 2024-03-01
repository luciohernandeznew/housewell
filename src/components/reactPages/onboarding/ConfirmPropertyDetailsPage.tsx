import React, { useEffect, useCallback, useState, useRef } from 'react';
import styled from '@emotion/styled';
import {H2, H4, MintParagraph} from '../../Typography/Typography';
import {useRouter} from "next/router";
import { makeAuthedApiRequest } from '../../../utils/api/apiHelper';
import OnboardingScreenFrame from '../../stuff/OnboardingScreenFrame';
import StyledSqFtInputWithSupertextComponent from '../../boxes/StyledSqFtInput';
import { useDevice } from "../../../contexts/DeviceContext";
import {colors} from "../../../styles/colors";
import StyledIncrementDecrementComponent from '../../boxes/StyledIncrementDecrementBox'


const StyledStateZipDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    margin-top: 12px;
`
export type BasicPropertyDetails = {
    bedroomCount?: number,
    bathroomCount?: number,
    squareFeet?: string,
    lotSizeSquareFeet?: string,
    streetAddress: string,
    address2?: string,
    city: string,
    state: string,
    zip: string,
    propertyId: string,
}


const ConfirmPropertyDetailsPage = (props: { locationData: BasicPropertyDetails; }) => {
    const router = useRouter();
    const address2String = props.locationData.address2 ? props.locationData.address2 + ' ' : '';
    const fullAddress = props.locationData.streetAddress + ' ' + address2String + props.locationData.city + ' ' + props.locationData.state + ' ' + props.locationData.zip;
    const [numBedrooms, setNumBedrooms] = useState<number>(props?.locationData?.bedroomCount || 0);
    const [numBathrooms, setNumBathrooms] = useState<number>(props?.locationData?.bathroomCount || 0);
    const [squareFeet, setSquareFeet] = useState<string>(props?.locationData?.squareFeet ? props?.locationData?.squareFeet as string + ' sq ft.' : '');
    const [lotSizeSquareFeet, setLotSizeSquareFeet] = useState<string>(props?.locationData?.lotSizeSquareFeet ? props?.locationData?.lotSizeSquareFeet as string + ' sq ft.' : '');
    const prevStep = '/onboarding/property/part-1/confirm-location?propertyId=' + props.locationData.propertyId;
    const { isMobile } = useDevice();


    const handleNextSubmit = async () => {
        try {
            const data = {
                propertyId: props.locationData.propertyId,
                numBedrooms,
                numBathrooms,
                squareFeet: squareFeet.replace(/\D/g, ''),
                onboardingStep: '/onboarding/property/part-2/property-description',
                lotSizeSquareFeet: lotSizeSquareFeet.replace(/\D/g, ''),
            }
            await makeAuthedApiRequest({method: 'post', urlExtension: `/v1/property/basicPropertyInfo`, data});
            router.push('/dashboard');
        } catch (error) {
            console.log(error);
        }
      }

    return (
        <OnboardingScreenFrame prevStep={prevStep} nextOnClick={handleNextSubmit}>
                {isMobile ?  <H4 style={{maxWidth:"625px", width:"100%", marginBottom:"12px"}}>Enter your property details</H4> :
                 <H2 style={{maxWidth:"625px", width:"100%", marginBottom:"12px"}}>Enter your property details</H2>}
                <MintParagraph style={{maxWidth:"625px", width:"100%", marginBottom: isMobile ? "12px" : "24px", color:colors.gray800}} weight='medium' size={isMobile ? '16' : '20'}>{fullAddress}</MintParagraph>
                <div style={{display:"flex", flexDirection: isMobile ? 'column' : 'row', marginBottom:"16px"}}>
                    <StyledIncrementDecrementComponent
                        initialValue={numBedrooms}
                        increment={1}
                        text={numBedrooms == 1 ? 'bedroom': "bedrooms"}
                        style={{marginTop: "12px"}}
                        onChange={(value) => setNumBedrooms(value)}
                    />
                    <div style={{width:"12px"}}></div>
                    <StyledIncrementDecrementComponent
                        initialValue={numBathrooms}
                        text={numBathrooms == 1 ? 'bathroom': "bathrooms"}
                        increment={.5}
                        style={{marginTop: "12px"}}
                        onChange={(value) => setNumBathrooms(value)}
                    />
                </div>
                <div style={{display:"flex", flexDirection: isMobile ? 'column' : 'row'}}>
                    <StyledSqFtInputWithSupertextComponent
                        placeholder="Size of your home in sq ft."
                        autoComplete="address-line1"
                        label='House Size'
                        value={squareFeet}
                        onChange={(e) => {
                            setSquareFeet(e.target.value);
                        }}
                    />
                    <div style={{width:"12px", height: '12px'}}></div>
                    <StyledSqFtInputWithSupertextComponent
                        placeholder="Size of your lot in sq ft."
                        autoComplete="address-line1"
                        id="mapbox-autofill"
                        label='Lot Size'
                        value={lotSizeSquareFeet}
                        onChange={(e) => {
                            setLotSizeSquareFeet(e.target.value);
                        }}
                    />
                </div>
        </OnboardingScreenFrame>

    )
}
export default ConfirmPropertyDetailsPage;