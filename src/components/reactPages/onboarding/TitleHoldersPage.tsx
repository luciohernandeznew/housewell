import React, { useEffect, useCallback, useState, useRef } from 'react';
import styled from '@emotion/styled';
import { H2, MintParagraph } from '../../Typography/Typography';
import { useRouter } from "next/router";
import { makeAuthedApiRequest } from '../../../utils/api/apiHelper';
import OnboardingScreenFrame from '../../stuff/OnboardingScreenFrame';
import StatusMessage from "../../stuff/StatusMessage";
import { colors } from "../../../styles/colors";
import MultipleChoiceParent from "../../stuff/MultipleChoiceParent";
import { GroupWithMembersModel, fetchUserGroups } from "../../../slices/groups";
import { UserModel } from "../../../slices/user";
import { useAppDispatch, useAppSelector } from "../../../store";



const StyledStateZipDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    margin-top: 12px;
`
export type BasicPropertyDetails = {
    streetAddress: string,
    address2?: string,
    city: string,
    state: string,
    zip: string,
    propertyId: string,
    groupId: string,
    firstTitleHolderUserId?: string,
    secondTitleHolderUserId?: string,
}




const TitleHoldersPage = (props: { locationData: BasicPropertyDetails; }) => {
    const router = useRouter();
    const dispatch = useAppDispatch();

    useEffect(() => { dispatch(fetchUserGroups({})) }, [dispatch]);
    const groups = useAppSelector((state) => state.groupsReducer.groups);
    useEffect(() => {
        if (!props.locationData) {
            throw new Error('Missing data, please go back and try again.');
        }
        if (props.locationData.groupId) {
            setSelectedGroup(groups.find((group) => group.group.id === props.locationData.groupId))
        } else {
            throw new Error('Error with groups. Please reach out to your Housewell Advisor.');
        }
    }, [groups, props.locationData, props.locationData.groupId]);
    const [selectedUserIndex, setSelectedUserIndex] = useState(-1);
    const [selectedSecondUserIndex, setSelectedSecondUserIndex] = useState(-1);
    const [hasSecondUser, setHasSecondUser] = useState(!!props.locationData.secondTitleHolderUserId);
    const [selectedGroup, setSelectedGroup] = useState<GroupWithMembersModel>();

    const groupMembers = groups
        .filter(group => group.group.id === selectedGroup?.group.id)
        .reduce((acc: UserModel[], group) => {
            group.members
                .forEach(newMember => (!acc.find(member => member.id === newMember.id) && acc.push(newMember)));
            return acc;
        }, [])
    const groupMemberChoices = groupMembers.map((member) => { return { text: `${member.firstName} ${member.lastName}` } });
    useEffect(() => {
        if (props.locationData.firstTitleHolderUserId) {
            setSelectedUserIndex(groupMembers.findIndex((member) => member.id === props.locationData.firstTitleHolderUserId))
        }
        if (props.locationData.secondTitleHolderUserId) {
            setSelectedSecondUserIndex(groupMembers.findIndex((member) => member.id === props.locationData.secondTitleHolderUserId))
        }
    }, [groups, groupMembers, props.locationData.firstTitleHolderUserId, props.locationData.secondTitleHolderUserId]);

    const setFirstUserIndex = (index: number) => {
        if (index === selectedSecondUserIndex) {
            return;
        }
        setSelectedUserIndex(index);
    }

    const setSecondUserIndex = (index: number) => {
        if (index === selectedUserIndex) {
            return;
        }
        setSelectedSecondUserIndex(index);
    }


    const address2String = props.locationData.address2 ? props.locationData.address2 + ' ' : '';
    const fullAddress = props.locationData.streetAddress + ' ' + address2String + props.locationData.city + ' ' + props.locationData.state + ' ' + props.locationData.zip;


    const prevStep = '/onboarding/property/part-2/pricing?propertyId=' + props.locationData.propertyId;
    const nextStep = '/onboarding/property/part-3/commission?propertyId=' + props.locationData.propertyId;
    const handleNextSubmit = async () => {
        try {
            const data = {
                propertyId: props.locationData.propertyId,
                firstTitleHolderUserId: groupMembers[selectedUserIndex]?.id,
                secondTitleHolderUserId: groupMembers[selectedSecondUserIndex]?.id,
                onboardingStep: '/onboarding/property/part-3/commission'
            }
            await makeAuthedApiRequest({ method: 'post', urlExtension: `/v1/property/titleHolders`, data });
            router.push(nextStep);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <OnboardingScreenFrame prevStep={prevStep} nextOnClick={handleNextSubmit}>

            <H2 style={{ margin: "0 0 24px 0" }}>Title Holders</H2>

            <MintParagraph size={"20"} weight={"medium"} style={{ margin: "0 0 12px 0", color: colors.gray700 }}>{fullAddress}</MintParagraph>

            <StatusMessage style={{ margin: "12px 0 24px 0" }} hasIcon>
                <div>
                    <MintParagraph size={"14"} weight={"medium"}>Select the users that are on the title for the property.</MintParagraph>
                </div>
            </StatusMessage>

            {hasSecondUser && <MintParagraph size={"20"} weight={"medium"} style={{ margin: "36px 0 0 0" }}>{`First title holder:`}</MintParagraph>}
            <MultipleChoiceParent useChecks style={{ margin: "24px 0 36px 0" }} choices={groupMemberChoices} selectedIndex={selectedUserIndex} onSelection={(index) => setFirstUserIndex(index)} />

            {hasSecondUser && <div>
                <MintParagraph size={"20"} weight={"medium"}>{`Second title holder:`}</MintParagraph>
                <MultipleChoiceParent useChecks style={{ margin: "24px 0 36px 0" }} choices={groupMemberChoices} selectedIndex={selectedSecondUserIndex} onSelection={(index) => setSecondUserIndex(index)} />
            </div>}

            {((selectedGroup?.members?.length || 0) > 1) && <MintParagraph size={"20"} weight={"medium"}
                style={{ margin: "-24px 0 36px 0", color: colors.brandGreen, cursor: "pointer" }}
                onClick={() => { setHasSecondUser(!hasSecondUser); setSelectedSecondUserIndex(-1); }}
            >{!hasSecondUser ? `+ Add a second title holder` : '- Remove second title holder'}</MintParagraph>}
        </OnboardingScreenFrame>

    )
}
export default TitleHoldersPage;