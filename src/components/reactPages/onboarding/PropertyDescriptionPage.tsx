import React, { useEffect, useCallback, useState, useRef } from 'react';
import styled from '@emotion/styled';
import {H3} from '../../Typography/Typography';
import {useRouter} from "next/router";
import { makeAuthedApiRequest } from '../../../utils/api/apiHelper';
import useWebSocket from 'react-use-websocket';
import { v4 as uuidv4 } from 'uuid';
import SecondaryButton from '../../buttons/SecondaryButton';
import OnboardingScreenFrame from '../../stuff/OnboardingScreenFrame';
import ParagraphStyledInputComponent from '../../boxes/ParagraphStyledInput';
import { WS_URL } from '../../../constants';


const StyledStateZipDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    margin-top: 12px;
`
export type BasicPropertyDetails = {
    streetAddress: string,
    address2: string,
    city: string,
    state: string,
    zip: string,
    propertyId: string,
    marketingDescription?: string,
}


const ConfirmPropertyDetailsPage = (props: { locationData: BasicPropertyDetails; }) => {
    const router = useRouter();
    const bottomRef = useRef<HTMLDivElement>(null);
    const [propertyDescription, setPropertyDescription] = useState<string>(props?.locationData?.marketingDescription || '' );
    const [propertyAttributes, setPropertyAttributes] = useState<string>('');
    const [clientId] = useState(uuidv4());
    const prevStep = '/onboarding/property/part-1/property-details?propertyId=' + props.locationData.propertyId;
    const handleNextSubmit = async () => {
        try {
            const data = {
                propertyId: props.locationData.propertyId,
                marketingDescription: propertyDescription,
                onboardingStep: '/onboarding/property/part-2/pricing',
            }
            await makeAuthedApiRequest({method: 'post', urlExtension: `/v1/property/propertyDescription`, data});
            router.push('/onboarding/property/part-2/pricing?propertyId=' + props.locationData.propertyId);
        } catch (error) {
            console.log(error);
        }
    };
    const { sendJsonMessage, lastJsonMessage } = useWebSocket(WS_URL, {
        onOpen: (event) => {
            sendJsonMessage({ type: 'register', clientId });
        },
        shouldReconnect: (closeEvent) => false,
    });
  
  
    useEffect(() => {
        if (lastJsonMessage !== null) {
          const messageObj = lastJsonMessage as { content: string; isEndOfStream?: boolean };

          if (messageObj.isEndOfStream) {
          } else {
            if (messageObj.content === '\n') {return;}
            // Concatenate the token to the last message in the history
            setPropertyDescription((prev: string) => {
                const newDescription = prev + messageObj.content;
                return newDescription;
              });
          }
        }
        
    }, [lastJsonMessage]);
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [propertyDescription]);
  
    const handleGenerateMessage = () => {
        sendJsonMessage({ type: 'message', content: propertyAttributes, clientId });
        setPropertyDescription('');
    };


    return (
        <OnboardingScreenFrame prevStep={prevStep} nextOnClick={handleNextSubmit}>
                <H3 style={{maxWidth:"600px", width:"100%", marginBottom:"24px"}}>Use the power of AI to inspire your property description</H3>
                <ParagraphStyledInputComponent placeholder='Add some of your favorite features about your home here e.g. high ceilings, kitchen hood, proximity to parks, etc.' onChange={ (e) => setPropertyAttributes(e.target.value) } value={propertyAttributes}></ParagraphStyledInputComponent>
                <div style={{width:"100%", marginTop:"24px", display:"flex", alignItems:"center", justifyContent:"center"}}><SecondaryButton size={"medium"} style={{width:"300px"}}text={"Generate AI Description"} disabled={!propertyAttributes} hasArrow onClick={() => handleGenerateMessage()}/></div>
                <ParagraphStyledInputComponent placeholder='Property description...' onChange={ (e) => setPropertyDescription(e.target.value) } value={propertyDescription} style={{marginTop:"24px", marginBottom:'24px'}}></ParagraphStyledInputComponent>
        </OnboardingScreenFrame>

    )
}
export default ConfirmPropertyDetailsPage;