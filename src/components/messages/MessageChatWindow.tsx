import React, {useEffect, useRef, useState} from "react";
import {MessageModel} from "../../slices/messages";
import MessageTextField from "./MessageTextField";
import styled from "@emotion/styled";
import {colors} from "../../styles/colors";
import {H1, MintParagraph} from "../Typography/Typography";
import {UserModel} from "../../slices/user";
import {useAppDispatch, useAppSelector} from "../../store";
import UserIcon from "../stuff/UserIcon";
import dayjs from "dayjs";
import {MessageQueryParams} from "./MessageBox";
import {makeAuthedApiRequest} from "../../utils/api/apiHelper";
import SecondaryButton from "../buttons/SecondaryButton";
import {renameChat} from "../../slices/chats";
import BasicParentModal from "../boxes/modals/BasicParentModal";
import MessageAddMembers from "./MessageAddMembers";
import { markNotificationsAsRead } from "../../slices/notifications";
import { useDevice } from "../../contexts/DeviceContext";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    height: calc(100vh - 267px);
`;

const MessagesContainer = styled.div`
  flex-grow: 4;
  overflow-y: auto;
`;

const MessageDisplayContainer = styled.div`
    color: ${colors.gray900};
    display: flex;
    flex-direction: column;
    height: max-content;
    
    padding: 16px 24px;
`;

export type MessageDisplayProps = {
    message: MessageModel,
    userId: string,
    user: UserModel
}

const MessageDisplay = (props: MessageDisplayProps) => {
    return <MessageDisplayContainer>
        <div style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
            <div style={{ position: "relative", height: "28px", width: "28px", minWidth: "28px", marginRight: "4px" }}>
                <UserIcon user={props.user} showUserInfo={true} />
            </div>
            <MintParagraph size={"16"} weight={"medium"}>{props.user.firstName} {props.user.lastName}</MintParagraph>
        </div>
        <MintParagraph size={"16"} weight={"regular"} style={{ marginBottom: "8px", whiteSpace: 'pre-line' }} >{props.message.text}</MintParagraph>
        <MintParagraph style={{ color: colors.gray700 }} size={"12"} weight={"regular"} >{dayjs(props.message.sendTime).format('hh:mm A')}</MintParagraph>
    </MessageDisplayContainer>
}

const ChatMemberItemContainer = styled.div`
    display: flex;
    align-items: center;
    height: max-content;
    padding: 16px 24px;
    
    border-bottom: 1px solid ${colors.gray300};
`;

const ChatMemberItem = (props: { user: UserModel, userId: string }) => {
    return <ChatMemberItemContainer>
        <div style={{ position: "relative", height: "42px", width: "42px", minWidth: "42px", marginRight: "8px" }}>
            <UserIcon user={props.user} showUserInfo={true} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", overflow: "hidden" }}>
            <MintParagraph size={"16"} weight={"medium"}>{props.user.firstName} {props.user.lastName} {props.user.id === props.userId && "(You)"}</MintParagraph>
        </div>
        {/* todo: add chat member removal button for owner */}
    </ChatMemberItemContainer>
}

const SeparatorContainer = styled.div`
    display: flex;
    align-items: center;
    
    & > hr {
        flex-grow: 1;
        height: 1px;
        border: none;
        background-color: ${colors.gray300};
        margin: 0;
    }
