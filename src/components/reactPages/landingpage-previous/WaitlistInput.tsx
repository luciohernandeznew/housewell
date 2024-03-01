import React from "react";
import styled from "@emotion/styled";
import {colors} from "../../../styles/oldColors";

const ContentFrame = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    height: 82px;
    width: 100%;
    color: white;
    text-align: center;
`;

const WaitlistBlock = styled.div`
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 80px;
    background: #FFFFFF;
    
    border: 1px solid #E0E0E0;
    border-radius: 12px;
`;

const WaitlistEmailInput = styled.input`
    position: absolute;
    left: 24px;
    top: 24px;
    bottom: 24px;
    font-size: 24px;
    height: 32px;
    border: none;
`;

const StyledSecondaryButton = styled.button`
    background-color: ${colors.mainOrange};
    color: ${colors.background};
    border-radius: 5px;
    
    font-size: 16px;
    font-weight: 700;
    
    width: 195px;
    height: 56px;


    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
    &:hover {
        color: ${colors.background};
        background-color: ${colors.darkOrange};
    }
    
    &:active {
        color: ${colors.background};
        background-color: ${colors.darkerOrange};
    }
    
    &:disabled {
        color: ${colors.gray600};
        background-color: ${colors.gray300};
        border: 1px solid ${colors.gray600};
    }
`;

type WaitlistInputProps = {
    handleClick: () => void;
}

const WaitlistInput: React.FC<WaitlistInputProps> = (props) => {
    return (<ContentFrame>
        <WaitlistBlock>
            <WaitlistEmailInput type="text" placeholder="Enter your email"/>
            <StyledSecondaryButton style={{position: "absolute", right: "12px", bottom: "12px"}} onClick={props.handleClick}>
                <span style={{fontSize: "16px"}}>JOIN WAITLIST</span>
            </StyledSecondaryButton>
        </WaitlistBlock>
    </ContentFrame>);
}

export default WaitlistInput;