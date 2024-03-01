import { GetServerSidePropsContext } from 'next';
import React, {useEffect} from 'react';
import { makeAuthedApiRequest } from '../../src/utils/api/apiHelper';
import { useAppSelector, useAppDispatch} from "../../src/store";
import { useRouter } from 'next/router';
import {fetchUser} from "../../src/slices/user";
import styled from '@emotion/styled';
import { getCookie } from 'cookies-next';
import { colors } from '../../src/styles/colors';
import OnboardingScreenFrame from '../../src/components/stuff/OnboardingScreenFrame';
import { MintParagraph, H2} from '../../src/components/Typography/Typography';
import SecondaryButton from '../../src/components/buttons/SecondaryButton';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const JoinGroup = (props: {email?: string, isVerified?: boolean}) => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const userState = useAppSelector((state) => state.userReducer);
    useEffect(() => {
        dispatch(fetchUser());
    }, [dispatch]);
    useEffect(() => {
        if (props.isVerified) {
            router.push('/onboarding/user/individual-or-business');
        }
    }, [props.isVerified, router, userState?.user?.onboardingStep]);

    if (userState?.status === 'succeeded' && userState?.user?.onboardingStep) {
        router.push(userState?.user?.onboardingStep);
    }
    const handleSubmit = async () => {
        try {
            const data = { userId : getCookie('user_id')}
            await makeAuthedApiRequest({method: 'post', data, urlExtension: '/v1/auth/resendVerifyEmail',});
        } catch (error) {
            console.log(error);
        }
    }



    return (
        <OnboardingScreenFrame removeBottomNav>
            <Container>
                <H2>Please verify your email</H2>
                <MintParagraph size='18' weight='regular' style={{color:colors.gray700, marginTop:'16px'}}>{props.email ?  `A verification email has been sent to ${props.email}` : 'A verification email has been sent'}</MintParagraph>
                <SecondaryButton size='large' style={{width:'75%', marginTop:'32px'}} text='Send again' onClick={handleSubmit}></SecondaryButton>
            </Container>
        </OnboardingScreenFrame>
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const { req, res, query } = context;
    const token = query.token;
    try {
        if (token) {
            const response = await makeAuthedApiRequest({method: 'post', data: {token}, urlExtension: '/v1/auth/verifyEmail', isServer: true, req, res});
            if (response.headers['set-cookie']) {
                res.setHeader('Set-Cookie', response.headers['set-cookie']);
            }
            console.log(JSON.stringify(response.headers));
            return {props: {isVerified: true}};
        }
        const userId = getCookie('user_id', {req, res});
        const response = await makeAuthedApiRequest({method: 'get', data: {userId}, urlExtension: '/v1/auth/emailByUserId', isServer: true, req, res});
        console.log(response);
        return { props: {email: response.data.email} };
    } catch (error) {
        return { props: {} };
    }
}

export default JoinGroup;