import styled from '@emotion/styled'
import React, {ReactNode, useState} from 'react'
import AuthNav from '../headerFooter/AuthNav';
import BottomNav from '../headerFooter/BottomNav';
import { H4 } from '../Typography/Typography'
import { colors } from '../../styles/colors'



const StyledContentDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content: flex-start;
    width: 100%;
    position: relative;
`;

type SVGProps = {
    rotation: number;
}

const TextAndButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`
const ExitSVG = styled.svg<SVGProps>`
    transition: transform 0.3s ease;
    transform: ${props => `rotate(${props.rotation}deg)`};
    transform-origin: center; 
    &:hover {
        transition: all 0.2s ease-in-out;
        transform: scale(1.2);
  }
`;

type PageLayoutProps = {
    children: ReactNode;
    title: string;
    maxWidth?: string;
}
const OnboardingScreenFrame: React.FC<PageLayoutProps> = ({ children, maxWidth, title })  => {
    const [isExpanded, setIsExpanded] = useState(true)
    const [rotation, setRotation] = useState(0);
    const handleClick = () => {
        setIsExpanded(!isExpanded);
        setRotation(rotation === 0 ? 45 : 0);
    };
    return (
      <div style={{display:"flex", flexDirection:"column"}}>
            <StyledContentDiv style={{maxWidth: maxWidth || "768px" }}>
                <div style={{height:"20px"}}/>
                <TextAndButtonContainer>
                    <H4>{title}</H4>
                    <ExitSVG
                        onClick={handleClick}
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        rotation={rotation}
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M19.5 6.5L6.5 19.5" stroke="#0E150E" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M6.5 6.5L19.5 19.5" stroke="#0E150E" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                    </ExitSVG>
                </TextAndButtonContainer>
                <div style={{border:`.5px solid ${colors.gray600}`, marginTop:"10px", marginBottom:"10px"}}/>
                {isExpanded && children}
            </StyledContentDiv>
      </div>
    )
  }



export default OnboardingScreenFrame;