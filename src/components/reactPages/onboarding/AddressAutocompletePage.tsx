import React, { useEffect, useCallback, useState } from 'react';
import {H2} from '../../Typography/Typography';
import {useRouter} from "next/router";
import { makeAuthedApiRequest } from '../../../utils/api/apiHelper';
import  StyledInput  from '../../boxes/StyledInput';
import dynamic from "next/dynamic";
import OnboardingScreenFrame from '../../stuff/OnboardingScreenFrame';
import { mapboxApiKey } from '../../../constants';

const AddressAutofill = dynamic(
    () => import('@mapbox/search-js-react').then(mod => mod.AddressAutofill),
    { ssr: false }
); 

export type SearchAddressProps = {
    streetAddress?: string,
    city?: string,
    state?: string,
    zip?: string,
    latitude?: string,
    longitude?: string,
    county?: string,
    propertyId?: string,
}

const AddressAutocomplete = (props: { addressdata?: SearchAddressProps; }) => {
    const [address, setAddress] = useState(props.addressdata?.streetAddress || '');
    const [isRightEnabled, setIsRightEnabled] = useState(address.length > 5);
    const router = useRouter();
	const [token] = useState(mapboxApiKey);
	const [city, setCity] = useState(props.addressdata?.city || '');
	const [state, setState] = useState(props.addressdata?.state || '');
	const [zip, setZip] = useState(props.addressdata?.zip || '');
	const [latitude, setLatitude] = useState(props.addressdata?.latitude || '');
	const [longitude, setLongitude] = useState(props.addressdata?.longitude || '');
    const [county, setCounty] = useState(props.addressdata?.county || '');
    const handleRetrieve = useCallback(
		(res: any) => {
			const feature = res.features[0];
			setAddress(feature.properties.address_line1);
            setIsRightEnabled(feature.properties.address_line1.length > 5)
			setCity(feature.properties.address_level2);
			setState(feature.properties.address_level1);
            setZip(feature.properties.postcode);
            // mapbox returns coordinates in reverse order
            setLongitude(feature.geometry.coordinates[0]);
            setLatitude(feature.geometry.coordinates[1]);
            setCounty(feature.properties.district);
		},
		[ setAddress, setCity, setState, setZip ]

	);
    function updateEnabled(address:string) {
        setIsRightEnabled(address.length > 5);
    }
    const handleNextSubmit = async () => {
        try {
            const data = {
                streetAddress: address,
                city,
                state,
                zip,
                latitude,
                longitude,
                county,
                propertyId: props.addressdata?.propertyId,
            }
            await makeAuthedApiRequest({method: 'post', urlExtension: `/v1/property/buildPropertyData`, data});
            router.push('/onboarding/property/part-1/confirm-address?propertyId=' + props.addressdata?.propertyId);
        } catch (error) {
            console.log(error);
        }
      }
    return (
        <OnboardingScreenFrame prevStep='/dashboard' nextOnClick={handleNextSubmit} disabledRight={!isRightEnabled}>
                <H2>Enter your address</H2>
                <AddressAutofill accessToken={token} onRetrieve={handleRetrieve}>
                    <StyledInput
                        placeholder="Start typing your address, e.g. 123 Main..."
                        autoComplete="address-line1"
                        id="mapbox-autofill"
                        value={address}
                        style={{marginTop: "24px"}}
                        onChange={(e) => {
                            setAddress(e.target.value);
                            updateEnabled(e.target.value)
                        }}
                    />
				</AddressAutofill>
        </OnboardingScreenFrame>

    )
}
export default AddressAutocomplete;