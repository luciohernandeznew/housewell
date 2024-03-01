import React, {useEffect} from "react";
import SettingsContainer from "../../src/components/settings/SettingsContainer";
import NotificationSettings from "../../src/components/settings/NotificationSettings";
import ProfilePictureUpload from "../../src/components/settings/ProfilePictureUpload";
import IndividualGroupComponent from "../../src/components/boxes/groups/IndividualGroup";
import {useAppDispatch, useAppSelector, AppDispatch} from "../../src/store";
import {fetchUserGroups, GroupWithMembersModel} from "../../src/slices/groups";
import LoadingSpinner from "../../src/components/stuff/LoadingSpinner";

import BasicParentModal from "../../src/components/boxes/modals/BasicParentModal";
import SecondaryButton from "../../src/components/buttons/SecondaryButton";
import { H4, H6 } from "../../src/components/Typography/Typography";
import StyledInputComponent from "../../src/components/boxes/StyledInputWithSupertext";
import { createGroup } from "../../src/slices/groups";
import { useRouter, NextRouter } from "next/router";
import { useDevice } from "../../src/contexts/DeviceContext";
import { makeAuthedApiRequest } from "../../src/utils/api/apiHelper";
import { useSession } from "@pylonlending/react-elements";


import { LOGOUT_USER } from "../../src/constants";


const logout = async (router: NextRouter, destroy: Function, dispatch: AppDispatch) => {
    try {
        await makeAuthedApiRequest({method: 'post', urlExtension: '/v1/user/logout'})
        destroy();
        if (window.Intercom) {
            window.Intercom('shutdown');
        }
        dispatch({type: LOGOUT_USER});
        router.push('/login');
    } catch (e) {
        console.log(e);
    }
    
}

const SettingsPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const { destroy } = useSession();
    const { isMobile } = useDevice();
    const router = useRouter();
    const groupsReducer = useAppSelector(state => state.groupsReducer);
    const groups : GroupWithMembersModel[] = groupsReducer.groups;
    const user = useAppSelector(state => state.userReducer.user);
    const [showCreateGroupModal, setShowCreateGroupModal] = React.useState(false);
    const [groupName, setGroupName] = React.useState("");
    const createGroupWithName = async () => {
        await dispatch(createGroup(groupName));
        setShowCreateGroupModal(false);
    }
    

    useEffect(() => {
        dispatch(fetchUserGroups({}));
    }, [dispatch]);

    return <div style={{ margin: isMobile ? '0 3% 12px 3%' :"0 12% 32px 12%" }}>
        {isMobile ? 
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}><SecondaryButton size='small' hasArrow isLight borderless reverseArrow text={"Dashboard"} style={{ margin: "24px 0" }} onClick={() => {user.transactionSideType === 'seller' ? router.push("/dashboard") : router.push('/buy')}} />
        <SecondaryButton size='small' text={"Log Out"} style={{ padding: "10px 10px" }} onClick={() => logout(router, destroy, dispatch)} /></div> 
        : <SecondaryButton size='medium' hasArrow isLight borderless reverseArrow text={"Dashboard"} style={{ margin: "24px 0" }} onClick={() => {user.transactionSideType === 'seller' ? router.push("/dashboard") : router.push('/buy')}} />}
        <SettingsContainer title={"Profile Settings"} isMobile={isMobile}>
            <ProfilePictureUpload isMobile={isMobile}/>
        </SettingsContainer>
        <SettingsContainer title={"Email Notification Preferences"} isMobile={isMobile}>
            <NotificationSettings />
        </SettingsContainer>
        <SettingsContainer title={"Group Settings"}
            style={{padding:'0', border:'none'}}
            isMobile={isMobile}
            titleChildren={<SecondaryButton onClick={() => setShowCreateGroupModal(true)} style={{padding:isMobile ? '0 10px' : '0 20px'}} text={isMobile ? 'Create' : 'Create Group'} title="Create Group" size={isMobile ? "small" : 'medium'}></SecondaryButton>}>
            {groups ? groups.map((group, index) => (
                <IndividualGroupComponent style={{marginTop: index === 0 ? '0' : '24px' }} key={index} groupWithMembers={group} />
            )) : <div><LoadingSpinner/></div>}
        </SettingsContainer>
        {showCreateGroupModal && 
            <BasicParentModal closeModal={() => setShowCreateGroupModal(false)}>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'left', justifyContent: 'flex-start', padding: '17px', }}>
                <H4>Create a Group</H4>
                <H6 style={{marginTop:'20px'}}>Enter Group Name</H6>
                <StyledInputComponent style={{marginTop:'20px'}} label="Group Name" placeholder="Start typing group name..." onChange={(e) => {setGroupName(e.target.value);}} value={groupName}></StyledInputComponent>
                <SecondaryButton onClick={createGroupWithName} style={{marginTop:'48px', padding:'0 20px'}} text='Create Group' title="Create Group" size="medium"></SecondaryButton>
                </div>

            </BasicParentModal>
        }
     </div>
}

export default SettingsPage;