import React, { useEffect, useState, useRef } from "react";
import useWebSocket from 'react-use-websocket';
import styled from "@emotion/styled";
import { v4 as uuidv4 } from 'uuid';
import { colors } from "../../styles/colors";
import { H4, MintParagraph } from "../Typography/Typography";
import StyledMessageInput from '../boxes/StyledMessageInput';


const GrowSVG = styled('svg')`
    bottom: 50px;
    right: 50px;
    position: absolute;
    &:hover {
        transition: all 0.2s ease-in-out;
        transform: scale(1.2);
  }
`;

const ExitSVG = styled('svg')`
    top: 10px;
    right: 12px;
    position: absolute;
    z-index: 100;
    &:hover {
        transition: all 0.2s ease-in-out;
        transform: scale(1.2);
  }
`;
const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: left;
    padding: 0px 20px;
    box-sizing: border-box;
    justify-content: flex-start;
    top: 0;
    width: 100%;
    height: 100%;
`;

const Container = styled.div`
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    width: 500px;
    position: absolute;
    z-index: 1;
    top: 120px;
    bottom: 50px;
    right: 50px;
    border-radius: 15px;
    border: 1px solid rgba(0, 0, 0, 0.07);
    background-color: #FFFFFF;
    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.1); // added box-shadow
`;
const TextColumnContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 88px;
    position: relative;
    margin-bottom: 84px;
    align-items: left;
    justify-content: flex-start;
    overflow-y: auto;
    background-color: #FFFFFF;
`;

const MessagingHeaderDiv = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    flex-direction: row;
    box-sizing: border-box;
    background-color: white;
    border-top-left-radius: 25px;
    border-top-right-radius: 25px;
    top: 0;
    width: 100%;
    height: 88px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.07);
    padding: 0px 24px;
`
const InputContainer = styled.div`
    class-name: input-container;
    display: flex;
    border-top: 1px solid rgba(0, 0, 0, 0.07);
    position: absolute;
    bottom: 0;
    background-color: white;
    height: 84px;
    z-index: 100;
    width: 100%;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
`;
const MessageParentDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 0px 24px;
`;


type DisplayMessageObj = { content: string; isUser: boolean };
const WS_URL = 'ws://localhost:31000';


const MessageBoxSidebar: React.FC = () => {
    const bottomRef = useRef<HTMLDivElement>(null);
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
      useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      }, [messageHistory]);

  
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
    const [isExpanded, setIsExpanded] = React.useState(false);
    return !isExpanded ? 
    <GrowSVG
        onClick={() => setIsExpanded(true)}
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        >
        <circle cx="20" cy="20" r="18.5" fill="#1B311C" stroke="#1B311C" strokeWidth="3" />
        <path d="M20.6665 25.3332C20.6665 25.7014 20.368 25.9998 19.9998 25.9998C19.6316 25.9998 19.3332 25.7014 19.3332 25.3332M20.6665 25.3332C20.6665 24.965 20.368 24.6665 19.9998 24.6665C19.6316 24.6665 19.3332 24.965 19.3332 25.3332M20.6665 25.3332H19.3332M17.3332 17.9998V17.3332C17.3332 15.8604 18.5271 14.6665 19.9998 14.6665C21.4726 14.6665 22.6665 15.8604 22.6665 17.3332V17.4949C22.6665 18.2451 22.3685 18.9645 21.8381 19.4949L19.9998 21.3332M33.3332 19.9998C33.3332 27.3636 27.3636 33.3332 19.9998 33.3332C18.4807 33.3332 17.1779 33.1168 15.9682 32.6841C14.8249 32.2751 14.2532 32.0706 14.0339 32.019C12.01 31.5431 11.1704 32.9302 9.42604 33.2208C8.56928 33.3635 7.80696 32.6621 7.87806 31.7964C7.94022 31.0395 8.46369 30.3237 8.67256 29.5968C9.1068 28.0858 8.51756 26.9401 7.89503 25.5962C7.1067 23.8945 6.6665 21.9985 6.6665 19.9998C6.6665 12.636 12.636 6.6665 19.9998 6.6665C27.3636 6.6665 33.3332 12.636 33.3332 19.9998Z" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </GrowSVG> : 
    <Container>
            <ExitSVG
                    onClick={() => setIsExpanded(false)}
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    >
                   <path d="M19.5 6.5L6.5 19.5" stroke="#0E150E" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M6.5 6.5L19.5 19.5" stroke="#0E150E" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                    </ExitSVG>
            <MessagingHeaderDiv>
                <H4 style={{ color:colors.gray1000, width:"300px"}}>Ask a Question</H4>
            </MessagingHeaderDiv>
            <TextColumnContainer>
                {messageHistory.map((message, idx) => (
                <TextContainer style={{backgroundColor: message.isUser ? colors.brightgreen300 : "#FFFFFF"}} key={idx}>
                    <MintParagraph 
                        weight="regular" 
                        size="18" 
                        style={{textAlign: message.isUser ? "right": "left", marginTop: message.isUser ? "20px" : "0", marginBottom: message.isUser ? "0" : "020px"}} 
                        key={idx}
                    >
                        {message.content.split('\n').map((line, i) => (
                            <span key={i}>
                                {line}
                                <br />
                            </span>
                        ))}
                    </MintParagraph>
                </TextContainer>
                ))}
                <div ref={bottomRef} />
            </TextColumnContainer>
            
            <InputContainer>
            <MessageParentDiv>
                <StyledMessageInput value={inputMessage} onChange={handleInputMessageChange} onSend={handleSendMessage}/>
                </MessageParentDiv>
            </InputContainer>
    </Container>
}

export default MessageBoxSidebar;

