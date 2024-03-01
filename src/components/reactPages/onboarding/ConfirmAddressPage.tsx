import React, { useState } from 'react';
import styled from '@emotion/styled';
import {H2, H4} from '../../Typography/Typography';
import {useRouter} from "next/router";
import { makeAuthedApiRequest } from '../../../utils/api/apiHelper';
import  StyledInputWithSupertext  from '../../boxes/StyledInputWithSupertext';
import OnboardingScreenFrame from '../../stuff/OnboardingScreenFrame';
import { useDevice } from "../../../contexts/DeviceContext";



const StyledStateZipDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    margin-top: 12px;
`

export type BasicAddressData = {
    streetAddress?: string,
    city?: string,
    state?: string,
    zip?: string,
    address2?: string,
    propertyId?: string,
}


const ConfirmAddressPage = (props: { addressdata?: BasicAddressData; }) => {
    const [address, setAddress] = useState(props.addressdata?.streetAddress || '');
    const router = useRouter();
    // todo: add error states
	const [address2, setAddress2] = useState(props.addressdata?.address2 || '');
	const [city, setCity] = useState(props.addressdata?.city || '');
	const [state, setState] = useState(props.addressdata?.state|| '');
	const [zip, setZip] = useState(props.addressdata?.zip || '');
    const prevStep = '/onboarding/property/part-1/search-address?propertyId=' + props.addressdata?.propertyId;
    function updateEnabled(address:string, city:string, state:string, zip:string) {
        setIsRightEnabled((address.length > 5) && (city.length > 0) && (state.length > 0) && (zip.length > 0));
    }
    const [isRightEnabled, setIsRightEnabled] = useState((address.length > 5) && (city.length > 0) && (state.length > 0) && (zip.length > 0));
    const { isMobile } = useDevice();
    const handleNextSubmit = async () => {
        try {
            const data = {
                propertyId: props.addressdata?.propertyId,
                streetAddress: address,
                address2,
                city,
                state,
                zip,
                onboardingStep: '/onboarding/property/part-1/confirm-location',
            }
            await makeAuthedApiRequest({method: 'post', urlExtension: `/v1/property/basicAddressInfo`, data});
            router.push('/onboarding/property/part-1/confirm-location?propertyId=' + props.addressdata?.propertyId);
        } catch (error) {
            console.log(error);
        }
      }
    return (
        <OnboardingScreenFrame prevStep={prevStep} nextOnClick={handleNextSubmit} disabledRight={!isRightEnabled}>
                {isMobile ? <H4 style={{maxWidth:"585px", width:"100%"}}>Confirm your address</H4> 
                : <H2 style={{maxWidth:"585px", width:"100%"}}>Confirm your address</H2>}
                <StyledInputWithSupertext
                    placeholder="Street Address"
                    autoComplete="address-line1"
                    id="mapbox-autofill"
                    label='Street Address'
                    value={address}
                    style={{marginTop: isMobile ? '32px' : "48px"}}
                    onChange={(e) => {
                        setAddress(e.target.value);
                        updateEnabled(e.target.value, city, state, zip)
                    }}
                />
                <StyledInputWithSupertext
                    placeholder="Apartment, suite, unit, building, floor, etc."
                    autoComplete="address-line1"
                    id="mapbox-autofill"
                    label='Street Address 2'
                    value={address2}
                    style={{marginTop: "12px"}}
                    onChange={(e) => {
                        setAddress2(e.target.value);
                    }}
                />
                <StyledInputWithSupertext
                    placeholder="City"
                    autoComplete="address-level2"
                    id="mapbox-autofill"
                    label='City'
                    value={city}
                    style={{marginTop: "12px"}}
                    onChange={(e) => {
                        setCity(e.target.value);
                        updateEnabled(address, e.target.value, state, zip)
                    }}
                />
                <StyledStateZipDiv style={{flexDirection:isMobile ? 'column' : 'row'}}>
                    <StyledInputWithSupertext
                        placeholder="State"
                        autoComplete="address-line1"
                        id="mapbox-autofill"
                        label='State'
                        value={state}
                        onChange={(e) => {
                            setState(e.target.value);
                            updateEnabled(address, city, e.target.value, zip)
                        }}
                    />
                    <div style={{width:"2%", height: '12px'}}></div>
                <StyledInputWithSupertext
                        placeholder="Zip Code"
                        autoComplete="address-line1"
                        id="mapbox-autofill"
                        label='Zip Code'
                        value={zip}
                        onChange={(e) => {
                            setZip(e.target.value);
                            updateEnabled(address, city, state, e.target.value);
                        }}
                    /> 
                </StyledStateZipDiv>
        </OnboardingScreenFrame>

    )
}
export default ConfirmAddressPage;