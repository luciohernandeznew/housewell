import React, { useEffect, useState } from 'react';

import { H2, H4 } from '../../src/components/Typography/Typography';
import { makeAuthedApiRequest } from '../../src/utils/api/apiHelper';
import { useDevice } from '../../src/contexts/DeviceContext';
import StyledInput from '../../src/components/boxes/StyledInput';
import styled from '@emotion/styled';
import SecondaryButton from '../../src/components/buttons/SecondaryButton';

const StyledContentDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content: flex-start;
    width: 100%;
    position: relative;
    box-sizing: border-box;
    padding-left: 24px;
    padding-right: 24px;
`;

const OptOut = () => {
    const [selected, setSelected] = useState(-1);
    const [isRightDisabled, setIsRightDisabled] = useState(selected === -1);
    const { isMobile } = useDevice();
    const [email, setEmail] = useState('');
    const handleNextSubmit = async () => {
        try {
            const isSeller = selected === 0 ? true : false;
            const data = {
                isSeller,
            }
            await makeAuthedApiRequest({method: 'post', urlExtension: '/v1/user/setUserBuySellStatus', data});
        } catch (error) {
            console.log(error);
        }
      }

    return (
        <StyledContentDiv style={{maxWidth: "768px" }}>
            <div style={{height:"50px"}}></div>

                {!isMobile ? <H2 style={{maxWidth:"585px", width:"100%"}}>Enter your email here to opt out of data collection.</H2>
                : <H4>Enter your email here to opt out of data collection.</H4>}
                    <StyledInput
                        style={{width:"100%"}}
                        placeholder="Email"
                        autoComplete="email"
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                        value={email}
                    />
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <div></div>
                    <SecondaryButton size='medium' text='Submit' onClick={handleNextSubmit}></SecondaryButton>
                </div>
                
        </StyledContentDiv>
    )
}
export default OptOut;