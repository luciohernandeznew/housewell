import React, { useEffect, useState, useRef} from 'react';
import styled from '@emotion/styled';

import axios from "axios";
import { useRouter } from 'next/router';
import { colors } from '../../src/styles/colors';
import { useDevice } from '../../src/contexts/DeviceContext';
import { baseURL } from '../../src/constants';
import { H2, MintParagraph } from '../../src/components/Typography/Typography';
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
function isValidEmail(email: string) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

type SignInProps = {
    isLogin: boolean;
  };

const SignInCreateAccount: React.FC<SignInProps> = ({ isLogin }) => {
    const [isCreateAccount, setIsCreateAccount] = useState(!isLogin);
    const [isSuccess, setIsSuccess] = useState(false);
    const [email, setEmail] = useState("");
    const [emailErrorMessage, setEmailErrorMessage] = useState("");
    const router = useRouter();
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
            token: ''
        }
        if (!formRef.current) {
            return;
        }
        const formData = new FormData(formRef.current);
        const userEmail = formData.get('email') as string;
        try {
            if (!isValidEmail(email) && !userEmail) {
                setEmailErrorMessage("Invalid email address");
                return;
            }
                const loginApiResponse = await axios({
                    url: `${baseURL}/v1/auth/sendForgotPasswordEmail`,
                    method: 'post',
                    data: {email: userEmail,},
                    withCredentials: true,
                });
                if (loginApiResponse.status === 200) {
                    setIsSuccess(true);
                    setEmailErrorMessage("Email sent, check your spam folder if you don't see it in your inbox.");
                }
        } catch (error) {
            if (isCreateAccount && axios.isAxiosError(error)) {
                if (error.response && error.response.status === 400) {
                    setEmailErrorMessage(error.response.data.error);
                }
            } else if (axios.isAxiosError(error)) {
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
            <H2 style={{width:"100%"}}>Reset Password</H2>
                <StatusMessage style={{ margin: "8px 0 0px 0" }} hasIcon>
                        <MintParagraph size={"14"} weight={"medium"}>
                           Type the email address associated with your account and we’ll send you a link to reset your password.
                        </MintParagraph>
                    </StatusMessage>
                <div style={{maxWidth:"592px", display:"flex", flexDirection:"column"}}>
                    <form  ref={formRef} onSubmit={handleSubmit}>
                    <StyledInputComponent isError={!!emailErrorMessage && !isSuccess} name='email' id={`1`} onChange={ (e) => handleEmailChange(e) } value={email} placeholder="Email" autoComplete="email" style={{marginTop:"12px"}}/>
                    {emailErrorMessage && <MintParagraph size='14' weight='medium' style={{color: isSuccess ? colors.darkgreen800 :  colors.redError, marginTop:"4px"}}>{emailErrorMessage}</MintParagraph>}
                    <SecondaryButton style={{width:"100%", marginTop:"12px"}} size="large" type="submit" onClick={handleSubmit} text={"Send Link"}></SecondaryButton>
                    </form>
                </div>
        </StyledContentDiv>
    </ContentParent>

    )
}
export default SignInCreateAccount;