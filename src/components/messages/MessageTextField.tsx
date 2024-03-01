import React, {useState} from "react";
import {sendMessage} from "../../slices/messages";
import {useAppDispatch} from "../../store";
import styled from "@emotion/styled";
import {colors} from "../../styles/colors";
import Image from "next/image";
import {UserModel} from "../../slices/user";
import {makeAuthedApiRequest} from "../../utils/api/apiHelper";
import {fetchChats} from "../../slices/chats";

const Container = styled.div`
    width: 100%;
    position: relative;
    display: flex;
    align-items: center;
    
    & > img {
        position: absolute;
        right: 20px;
        cursor: pointer;
        pointer-events: auto;
        z-index: 4;
        
        &:hover {
            fill: red;
        }
    }
`

const StyledInput = styled.textarea`
		width: 100%;
		padding: 12px 72px 12px 18px;
		border: 1px solid ${colors.gray400};
		border-radius: 8px;
        background-color: transparent;
        position: relative;
        z-index: 0;
		
		color: ${colors.gray900};
		font-family: 'Mint Grotesk';
		font-weight: 400;
		font-size: 16px;
		line-height: 20px;
		word-break: break-word;
		resize: none;
        overflow: auto; 
		
		&:focus {
			outline: none;
			border: 2px solid ${colors.darkgreen400};
			padding: 11px 71px 11px 17px;
		}
		
		::placeholder {
			color: ${colors.gray500};
		}
		
		:-ms-input-placeholder { /* Internet Explorer 10-11 */
		    color: ${colors.gray500};
		}
		
		::-ms-input-placeholder { /* Microsoft Edge */
		    color: ${colors.gray500};
		}
`;

export type MessageTextFieldProps = {
    chatType: 'USER' | 'GROUP' | 'PROPERTY' | 'PHONE',
    chatId?: string,
    chatMembers: UserModel[],
    clearQuery: () => void,
    setSelectedChat: (chatId: string) => void,
}

const MessageTextField: React.FC<MessageTextFieldProps> = (props) => {
    const dispatch = useAppDispatch();

    const [text, setText] = useState('');

    const handleSubmit = async () => {
        if (text == "") return;

        let chatId = props.chatId;
        if (!chatId) {
            const response = await makeAuthedApiRequest({
                method: 'post',
                urlExtension: '/v1/chat/createChat',
                data: {
                    name: props.chatMembers.map((user) => `${user.firstName} ${user.lastName}`).join(', '),
                    chatType: props.chatType,
                    userIds: props.chatMembers.map((member) => member.id)
                },
                isServer: false
            }); //todo: handle error

            chatId = response.data.id;
        }

        if (!props.chatId && chatId) {
            dispatch(fetchChats()); // todo: remove line & add chatwithmembers to redux store from response
            props.setSelectedChat(chatId);
        }

        dispatch(sendMessage({ text, chatType: props.chatType, chatId: chatId as string}));
        // todo: actually verify message was successfully sent before clearing
        setText("");
    }

    return (<Container>
        <StyledInput
            onChange={(e) => { setText(e.target.value) }}
            placeholder={"Enter your message"}
            value={text}
        />
        <Image src="/icon_svg/send_icon.svg" alt="send icon" width={33} height={33} onClick={() => handleSubmit()} />
    </Container>)
}

export default MessageTextField;