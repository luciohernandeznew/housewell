import React, { useEffect, useState } from 'react';
import MultipleChoiceParent from '../../stuff/MultipleChoiceParent';
import OnboardingScreenFrame from '../../stuff/OnboardingScreenFrame';
import {H2, H4} from '../../Typography/Typography';
import { useRouter } from 'next/router';
import { makeAuthedApiRequest } from '../../../utils/api/apiHelper';
import { useDevice } from "../../../contexts/DeviceContext";


// todo: pass props, handle back button
const BuyOrSell = () => {
    const [selected, setSelected] = useState(-1);
    const [isRightDisabled, setIsRightDisabled] = useState(selected === -1);
    const { isMobile } = useDevice();
    function handleSelection(index: number) {
        setSelected(index);
        setIsRightDisabled(false);
    }
    const router = useRouter();
    const handleNextSubmit = async () => {
        try {
            const isSeller = selected === 0 ? true : false;
            const data = {
                isSeller,
            }
            await makeAuthedApiRequest({method: 'post', urlExtension: '/v1/user/setUserBuySellStatus', data});
            router.push('/onboarding/user/user-details');
        } catch (error) {
            console.log(error);
        }
      }

    const multipleChoiceInfo = [{
        text: "Sell a home"
    }, 
    {
        text:"Buy a home"
    }]
    return (
        <OnboardingScreenFrame prevStep='/onboarding/user/individual-or-business' nextOnClick={handleNextSubmit} disabledRight={isRightDisabled}>
                {!isMobile ? <H2 style={{maxWidth:"585px", width:"100%"}}>Are you looking to sell or buy a home?</H2>
                : <H4>Are you looking to sell or buy a home?</H4>}
                <MultipleChoiceParent style={{marginTop:"48px"}} buttonHeight='' choices={multipleChoiceInfo} selectedIndex={selected} onSelection={handleSelection}/>
        </OnboardingScreenFrame>
    )
}
export default BuyOrSell;