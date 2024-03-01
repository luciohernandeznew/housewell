import React, { useEffect, useState, useRef} from 'react';
import styled from '@emotion/styled';
import {H2} from '../Typography/Typography';
import StyledInputComponent from '../boxes/StyledInput';
import SecondaryButton from '../buttons/SecondaryButton';
import {colors} from "../../styles/colors";
import { MintParagraph, H6 } from "../Typography/Typography";
import GoogleSignInUpButton from '../buttons/GoogleSignInUpButton';
import ValidInvalidIcon from "../interactiveIcons/ValidInvalidIcon";
import { getOrCreateDeviceUuid } from "../../utils/auth/authHelper";
import { useDevice } from "../../contexts/DeviceContext";
import axios from "axios";
import { useRouter } from 'next/router';
import { getCookie, deleteCookie} from 'cookies-next'
import { baseURL } from '../../constants';
import StatusMessage from '../stuff/StatusMessage';
import Link from 'next/link';
import { makeAuthedApiRequest } from '../../utils/api/apiHelper';

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

const HorizantalParentDiv = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
`;
const LineDiv = styled.div`
    width: 100%;
    height: 2px;
    background-color: ${colors.gray400};
    flex: 1;
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

const ButtonSpacingDiv = styled.div`
    height: 12px;
    width: 48px;
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

function getQueryParamFromPath(path: string, paramToGet: string): string | null {
    if (!path) {
        return null;
    }
    const parts = path.split('?');
    if (parts.length < 2) {
      return null;
    }
    const queryString = parts[1];
    const params = new URLSearchParams(queryString);
    return params.get(paramToGet);
}
type SignInProps = {
    isLogin: boolean;
  };

const SignInCreateAccount: React.FC<SignInProps> = ({ isLogin }) => {
    const [isCreateAccount, setIsCreateAccount] = useState(!isLogin);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailErrorMessage, setEmailErrorMessage] = useState("");
    const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
    const [hasEightCharacters, setHasEightCharacters] = useState(false);
    const [hasOneNumber, setHasOneNumber] = useState(false);
    const [hasOneSpecialCharacter, setHasOneSpecialCharacter] = useState(false);
    const [hasOneUppercaseLetter, setHasOneUppercaseLetter] = useState(false);
    const [isGoogleSignInInProgress, setIsGoogleSignInInProgress] = useState(false);
    const [isFacebookSignInInProgress, setIsFacebookSignInInProgress] = useState(false);
    const router = useRouter();
    const { code, signInType } = router.query;
    const formRef = useRef(null);

    const { isMobile } = useDevice();
    useEffect(() => {
        const redirectUrl = getCookie('redirectUrl');
        if (redirectUrl && typeof redirectUrl === 'string') {
            const token = getQueryParamFromPath(redirectUrl, 'token');
            
        }
    }, []);
    useEffect(() => {
        const handleGoogleFacebookSignIn = async () => {
            if (signInType === 'google' && code && !isGoogleSignInInProgress) {
                setIsGoogleSignInInProgress(true);
                try {
                    if (!window) {
                        return;
                    }
                    
                    const redirectUrl = localStorage.getItem('redirectUrl');

                    if (redirectUrl && typeof redirectUrl === 'string') {                        
                        const token = getQueryParamFromPath(redirectUrl, 'token');
                        const data = {
                            code,
                            callbackUrl: `${window.location.origin}/login?signInType=google`,
                            token,
                        }
                        localStorage.removeItem('redirectUrl');
                        const response = await axios.post(`${baseURL}/v1/auth/google`, data, { withCredentials: true });
                        router.push(response.data);
                        return;
                    }
                    const response = await axios.post(`${baseURL}/v1/auth/google`, { code, callbackUrl: `${window.location.origin}/login?signInType=google`, }, { withCredentials: true });
                    await router.push(response.data);
                } catch (error) {
                    console.error('Error during Google sign-in:', error);
                    // Handle error (e.g., show error message)
                }
            }
            if (signInType === 'facebook' && code && !isFacebookSignInInProgress) {
                setIsFacebookSignInInProgress(true);
                try {
                    if (!window) {
                        return;
                    }
            
                    const redirectUrl = localStorage.getItem('redirectUrl');
            
                    if (redirectUrl && typeof redirectUrl === 'string') {
                        const token = getQueryParamFromPath(redirectUrl, 'token');
                        const data = { 
                            code,
                            callbackUrl: `${window.location.origin}/login?signInType=facebook`,
                            token,
                        };
                        localStorage.removeItem('redirectUrl');
                        const response = await axios.post(`${baseURL}/v1/auth/google`, data, { withCredentials: true });
                        router.push(response.data);
                        return;
                    }
            
                    const response = await axios.post(`${baseURL}/v1/auth/facebook`, { code, callbackUrl: `${window.location.origin}/login?signInType=facebook`, }, { withCredentials: true });
                    await router.push(response.data);
            
                } catch (error) {
                    console.error('Error during Facebook sign-in:', error);
                    // Handle error (e.g., show error message)
                }
            }
        };

        handleGoogleFacebookSignIn();
    });
    const handleSwitchView = (isSignUp: boolean) => {
        setIsCreateAccount(isSignUp);
        if (isSignUp) {
            setEmailErrorMessage("");
            setPasswordErrorMessage("");
            setPassword("");
            setEmail("");
            router.push('/signup');
        }
        else {
            setEmailErrorMessage("");
            setPasswordErrorMessage("");
            setPassword("");
            setEmail("");
            router.push('/login');
        }

    }
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmailErrorMessage("");
        setPasswordErrorMessage("");
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmailErrorMessage("");
        setPasswordErrorMessage("");
        setPassword(e.target.value);
        setHasEightCharacters(e.target.value.length >= 8);
        setHasOneNumber(e.target.value.match(/[0-9]/) !== null);
        setHasOneSpecialCharacter(e.target.value.match(/[!@#$%^&*(),.?:{}|<>]/) !== null);
        setHasOneUppercaseLetter(e.target.value.match(/[A-Z]/) !== null);
    }
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        const deviceUuid = getOrCreateDeviceUuid();
        const redirectUrl = localStorage.getItem('redirectUrl');
        const token = getQueryParamFromPath(redirectUrl as string, 'token');

        const data = {
            email,
            password,
            deviceUuid,
            token,
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
            if (isCreateAccount) {
                if (!hasEightCharacters || !hasOneNumber || !hasOneSpecialCharacter || !hasOneUppercaseLetter) {
                    return;
                }
                const redirectUrl = localStorage.getItem('redirectUrl');
                if (redirectUrl && typeof redirectUrl === 'string') {
                    const signUpApiResponse = await axios({
                        url: `${baseURL}/v1/auth/createUser`,
                        method: 'post',
                        data: data,
                        withCredentials: true,
                    });
                    localStorage.removeItem('redirectUrl');
                    router.push(signUpApiResponse.data.onboardingStep);
                } else {
                    const signUpApiResponse = await axios({
                        url: `${baseURL}/v1/auth/createUser`,
                        method: 'post',
                        data: data,
                        withCredentials: true,
                    });
                    router.push(signUpApiResponse.data.onboardingStep);
                }


            } else {
                const loginApiResponse = await makeAuthedApiRequest({method: 'post', urlExtension: '/v1/auth/login', data: data});
                if (loginApiResponse.status === 200) {
                    let redirectUrl = localStorage.getItem('redirectUrl');
                    if (redirectUrl && typeof redirectUrl === 'string') {
                        localStorage.removeItem('redirectUrl');
                        router.push(redirectUrl as string);
                    } else {
                        if (loginApiResponse.data.onboardingStep === '/dashboard' && loginApiResponse.data.userType === 'buyer') {
                            await router.push('/buy');
                            return;
                        }
                        await router.push(loginApiResponse.data.onboardingStep);
                    }
                } else {
                    await router.push(loginApiResponse.data.onboardingStep);
                }
            }  
        } catch (error) {
            console.log(error);
            if (isCreateAccount && axios.isAxiosError(error)) {
                if (error.response && error.response.status === 400) {
                    if (error.response.data.error) {
                        setEmailErrorMessage(error.response.data.error);
                    }
                    else {
                        setEmailErrorMessage('Invalid email address');
                    }
                }
            } else if (axios.isAxiosError(error)) {
                if (error.response && error.response.status === 400) {
                    setPasswordErrorMessage(error.response.data.error);
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
            <H2 style={{width:"100%"}}>Welcome to Housewell</H2>
                <div style={{display:"flex", flexDirection: "row", marginTop:"48px"}}>
                    <StyledLoginSignUp onClick={() => handleSwitchView(false)} isSelected={!isCreateAccount}><MintParagraph style={{marginBottom:"11px"}} size="24" weight='regular'>Login</MintParagraph> </StyledLoginSignUp>
                    <StyledLoginSignUp onClick={() => handleSwitchView(true)} isSelected={isCreateAccount}><MintParagraph style={{marginBottom:"11px"}} size="24" weight='regular'>Sign Up</MintParagraph> </StyledLoginSignUp>
                </div>
                <div style={{maxWidth:"592px", display:"flex", flexDirection:"column"}}>
                    <form  ref={formRef} onSubmit={handleSubmit}>
                    <StyledInputComponent isError={!!emailErrorMessage} name='email' id={`1`} onChange={ (e) => handleEmailChange(e) } value={email} placeholder="Email" autoComplete="email" style={{marginTop:"12px"}}/>
                    {emailErrorMessage && <MintParagraph size='14' weight='medium' style={{color:colors.redError, marginTop:"4px"}}>{emailErrorMessage}</MintParagraph>}
                    <StyledInputComponent isError={!!passwordErrorMessage} id={`2`} name='password' onChange={ (e)=> handlePasswordChange(e) } value={password} placeholder="Password" autoComplete={isCreateAccount ? "new-password" : "current-password"} marginTop={'12px'} isPassword/>
                    {passwordErrorMessage && <MintParagraph size='14' weight='medium' style={{color:colors.redError, marginTop:"4px"}}>{passwordErrorMessage}</MintParagraph>}
                    {!isCreateAccount && (
                        <Link href="/forgot-password">
                            <MintParagraph 
                                size='14' 
                                weight='medium' 
                                style={{
                                    color: colors.darkgreen800, 
                                    marginTop: '6px', 
                                    cursor: 'pointer',
                                    textDecoration: 'underline',
                                }}
                            >
                                Forgot Password?
                            </MintParagraph>
                        </Link>
                    )}
                    {isCreateAccount && password  && 
                        <>
                        <ValidInvalidIcon isValid={hasEightCharacters} text={'At least 8 characters long'} style={{paddingLeft:"10px", boxSizing:"border-box", marginTop:"16px"}}/>
                        <ValidInvalidIcon isValid={hasOneUppercaseLetter} text={'At least 1 uppercase letter'} style={{paddingLeft:"10px", boxSizing:"border-box", marginTop:"4px"}}/>
                        <ValidInvalidIcon isValid={hasOneNumber} text={'At least 1 number'} style={{paddingLeft:"10px", boxSizing:"border-box", marginTop:"4px"}}/>
                        <ValidInvalidIcon isValid={hasOneSpecialCharacter} text={'At least 1 special character (e.g. !@$%)'} style={{paddingLeft:"10px", boxSizing:"border-box", marginTop:"4px"}}/>
                        </>
                    }
                    <SecondaryButton style={{width:"100%", marginTop:"12px"}} size="large" type="submit" onClick={handleSubmit} text={isCreateAccount ? "Sign Up" : "Login"}></SecondaryButton>
                    </form>
                </div>
                <HorizantalParentDiv style={{marginTop:"18px"}}><LineDiv/><H6 style={{marginLeft:"16px", marginRight:"16px", fontSize:"18px", flex:"0", lineHeight:"28px"}}>or</H6><LineDiv/></HorizantalParentDiv>
                <HorizantalParentDiv style={{marginTop:"32px", flexDirection: isMobile ? 'column' : 'row'}}> 
                    <GoogleSignInUpButton/>
                </HorizantalParentDiv>
        </StyledContentDiv>
    </ContentParent>

    )
}
export default SignInCreateAccount;