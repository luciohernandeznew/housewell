import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import {colors} from "../../../styles/colors";
import { UserModel } from "../../../slices/user";
import { MintParagraph } from "../../Typography/Typography";
import { UserIcon } from "../../stuff/UserIcon";
import { useDevice } from "../../../contexts/DeviceContext";


export type GroupMemberProps = {
    user: UserModel;
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
const Line = styled.div`
    width: 100%;
    height: 1px;
    background-color: ${colors.gray300};
    margin-top: 12px;
`;

function GroupMember({ user }: GroupMemberProps) {
    const { isMobile } = useDevice();

    return (
        <>
            <Line/>
            <div style={{display:'flex', width:"100%", alignItems:"center", justifyContent:'space-between', marginTop:'12px'}}>
                <div style={{display:'flex', alignItems:'center', justifyContent:'left'}}>
                    {user.firstName && <UserIcon user={user} showUserInfo={false} width="24px" height="24px"/>}
                    <MintParagraph size="16" weight="medium" style={{color:colors.gray900, marginLeft:'8px'}}>{user.firstName || 'Name Not Set'}</MintParagraph>
                    {!isMobile && <MintParagraph size="16" weight="medium" style={{color:colors.gray900, marginLeft:'4px'}}>{user.lastName}</MintParagraph>}
                </div>
                <MintParagraph size="16" weight="medium" style={{color:colors.gray900, marginLeft: '12px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{user.email}</MintParagraph>
            </div>
        </>
    )
}


export default GroupMember;
