import React, { useEffect, useState } from 'react';
import { makeAuthedApiRequest } from '../../utils/api/apiHelper';
import { useRouter } from 'next/router';
import styled from "@emotion/styled";

import {colors} from "../../styles/oldColors";
import { H2, MintParagraph } from '../Typography/Typography';
import { useAppDispatch, useAppSelector } from '../../store'; // import your custom hooks
import { fetchUserGroups, GroupWithMembersModel } from '../../slices/groups';
import IndividualGroupComponent from '../boxes/groups/IndividualGroup';



import OnboardingScreenFrame from '../stuff/OnboardingScreenFrame';

import Image from 'next/image';
import { UserModel } from '../../slices/user';

const Button = styled.button`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: none;
    cursor: pointer;
    width: 60px;
    height: 60px;
    flex: 0 0 auto;
    border-radius: 8px;
    border: 1px solid ${colors.gray400};

    &:hover {
        border-radius: 8px;
        border: 1px solid ${colors.gray900};
    }
`;

const Line = styled.div`
    width: 100%;
    height: 1px;
    background-color: ${colors.gray400};
`;

const Collaborate = () => {
    const router = useRouter();

    const dispatch = useAppDispatch();
    const groupsReducer = useAppSelector(state => state.groupsReducer);
    const user: UserModel = useAppSelector((state) => state.userReducer.user);
    const groups : GroupWithMembersModel[] = groupsReducer.groups;

    useEffect(() => {
        dispatch(fetchUserGroups({}));
    }, [dispatch]);

    const handleNextSubmit = async () => {
        try {
            const data = {
                step: '/dashboard',
            }
            await makeAuthedApiRequest({method: 'post', urlExtension: '/v1/user/updateOnboarding', data});
            if (user.transactionSideType === 'buyer') {
                router.push('/buy');
            } else {
                router.push('/dashboard');
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <OnboardingScreenFrame prevStep='/onboarding/user/user-details' nextOnClick={handleNextSubmit}>
            <H2 style={{marginLeft:"2px"}}>Setup Groups</H2>
            <MintParagraph size='18' weight='medium' style={{color:colors.gray700, marginTop:'20px', marginLeft:"2px"}}>Invite someone to collaborate with you on Housewell</MintParagraph>
            {groups.map((group, index) => (
                <IndividualGroupComponent key={index} groupWithMembers={group} style={{marginTop:'32px'}} />
            ))}
        </OnboardingScreenFrame>
    )
}

export default Collaborate;