import React from "react";
import styled from "@emotion/styled";
import BotMessaging from "../../messages/BotMessaging";


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  top: 0;
  width: 100%;
  height: 100%;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  height: 500px;
  margin-top: 120px;
  margin-bottom: 120px;
  border-radius: 8px;
  border: 1px solid #e6e6e6;
`;


const WS_URL = 'ws://localhost:31000';

const BotPage: React.FC = () => {
    return (
      <Container>
        <ContentContainer>
          <BotMessaging minHeight="440px"/>
        </ContentContainer>
      </Container>
    );
  };
  
  export default BotPage;
  

