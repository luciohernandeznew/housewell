import React from "react";
import {MessageChatData} from "./MessageBox";
import styled from "@emotion/styled";
import {colors} from "../../styles/colors";
import UserIcon from "../stuff/UserIcon";
import {UserModel} from "../../slices/user";
import {MintParagraph} from "../Typography/Typography";
import {useAppSelector} from "../../store";
import LoadingSpinner from "../stuff/LoadingSpinner";
import {useDevice} from "../../contexts/DeviceContext";
import Image from 'next/image';
import dayjs from "dayjs";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 18%;
    height: calc(100vh - 192px);
    overflow-y: auto;
    border-right: 1px solid ${colors.gray200};
`;

const SidebarItemContainer = styled.div<{isSelected: boolean}>`
    display: flex;
    align-items: center;
    height: max-content;
    padding: 16px 24px;
    
    border-bottom: 1px solid ${colors.gray300};
    background-color: ${(props) => props.isSelected ? colors.orange100 : "transparent"};
    
    &:hover {
        background: ${colors.orange200};
    }
`;

const OrangeCircle = styled.div`
    height: 10px;
    width: 10px;
    border-radius: 50%;
    background-color: ${colors.orange500};
    position: absolute;
    right: 7px;
    top: 24px;
`;

const MessageSidebarItem = (props: { chatData: MessageChatData, isSelected: boolean, onClick: () => void,}) => {
    const notifications = useAppSelector((state) => state.notificationReducer.notifications);
    const shouldShowNotification = notifications.some((notif) => notif.objectId === props.chatData.id && notif.notifType === 'MSG' && !notif.read);
    const user = useAppSelector((state) => state.userReducer.user);
    if (!user) {
        return <div><LoadingSpinner/></div>
    }
    const chatUser = props.chatData.chat.members.find((member) => member.id != user.id);
    const getChatNameFromMembers = (members: UserModel[], currentUserId: string) => {
        return members
          .filter(member => member.id !== currentUserId)
          .sort((a, b) => {
            if (a.firstName && b.firstName) {
              return a.firstName.localeCompare(b.firstName);
            }
            return 0;
          })
          .map(member => member.firstName)
          .join(", ");
      };
      

    return <SidebarItemContainer isSelected={props.isSelected} onClick={props.onClick} >
        <div style={{ position: "relative", height: "42px", width: "42px", minWidth: "42px", marginRight: "8px" }}>
            {props.chatData.chat.chatType === "USER" && chatUser ? // todo: add icons for other chat types (property, phone)
                <UserIcon user={chatUser} showUserInfo={true}/>
                :
                <Image fill src="/icon_svg/group_icon.svg" alt="group icon"/>
            }
        </div>
        <div style={{ display: "flex", flexDirection: "column", overflow: "hidden", flexShrink: "10", width: "100%" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", position: 'relative' }}>
                <MintParagraph size={"16"} weight={"medium"} style={{ marginBottom: "8px", whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" }} >
                    {
                        getChatNameFromMembers(props.chatData.chat.members, user.id)
                    }
                </MintParagraph>
                <MintParagraph size={"12"} weight={"regular"} style={{marginLeft:'7px', marginBottom: "8px", color: colors.gray600 }} >
                    {props.chatData.recentMessage && dayjs(props.chatData.recentMessage.sendTime).format('MM.DD.YY')}
                </MintParagraph>
                {shouldShowNotification && <OrangeCircle></OrangeCircle>}
            </div>
            <MintParagraph size={"14"} weight={"regular"} style={{ whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden", maxWidth: "100%" }} >
                {props.chatData.recentMessage?.text}
            </MintParagraph>
        </div>
    </SidebarItemContainer>
}

export type MessageBoxSidebarProps = {
    chatData: MessageChatData[],
    selectedChat?: string,
    setSelectedChat: (chatId: string) => void,
    createNewChat: () => void,
    toggleChatWindow?: () => void,
}

const MessageBoxSidebar: React.FC<MessageBoxSidebarProps> = (props: MessageBoxSidebarProps) => {
    const { isMobile } = useDevice();
    return <Container style={{width: isMobile ? '100%' : '18%'}}>
        {/*<div style={{ display: "flex", padding: "16px", width: "auto", borderBottom: `1px solid ${colors.gray300}` }}>*/}
            {/*<SecondaryButton*/}
            {/*    style={{ width: "100%" }}*/}
            {/*    size="large"*/}
            {/*    onClick={props.createNewChat}*/}
            {/*    text={"New Chat"}*/}
            {/*/>*/}
        {/*</div>*/}
        {props.chatData.map((chatData, i) =>
            <MessageSidebarItem
                chatData={chatData}
                isSelected={props.selectedChat === chatData.id}
                onClick={() => {props.setSelectedChat(chatData.id); props.toggleChatWindow && props.toggleChatWindow()}}
                key={i}
            />
        )}
    </Container>
}

export default MessageBoxSidebar;