import React, { useState } from 'react';
import MultipleChoiceParent from '../../stuff/MultipleChoiceParent';
import {H2, H4} from '../../Typography/Typography';
import OnboardingScreenFrame from '../../stuff/OnboardingScreenFrame';
import { useRouter } from 'next/router';
import { makeAuthedApiRequest } from '../../../utils/api/apiHelper';
import { useDevice } from "../../../contexts/DeviceContext";



const IndividualOrBusinessPage = () => {
    const router = useRouter();
    const [selected, setSelected] = useState(-1);
    const [isRightDisabled, setIsRightDisabled] = useState(selected === -1);
    const { isMobile } = useDevice();
    function handleSelection(index: number) {
        setSelected(index);
        setIsRightDisabled(false);
    }
    const handleNextSubmit = async () => {
        try {
            const isConsumer = selected === 0 ? true : false;
            const data = {
                isConsumer,
            }
            await makeAuthedApiRequest({method: 'post', urlExtension: '/v1/user/setUserConsumerBusinessStatus', data});
            router.push(isConsumer ? '/onboarding/user/buy-or-sell' : '/onboarding/user/user-details');
        } catch (error) {
            console.log(error);
        }
      }

    const multipleChoiceInfo = [{
        text: "Buyer or Seller"
    }, 
    {
        text:"Agent"
    }]
    return (
        <OnboardingScreenFrame prevStep='/onboarding/user/individual-or-business' nextOnClick={handleNextSubmit} disabledRight={isRightDisabled}>
                {!isMobile ? <H2 style={{maxWidth:"585px", width:"100%"}}>Are you a buyer/seller or an agent?</H2>
                : <H4>Are you a buyer/seller or an agent?</H4>}
                <MultipleChoiceParent style={{marginTop:"48px"}}choices={multipleChoiceInfo} selectedIndex={selected} onSelection={handleSelection}/>
        </OnboardingScreenFrame>
    )
}
export default IndividualOrBusinessPage;