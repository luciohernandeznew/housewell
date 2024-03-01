import React, { useState } from "react";
import styled from "@emotion/styled";
import {colors} from "../../../styles/colors";
import { makeAuthedApiRequest } from "../../../utils/api/apiHelper";
import { GroupWithMembersModel } from "../../../slices/groups";
import SecondaryButton from "../../buttons/SecondaryButton";
import { H6, H5, H4, MintParagraph } from "../../Typography/Typography";
import Image from "next/image";
import BasicParentModal from "../modals/BasicParentModal";
import GroupMember from "./GroupMember";
import StyledInputWithSupertext from "../StyledInputWithSupertext";
import StyledSerifInputComponent from "../StyledSerifInput";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import he from 'he';
import { useDevice } from "../../../contexts/DeviceContext";


export type IndividualGroupProps = {
    groupWithMembers?: GroupWithMembersModel;
    style?: React.CSSProperties;
}

const OuterBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    border-radius: 20px;
    padding: 32px;
    border: 1px solid ${colors.gray200};
`;

const Button = styled.button`
    align-items: center;
    justify-content: center;
    background: none;
    cursor: pointer;

    &:hover {
        border-radius: 8px;
        height: 32px;
        width: 32px;
        background: ${colors.gray100};
    }
`;

function IndividualGroupComponent({ groupWithMembers, style }: IndividualGroupProps) {
    const { isMobile } = useDevice();
    const [isModalOpen, setModalOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [emailErrorMessage, setEmailErrorMessage] = useState("");
    const [isGroupNameEditable, setIsGroupNameEditable] = useState(false);
    const [groupName, setGroupName] = useState(() => he.decode(groupWithMembers?.group.name || ""));

    const router = useRouter();

    if (!groupWithMembers) {
        return null;
    }
    function isValidEmail(email: string) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    const openModal = () => {
        setModalOpen(true);
        setEmailErrorMessage("");
      };
    const closeModal = () => {
        setModalOpen(false)
        setEmail("");
        setEmailErrorMessage("");
    }
    const editGroutName = () => {
        setIsGroupNameEditable(true);
    }

    const saveGroupName = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        try {
            await makeAuthedApiRequest({method: 'post', data: {groupName, groupId: groupWithMembers.group.id }, urlExtension: '/v1/group/setGroupName',});
            setIsGroupNameEditable(false);
        } catch (error) {
            const axiosError = error as AxiosError;
            if (axiosError && axiosError.response && axiosError.response.status === 401) {
                router.push('/login');
            }
        }
    }
    const sendEmail = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        try {
            if (!isValidEmail(email)) {
                setEmailErrorMessage("Invalid email address");
                return;
            }
            await makeAuthedApiRequest({method: 'post', data: {recipientEmail: email, groupId:groupWithMembers.group.id }, urlExtension: '/v1/group/sendGroupInvite',});
            setEmailErrorMessage("");
            closeModal();
        } catch (error) {
            const axiosError = error as AxiosError;
            if (axiosError && axiosError.response && axiosError.response.status === 401) {
                router.push('/login');
            }
        }
    }


    return (
        <OuterBox style={style}>
            <div style={{display:'flex', height:"60px", width:"100%", alignItems:"center", justifyContent:'space-between'}}>
                <div style={{display:'flex', alignItems:'center', justifyContent:'left'}}>
                    {isGroupNameEditable ? <StyledSerifInputComponent style={{fontSize: isMobile ? '28px' : '', paddingRight: isMobile ? '0' : ''}} value={groupName} onChange={(e) => setGroupName(e.target.value)}></StyledSerifInputComponent> : isMobile ? <H6>{groupName}</H6> : <H5>{groupName}</H5>}
                    {isGroupNameEditable ? <SecondaryButton size="small" text="Save" onClick={saveGroupName} style={{marginLeft:'12px', paddingLeft:'12.5px', paddingRight:'12.5px'}} isLight/>: <Button style={{marginLeft:'12px'}} onClick={editGroutName}><Image src={"/icon_svg/rename.svg"} width={24} height={24} alt="Icon"/></Button>}
                </div>
                {(!isGroupNameEditable || !isMobile) && <SecondaryButton size='small' onClick={openModal} style={{marginLeft:'15px', paddingLeft:'20px', paddingRight:'20px'}} text={isMobile ? 'Invite' : "Invite New Member"} />}
            </div>
            <div style={{display:'flex', width:"100%", alignItems:"center", justifyContent:'space-between', marginTop:'24px'}}>
                <MintParagraph size="16" weight="medium" style={{color:colors.gray700}}>Group Member</MintParagraph>
                <MintParagraph size="16" weight="medium" style={{color:colors.gray700}}>Email</MintParagraph>
            </div>
            {groupWithMembers.members.map(member => <GroupMember key={member.id} user={member} />)}
            {isModalOpen && <BasicParentModal closeModal={closeModal}>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'left', justifyContent: 'flex-start', padding: '17px', }}>
                <H4 >Invite New Member</H4>
                <StyledInputWithSupertext value={email} placeholder="Enter email" onChange={(e) => {setEmail(e.target.value); setEmailErrorMessage("");}}  label="New Member’s Email" style={{marginTop:'32px'}}></StyledInputWithSupertext>
                {emailErrorMessage && <MintParagraph size='14' weight='medium' style={{color:colors.redError, marginTop:"4px"}}>{emailErrorMessage}</MintParagraph>}
                <SecondaryButton size={'medium'} onClick={sendEmail} style={{paddingLeft:'20px', paddingRight:'20px', marginTop:'32px', maxWidth:"134px"}} text="Send Invite" />
                </div>
            </BasicParentModal>}
        </OuterBox>
    )
}


export default IndividualGroupComponent;
