// @ts-nocheck
import React from "react";
import {MessageModel} from "../../slices/messages";
import {makeAuthedApiRequest} from "../../utils/api/apiHelper";
import MessageBoxSidebar from "./MessageBoxSidebar";
import styled from "@emotion/styled";
import MessageChatWindow from "./MessageChatWindow";
import {withRouter} from "next/router";
import { H4 } from "../Typography/Typography";
import { colors } from "../../styles/colors";
import { connect } from 'react-redux';
import { compose } from 'redux';
import {ChatWithMembersModel, fetchChats} from "../../slices/chats";
import {RootState} from "../../store";
import { DeviceContext } from "../../contexts/DeviceContext";
import SecondaryButton from "../buttons/SecondaryButton";

// todo: move
export type SanitizedUser = {
    id: string,
    propertyId?: string,
    userType?: 'consumer' | 'agent' | 'admin',
    firstName?: string
    lastName?: string
    profilePictureUrl?: string
    color: string
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`;

export type MessageQueryParams = {
    userId?: string,
    groupId?: string
}

// todo: refactor/move
export type MessageChatData = {
    id: string,
    chat: ChatWithMembersModel,
    recentMessage?: MessageModel,
}

type MessageBoxState = {
    chatData: MessageChatData[],
    selectedChat?: string,
    query: MessageQueryParams,
    showChatWindow: boolean
};

export type MessageBoxProps = {
    messages: MessageModel[],
    chats: ChatWithMembersModel[]
}

class MessageBox extends React.Component<MessageBoxProps, MessageBoxState> {
    static contextType? = DeviceContext; 
    
    constructor(props: MessageBoxProps) {
        super(props);
        const { chatId, userId, groupId } = this.props.router.query;

        this.state = {
            chatData: [],
            showChatWindow: false,
            selectedChat: chatId as string,
            query: { userId, groupId }
        };

        this.setSelectedChat = this.setSelectedChat.bind(this);
        this.createNewChat = this.createNewChat.bind(this);
        this.clearQuery = this.clearQuery.bind(this);
    }

    setSelectedChat(chatId: string) {
        this.props.router.push({ query: { chatId: chatId }});
        this.setState({ selectedChat: chatId })
    }

    clearQuery() {
        this.setState({ query: {} })
    }
    toggleChatWindow = () => {
        this.setState((prevState) => ({ showChatWindow: !prevState.showChatWindow }));
    }

    async createNewChat() {
        const userId = window.prompt('Please enter your UserId:');

        // todo: error if they input themselves

        if (!userId) {
            window.alert('Please input a valid UserId');
        } else if (this.state.chatData.some(chat => (chat.id === userId))) {
            window.alert('A chat with this UserId already exists');
        } else {
            const response = await makeAuthedApiRequest({
                method: 'post',
                urlExtension: '/v1/user/getUser',
                data: {userId: userId},
                isServer: false
            });
            if (!response.data) {
                console.error(response);
                window.alert('Please input a valid UserId');
            }

            // this.setState({
            //     selectedChat: userId,
            //     chatData: [
            //         ... this.state.chatData,
            //         { id: userId, metadata: { user: response.data.sanitized as SanitizedUser } }
            //     ]
            // })
            this.props.router.push({ query: { chatId: userId }});
        }
    }

    async genChatData() {
        if (!this.props.chats) {
            this.setState({ chatData: [] });
            return;
        }
    
        const mostRecentMessages = Object.values(this.props.messages.reduce((acc, message) => {
            const chatId = message.chatId;
            let curr = acc[chatId];
            if (!curr || message.sendTime > curr.sendTime) {
                acc[chatId] = message;
            }
            return acc;
        }, {}));
    
        let chatData = mostRecentMessages.map((message) => {
            const chat = this.props.chats.find((chat) => chat.id === message.chatId);
            if (!chat) { // handle this error better
                console.error(`Could not find matching chat for message: ${JSON.stringify(message)}`);
                this.props.fetchChats();
                this.setState({ chatData: [] });
                return null;
            }
            return {
                id: chat.id,
                chat: chat,
                recentMessage: message,
            };
        }).filter(Boolean);
    
        chatData = chatData.sort((a, b) => {
            return new Date(b.recentMessage.sendTime) - new Date(a.recentMessage.sendTime);
        });
    
        this.setState({ chatData });
    }
    async componentDidMount() {
        await this.genChatData();
    }

    async componentDidUpdate(prevProps: MessageBoxProps, prevState: MessageBoxState) {
        if (prevProps.messages !== this.props.messages || prevProps.chats !== this.props.chats) {
            await this.genChatData();
        }
    }

    render() {
        const { isMobile } = this.context;
        const windowMessages = this.props.messages
            .filter((message) => message.chatId === this.state.selectedChat || message.userId === this.state.selectedChat);

        return <Container>
            <H4 style={{ margin: "24px" }}>Messages</H4>
            {/* todo: calculate height better */}
            <div style={{ display: "flex", height: "calc(100% - 84px)", borderTop: `1px solid ${colors.gray200}` }}>
                {isMobile ? (
                    this.state.showChatWindow ? (
                        <MessageChatWindow
                            toggleChatWindow={this.toggleChatWindow}
                            messages={windowMessages}
                            chatId={this.state.selectedChat}
                            query={this.state.query}
                            clearQuery={this.clearQuery}
                            setSelectedChat={this.setSelectedChat}
                        />
                    ) : (
                        <MessageBoxSidebar
                            chatData={this.state.chatData}
                            selectedChat={this.state.selectedChat}
                            setSelectedChat={this.setSelectedChat}
                            createNewChat={this.createNewChat}
                            toggleChatWindow={this.toggleChatWindow}
                        />
                    )
                ): <> <MessageBoxSidebar
                    chatData={this.state.chatData}
                    selectedChat={this.state.selectedChat}
                    setSelectedChat={this.setSelectedChat}
                    createNewChat={this.createNewChat}
                />
                <MessageChatWindow
                    messages={windowMessages}
                    chatId={this.state.selectedChat}
                    query={this.state.query}
                    clearQuery={this.clearQuery}
                    setSelectedChat={this.setSelectedChat}
                /></>}
            </div>
        </Container>
    }
}

export default compose(
    withRouter,
    connect<{}, { fetchChats: typeof fetchChats }, {}, RootState>(null, { fetchChats })
)(MessageBox);