`

const DaySeparator = (props: { date: dayjs.Dayjs }) => {
    return <SeparatorContainer>
        <hr/>
        <MintParagraph size={"12"} weight={"regular"} style={{ margin: "0 10px", color: colors.gray700 }}>{props.date.format("MM.DD.YYYY")}</MintParagraph>
        <hr/>
    </SeparatorContainer>
}

export type MessageChatWindowProps = {
    messages: MessageModel[],
    chatId?: string
    query: MessageQueryParams,
    clearQuery: () => void,
    setSelectedChat: (chatId: string) => void,
    toggleChatWindow?: () => void,
}

const MessageChatWindow: React.FC<MessageChatWindowProps> = (props: MessageChatWindowProps) => {
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.userReducer.user);
    const chats = useAppSelector((state) => state.chatsReducer.chats);
    const chat = chats?.find((chat) => chat.id === props.chatId);
    const [chatMembers, setChatMembers] = React.useState<UserModel[]>(chat ? chat.members : []);
    const [modalOpen, setModalOpen] = useState(false);
    const { isMobile } = useDevice();

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };
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
      
    useEffect(() => {
        scrollToBottom();
    }, [props.messages]);

    useEffect(() => {
        setChatMembers(chat ? chat.members : []);
    }, [chat]);

    useEffect(() => {
        dispatch(markNotificationsAsRead(props.chatId as string));
        const fetchUserData = async (currentUser: UserModel) => {
            const response = await makeAuthedApiRequest({
                method: 'post',
                urlExtension: '/v1/user/getUser',
                data: {userId: props.query.userId},
                isServer: false
            });

            if (!response.data) { // todo: handle error better
                return console.error(response);
            }

            // todo: check that sanitized does not cause type mismatch
            setChatMembers([response.data.sanitized as UserModel, currentUser]);
        }

        const fetchGroupData = async (currentUser: UserModel) => {
            const response = await makeAuthedApiRequest({
                method: 'post',
                urlExtension: '/v1/group/getGroupMembers',
                data: {groupId: props.query.groupId},
                isServer: false
            });

            if (!response.data) { // todo: handle error better
                return console.error(response);
            }

            setChatMembers([...response.data as UserModel[], currentUser]);
        }

        if (!chat && chatMembers.length === 0 && user) {
            if (props.query.userId) {
                fetchUserData(user);
            } else if (props.query.groupId) {
                fetchGroupData(user);
            }
        }
    }, [props, props.query.userId, props.query.groupId, chat, chatMembers, user, dispatch]);

    if (!user) { // todo: handle no user better
        return <div>Please log in to view messages</div>
    }
    return <Container>
        { ((props.chatId || props.query.userId || props.query.groupId) && user) ? <>
                {modalOpen && chat && <BasicParentModal closeModal={() => setModalOpen(false)}>
                    <MessageAddMembers
                        chat={chat}
                        user={user}
                    />
                </BasicParentModal>}

                <div style={{ borderBottom: `1px solid ${colors.gray300}`, padding: "21px 24px", color: colors.gray900, display: "flex", flexDirection: "row", alignItems: "center" }}>
                    {isMobile && <SecondaryButton size='small' reverseArrow hasArrow text='' borderless isLight style={{ marginRight: "auto", paddingRight: '0' }} onClick={() => {props.toggleChatWindow && props.toggleChatWindow()}}></SecondaryButton>}
                    <MintParagraph size={"16"} weight={"medium"}>{chat ? getChatNameFromMembers(chatMembers, user.id) : "New Chat"}</MintParagraph>
                    <SecondaryButton size='small' isLight disabled={chat === null} style={{ marginLeft: "auto", paddingLeft: isMobile ? '5px' : '16px', paddingRight: isMobile ? '5px' : '16px' }} onClick={() => setModalOpen(true)} text='Add Members'/>
                </div>

                {/*// todo: set better height */}
                <Container style={{ flexDirection: "row",}}>
                    <Container>
                        <MessagesContainer>
                            {/* todo: dear god pagination or something please */}
                            {props.messages
                                .sort((a, b) => new Date(a.sendTime).getTime() - new Date(b.sendTime).getTime())
                                .map((message, i, list: MessageModel[]) => {
                                    const messageUser = chatMembers.find((member) => member.id === message.userId);
                                    if (!messageUser) {
                                        console.error("Could not find user information for message: ", message, " from members: ", chatMembers);
                                        return <div key={i}>{`Could not load message: ${message}`}</div>
                                    }
                                    if (i > 0) {
                                        const curr = dayjs(list[i].sendTime);
                                        if (!curr.isSame(dayjs(list[i-1].sendTime), "day")) {
                                            return <>
                                                <DaySeparator date={curr} />
                                                <MessageDisplay message={message} userId={user.id} user={messageUser} key={i}/>
                                            </>
                                        }
                                    }
                                    return <MessageDisplay message={message} userId={user.id} user={messageUser} key={i}/>
                                })}
                            <div ref={messagesEndRef} />
                        </MessagesContainer>

                        <div style={{display: "flex", padding: "16px", borderTop: `1px solid ${colors.gray200}`, boxSizing: 'border-box'}}>
                            <MessageTextField
                                chatType={chat ? chat.chatType : (chatMembers.length === 2 ? "USER" : "GROUP")}
                                chatId={props.chatId}
                                chatMembers={chatMembers}
                                clearQuery={props.clearQuery}
                                setSelectedChat={props.setSelectedChat}
                            />
                        </div>
                    </Container>

                    {!isMobile && <div style={{ borderLeft: `1px solid ${colors.gray200}`, height: '100%', width: "30%", display: "flex", flexDirection: "column" }}>
                        {chatMembers.map((member, i) =>
                            <ChatMemberItem user={member} userId={user.id} key={i} />
                        )}
                    </div>}
                </Container>
            </>
            :
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", margin: "auto", padding: "0 10%", textAlign: "center" }}>
                <H1 display={"xl"}>No chat selected.</H1>
            </div>
        }
    </Container>
}

export default MessageChatWindow;