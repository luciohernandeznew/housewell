import React, { useEffect, useState } from "react";
import useWebSocket from 'react-use-websocket';
import styled from "@emotion/styled";
import { v4 as uuidv4 } from 'uuid';
import { P2 } from "../Typography/OldTypography";

const ParentContainer = styled.div`
    position: relative;
    overflow-y: auto;
    height: 100%;
    width: 100%;
`;
const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content: flex-start;
    top: 0;
    width: 100%;
    height: 100%;
`;

const InputContainer = styled.div`
    position: sticky;
    bottom: 0;
    background-color: white;
    height: 60px;
    z-index: 100;
`;

const WS_URL = 'ws://localhost:31000';

type DisplayMessageObj = { content: string; isUser: boolean };
interface BotMessagingProps extends React.HTMLProps<HTMLDivElement> {
    minHeight?: string;
}

const BotMessaging: React.FC<BotMessagingProps> = ({minHeight}) => {
    const [messageHistory, setMessageHistory] = useState<DisplayMessageObj[]>([]);
    const [inputMessage, setInputMessage] = useState('');
    const [clientId] = useState(uuidv4());
    const { sendJsonMessage, lastJsonMessage } = useWebSocket(WS_URL, {
        onOpen: (event) => {
            sendJsonMessage({ type: 'register', clientId });
        },
        shouldReconnect: (closeEvent) => false,
    });
  
  
    useEffect(() => {
        if (lastJsonMessage !== null) {
          const messageObj = lastJsonMessage as { content: string; isEndOfStream?: boolean };
      
          if (messageObj.isEndOfStream) {
          } else {
            // Concatenate the token to the last message in the history
            setMessageHistory((prev) => {
                const newMessage = { content: prev[prev.length - 1].content + messageObj.content, isUser: false };
                const newArray = prev.map((element, index) => {
                  if (index === prev.length - 1) {
                    return newMessage;
                  }
                  return element;
                });
                return newArray;
              });
          }
        }
      }, [lastJsonMessage]);
  
    const handleInputMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setInputMessage(event.target.value);
    };
  
    const handleSendMessage = () => {
        sendJsonMessage({ type: 'message', content: inputMessage, clientId });
        setMessageHistory((prev) => {
            const updatedHistory = [...prev];
            updatedHistory.push({ content: inputMessage + '\u000A', isUser: true });
            updatedHistory.push({ content: '', isUser: false });
            return updatedHistory;
        });
        setInputMessage('');

    };
  
    return (
        <ParentContainer>
            <div style={{minHeight}}>
          {messageHistory.map((message, idx) => (
            <TextContainer style={{backgroundColor: message.isUser ? "#FFF3EA" : "#FFFFFF"}} key={idx}>
                <P2 style={{textAlign: message.isUser ? "right": "left", marginTop:"20px", marginBottom:"20px"}} key={idx}>{message.content}</P2>
                <br/>
            </TextContainer>
          ))}
          </div>
          <InputContainer>
            <input value={inputMessage} onChange={handleInputMessageChange} />
            <button onClick={handleSendMessage}>Send</button>
          </InputContainer>
        </ParentContainer>
    );
  };
  
  export default BotMessaging;
  
