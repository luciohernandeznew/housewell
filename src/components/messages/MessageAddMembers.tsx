import React, {useEffect, useState} from "react";
import {ChatWithMembersModel, fetchChats} from "../../slices/chats";
import {useAppDispatch, useAppSelector} from "../../store";
import {fetchUserGroups} from "../../slices/groups";
import {UserModel} from "../../slices/user";
import Select, {MultiValue} from 'react-select';
import {H5} from "../Typography/Typography";
import styled from "@emotion/styled";
import SecondaryButton from "../buttons/SecondaryButton";
import {makeAuthedApiRequest} from "../../utils/api/apiHelper";

export type MessageAddMembersProps = {
    chat: ChatWithMembersModel,
    user: UserModel
}

const Container = styled.div`
    font-family: Mint Grotesk;
    padding: 24px;
`

const MessageAddMembers: React.FC<MessageAddMembersProps> = (props: MessageAddMembersProps) => {
    const dispatch = useAppDispatch();
    const groups = useAppSelector((state) => state.groupsReducer.groups);
    const [selectedMembers, setSelectedMembers] = useState([] as MultiValue<any>);

    const groupMembers =  groups.reduce((acc: UserModel[], group) => {
        group.members
            .filter(member => member.id !== props.user.id && !props.chat.members.some(chatMember => chatMember.id === member.id))
            .forEach(newMember => (!acc.find(member => member.id === newMember.id) && acc.push(newMember)));
        return acc;
    }, []);

    useEffect(() => {
        dispatch(fetchUserGroups({}));
    }, [dispatch]);

    const options = groupMembers.map((member) => {
        return {
            value: member.id,
            label: `${member.firstName} ${member.lastName}`
        }
    });

    const handleSubmit = async () => {
        if (selectedMembers.length === 0) return;

        console.log({
            chatId: props.chat.id,
            userIds: selectedMembers.map((member) => member.value)
        })

        await makeAuthedApiRequest({
            method: 'post',
            urlExtension: `/v1/chat/addMembers`,
            data: {
                chatId: props.chat.id,
                userIds: selectedMembers.map((member) => member.value)
            },
        });

        // todo: handle error

        setSelectedMembers([]);
        dispatch(fetchChats());
    }

    {/* todo: more styling */}
    return <Container>
        <H5 style={{ margin: "24px 0" }}>Add Members to Chat</H5>
        <Select
            value={selectedMembers}
            isMulti
            name="add-members"
            options={options}
            onChange={(selectedOptions) => setSelectedMembers(selectedOptions)}
        />
        <SecondaryButton
            size='medium'
            style={{ width: "100%", marginTop: "24px" }}
            disabled={selectedMembers.length === 0}
            onClick={() => handleSubmit()}
            text='Add Selected Users'
        />
    </Container>
}

export default MessageAddMembers;