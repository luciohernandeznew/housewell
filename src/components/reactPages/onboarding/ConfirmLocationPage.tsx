import React, { useRef } from 'react';
import styled from '@emotion/styled';
import {H2, H4, MintParagraph} from '../../Typography/Typography';
import {useRouter} from "next/router";
import { makeAuthedApiRequest } from '../../../utils/api/apiHelper';
import OnboardingScreenFrame from '../../stuff/OnboardingScreenFrame';
import dynamic from 'next/dynamic';
import {colors} from "../../../styles/colors";
import { useDevice } from "../../../contexts/DeviceContext";
const ConfirmMinimap = dynamic(
    () => import('../../stuff/ConfirmMinimap'),
    { ssr: false }
);


const StyledStateZipDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    margin-top: 12px;
`
export type BasicLocationData = {
    longitude: number,
    latitude: number,
    propertyId: string,
}


const AddressAutocomplete = (props: { locationData: BasicLocationData; }) => {
    const router = useRouter();
    const { isMobile } = useDevice();
    const feature: GeoJSON.Feature<GeoJSON.Point> = {
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: [props.locationData.longitude, props.locationData.latitude]
        },
        properties: {}
    };
    let longitude = useRef<number>(props.locationData.longitude);
    let latitude = useRef<number>(props.locationData.latitude);
    const prevStep = '/onboarding/property/part-1/confirm-address?propertyId=' + props.locationData.propertyId;
    const handleNextSubmit = async () => {
        try {
            const data = {
                propertyId: props.locationData.propertyId,
                longitude: longitude.current,
                latitude: latitude.current,
                onboardingStep: '/onboarding/property/part-1/property-details',
            }
            await makeAuthedApiRequest({method: 'post', urlExtension: `/v1/property/basicLocationInfo`, data});
            router.push('/onboarding/property/part-1/property-details?propertyId=' + props.locationData.propertyId);
        } catch (error) {
            console.log(error);
        }
      }

    return (
        <OnboardingScreenFrame prevStep={prevStep} nextOnClick={handleNextSubmit}>
                {isMobile ? <H4 style={{maxWidth:"585px", width:"100%", marginBottom:"12px"}}>Is this the right spot?</H4>
                : <H2 style={{maxWidth:"585px", width:"100%", marginBottom:"12px"}}>Is this the right spot?</H2>}
                <MintParagraph style={{maxWidth:"585px", width:"100%", marginBottom:"24px", color:colors.gray800}} weight='medium' size={isMobile ? '18' : '20'}>Adjust the pin for a more precise location</MintParagraph>
                <ConfirmMinimap longitude={longitude} latitude={latitude} show={true} feature={feature} />
        </OnboardingScreenFrame>

    )
}
export default AddressAutocomplete;