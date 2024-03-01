import React from "react";
import styled from "@emotion/styled";

// todo: color, fonts
const BadgeContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 6px 12px;
    
    width: 44px;
    height: 16px;
    
    background: #E0650D;
    border-radius: 38px;
    
    flex: none;
    order: 1;
    flex-grow: 0;
    
    & > span {
        font-style: normal;
        font-weight: 700;
        font-size: 12px;
        line-height: 115%;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: #FFFFFF;
    }
`;

const NotifBadge: React.FC<{num: number}> = (props: {num: number}) => {
    return <BadgeContainer>
        <span>{props.num} NEW</span>
    </BadgeContainer>
}

export default NotifBadge;

