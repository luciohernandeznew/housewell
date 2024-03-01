import React, { useEffect, useCallback, useState, useRef } from 'react';
import styled from '@emotion/styled';
import {H2, MintParagraph} from '../../Typography/Typography';
import {useRouter} from "next/router";
import { makeAuthedApiRequest } from '../../../utils/api/apiHelper';
import OnboardingScreenFrame from '../../stuff/OnboardingScreenFrame';
import StatusMessage from '../../stuff/StatusMessage';
import {colors} from "../../../styles/colors";
import StyledInputWithSupertext, {cleanNumericValue} from '../../boxes/StyledInputWithSupertext';

export type BasicPropertyDetails = {
    streetAddress: string,
    address2?: string,
    city: string,
    state: string,
    zip: string,
    priceRangeMax?: string,
    priceRangeMin?: string,
    propertyId: string,
}



const PricingDetailsPage = (props: { locationData: BasicPropertyDetails; }) => {
    const router = useRouter();

    const address2String = props.locationData.address2 ? props.locationData.address2 + ' ' : '';
    const fullAddress = props.locationData.streetAddress + ' ' + address2String + props.locationData.city + ' ' + props.locationData.state + ' ' + props.locationData.zip;
    const [askingPrice, setAskingPrice] = useState<string>('');
    let estimatedSellingRange: string;

    if(props.locationData.priceRangeMin && props.locationData.priceRangeMax){
        estimatedSellingRange = `Estimated selling range: $${parseFloat(props.locationData.priceRangeMin).toLocaleString('en-US', { maximumFractionDigits: 0 })} - $${parseFloat(props.locationData.priceRangeMax).toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
    } else {
        estimatedSellingRange = 'Estimated selling price: unknown';
    }
    const prevStep = '/onboarding/property/part-2/property-description?propertyId=' + props.locationData.propertyId;
    const handleNextSubmit = async () => {
        try {

            const cleanedAskingPrice = cleanNumericValue(askingPrice);
            const data = {
                propertyId: props.locationData.propertyId,
                listPrice: cleanedAskingPrice,
                onboardingStep: '/onboarding/property/part-3/title-holders'
            }
            await makeAuthedApiRequest({method: 'post', urlExtension: `/v1/property/listPrice`, data});
            router.push('/dashboard');
        } catch (error) {
            console.log(error);
        }
      }
    const handleAskingPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAskingPrice(e.target.value);
    }
    

    return (
        <OnboardingScreenFrame prevStep={prevStep} nextOnClick={handleNextSubmit}>
                <H2 style={{maxWidth:"625px", width:"100%", marginBottom:"16px"}}>Your asking price</H2>
                <MintParagraph 
                    style={{maxWidth:"625px", width:"100%", marginBottom:"12px", color:colors.gray800}}
                    weight='medium' size='20'
                >
                    {fullAddress}
                </MintParagraph>
                <MintParagraph 
                    style={{maxWidth:"625px", width:"100%", marginBottom:"4px", color:colors.gray800}}
                    weight='medium' size='20'
                >
                    {estimatedSellingRange}
                </MintParagraph>
                <StatusMessage style={{ margin: "8px 0 8px 0" }} hasIcon>
                <MintParagraph 
                    style={{maxWidth:"725px", width:"100%", color:colors.gray1000}}
                    weight='medium' size='14'
                >
                    Pricing can be changed later. Please reach out to your Housewell advisor if you have any questions or concerns about pricing.
                </MintParagraph>
                </StatusMessage>
                <StyledInputWithSupertext label='Asking price in $' placeholder='Choose your price' onChange={(e) => {handleAskingPriceChange(e);}}  value={askingPrice} moneyFormat></StyledInputWithSupertext>
        </OnboardingScreenFrame>

    )
}
export default PricingDetailsPage;