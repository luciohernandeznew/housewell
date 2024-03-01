import React, { useEffect, useState, useRef} from 'react';
import styled from '@emotion/styled';

import axios from "axios";
import { useRouter } from 'next/router';
import { colors } from '../../src/styles/colors';
import { useDevice } from '../../src/contexts/DeviceContext';
import { baseURL } from '../../src/constants';
import { H2, H4, MintParagraph } from '../../src/components/Typography/Typography';
import StatusMessage from '../../src/components/stuff/StatusMessage';
import StyledInputComponent from '../../src/components/boxes/StyledInput';
import SecondaryButton from '../../src/components/buttons/SecondaryButton';

type StyledLoginSignupProps = {
    isSelected: boolean;
}

const StyledLoginSignUp = styled.div<StyledLoginSignupProps>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    box-sizing: border-box;
    border-bottom: ${props => props.isSelected ? `3px solid ${colors.darkgreen1000}` : 'none'};
    &:hover {
        color: ${colors.darkgreen800};
    }
`;
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




// todo height calc will change because mobile navs will be of diff sizes
const ContentParent = styled.div`
    overflow: auto;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    height: 100%;
    position: relative;
    
`


type SignInProps = {
    isLogin: boolean;
  };

const SignInCreateAccount: React.FC<SignInProps> = ({ isLogin }) => {
    const router = useRouter();
    const [isSuccess, setIsSuccess] = useState(false);
    const [email, setEmail] = useState("");
    const [emailErrorMessage, setEmailErrorMessage] = useState("");
    const formRef = useRef(null);
    const { isMobile } = useDevice();
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmailErrorMessage("");
        setEmail(e.target.value);
        setIsSuccess(false);
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        const data = {
            email,
        }
        if (!formRef.current) {
            return;
        }
        try {
                const loginApiResponse = await axios({
                    url: `${baseURL}/v1/auth/limitData`,
                    method: 'post',
                    data,
                    withCredentials: true,
                });
                if (loginApiResponse.status === 200) {
                    setIsSuccess(true);
                    setEmailErrorMessage("Request sent successfully");
                }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response && error.response.status === 400) {
                    setEmailErrorMessage(error.response.data.error);
                }
            } else {
                console.log(error);
            }
        }
    }
    return (
        <ContentParent>
        <StyledContentDiv style={{maxWidth: "582px", marginBottom: isMobile ? '24px' : '0' }}>
            <div style={{height:"50px"}}></div>
            <H4 style={{width:"100%"}}>Limit the Use of My Sensitive Personal Information</H4>
                <StatusMessage style={{ margin: "8px 0 0px 0" }} hasIcon>
                        <MintParagraph size={"14"} weight={"medium"}>
                            Enter your email below to limit the use of your personal data. Note: this may interfere with your ability to use all features of the Housewell Product
                        </MintParagraph>
                    </StatusMessage>
                <div style={{maxWidth:"592px", display:"flex", flexDirection:"column"}}>
                    <form  ref={formRef} onSubmit={handleSubmit}>
                    <StyledInputComponent isError={!!emailErrorMessage && !isSuccess} name='email' id={`1`} onChange={ (e) => handleEmailChange(e) } value={email} placeholder="Enter email" autoComplete="email" marginTop={'12px'}/>
                    {emailErrorMessage && <MintParagraph size='14' weight='medium' style={{color: isSuccess ? colors.darkgreen800 :  colors.redError, marginTop:"4px"}}>{emailErrorMessage}</MintParagraph>}
                    <SecondaryButton style={{width:"100%", marginTop:"12px"}} size="large" type="submit" onClick={handleSubmit} text={"Send request"}></SecondaryButton>
                    <SecondaryButton style={{width:"100%", marginTop:"12px"}} size="large" type="button" isLight onClick={() => router.push("/")} text={"Go Home"}></SecondaryButton>
                    </form>
                </div>
        </StyledContentDiv>
    </ContentParent>

    )
}
export default SignInCreateAccount;