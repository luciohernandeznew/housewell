import { GetServerSidePropsContext } from 'next';
import React, {useState} from 'react';
import { makeAuthedApiRequest } from '../../../../../src/utils/api/apiHelper';
import StyledInputWithSuperTextComponent from '../../../../../src/components/boxes/StyledInputWithSupertext';
import OnboardingScreenFrame from '../../../../../src/components/stuff/OnboardingScreenFrame';
import { useRouter } from 'next/router';
import { useDevice } from '../../../../../src/contexts/DeviceContext';
import { H3, MintParagraph } from '../../../../../src/components/Typography/Typography';
import StatusMessage from '../../../../../src/components/stuff/StatusMessage';

export type BasicPropertyDetails = {
    streetAddress: string,
    address2?: string,
    city: string,
    state: string,
    zip: string,
    propertyId: string,
    buyerSideCommission: number,
}


const BuyerCommission = (props: { basicAddressInfo: BasicPropertyDetails}) => {
    const router = useRouter();
    const { isMobile } = useDevice();
    const [buyerSideCommission, setBuyerSideCommission] = useState(props.basicAddressInfo.buyerSideCommission);
    const prevStep = '/onboarding/property/part-3/title-holders?propertyId=' + props.basicAddressInfo.propertyId;
    const nextStep = '/dashboard?isOnboardingComplete=true';
    const handleNextSubmit = async () => {
        try {
            const data = {
                propertyId: props.basicAddressInfo.propertyId,
                buyerSideCommission,
                onboardingStep: '/onboarding/property/part-3/buyer-commission'
            }
            await makeAuthedApiRequest({method: 'post', urlExtension: `/v1/property/buyerSideCommission`, data});
            router.push(nextStep);
        } catch (error) {
            console.log(error);
        }
      }
    
    return (
        <OnboardingScreenFrame nextOnClick={handleNextSubmit} prevStep={prevStep}>
            <H3 style={{marginBottom: '24px'}}>Buyer side commission</H3>
            <StatusMessage style={{ margin: "8px 0 8px 0" }} hasIcon>
                <MintParagraph size={"14"} weight={"medium"}>Your local MLS requires that you offer a commission to buyers agents in order to list on their database. The MLS is how your home gets onto websites like zillow, realtor.com, and others. We don&apos;t think it should be a requirement are are working on changing this, but it is a reality of the real estate industry. Reach out to your advisor if you have questions.</MintParagraph>
            </StatusMessage>
            <StatusMessage style={{ margin: "8px 0 8px 0" }} hasIcon>
                <MintParagraph size={"14"} weight={"medium"}>We recommend between 2%-3% buyers agent commission, but you can go as low as .1%. We recommend this commission because the largest group of buyers still use buyers agents and some agents won&apos;t show homes if the commission is not high enough. Housewell doesn&apos;t take any of this commission. If a buyer doesn&apos;t use an agent you give this money directly to the buyer as a closing credit. This makes your home more appealing to buyers.</MintParagraph>
            </StatusMessage>
            <MintParagraph size='14' weight='regular'>Minimum: .1% — maximum: 4%</MintParagraph>
                <StyledInputWithSuperTextComponent 
                    label='Buyer agent commission as (%) of sales price' 
                    value={`${buyerSideCommission}`}
                    onChange={(event) => {
                        event.stopPropagation();
                        let inputValue = event.target.value;
                    
                        // Check if the input value starts with '.' and prepend '0'
                        if (inputValue.startsWith('.')) {
                            inputValue = '0' + inputValue;
                        }
                    
                        let sanitizedValue = parseFloat(inputValue);
                    
                        // Ensure value is within bounds
                        if (isNaN(sanitizedValue) || sanitizedValue < 0) sanitizedValue = 0;
                        else if (sanitizedValue > 4.0) sanitizedValue = 4.0;
                    
                        setBuyerSideCommission(sanitizedValue);
                    }}
                    style={{marginTop: '12px'}}
                    inputStyle={{ width: isMobile ? '93%' : "97%" }}
                    step={0.10}
                    type="number"
                />
        </OnboardingScreenFrame>
    )
}
export async function getServerSideProps(context: GetServerSidePropsContext) {
    try {
        const { req, res, query } = context;
        const propertyId = query.propertyId;
        if (!propertyId) {
            return { props: {} };
        }
        const data = { propertyId };
        const response = await makeAuthedApiRequest({method: 'get', data, urlExtension: '/v1/property/basicAddressInfo', isServer: true, req, res});
        const basicAddressInfo = await response?.data;
        basicAddressInfo.property.propertyId = propertyId;
        return { props: { basicAddressInfo: basicAddressInfo.property } };
    } catch (error) {
        console.log("ERROR", error);
        return { props: { basicAddressData: false } }
    }

    
}

export default BuyerCommission;