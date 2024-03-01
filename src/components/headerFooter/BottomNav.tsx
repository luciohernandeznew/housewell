import React from "react";
import styled from "@emotion/styled";
import SecondaryButton from "../buttons/SecondaryButton";
import { useRouter } from 'next/router';
import { useDevice } from "../../contexts/DeviceContext";


type StylingProps = {
    height: string;
}

const NavContainer = styled.div<StylingProps>`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: ${props => props.height};
    max-width: 768px;
    width:100%;
    padding: 0 24px; 
    box-sizing: border-box; 
`;


export type BottomNavProps = {
    nextStep?: string;
    prevStep?: string;
    nextOnClick?: (event?: any) => void;
    prevOnClick?: (event?: any) => void;
    disabledRight?: boolean;
    removeBorder?: boolean;
}



const BottomNav = ({nextStep, prevStep, nextOnClick, prevOnClick, disabledRight, removeBorder}: BottomNavProps) => {
    const router = useRouter();
    const { isMobile } = useDevice();
    const prevButtonClick = () => {
        prevOnClick ? prevOnClick() : null;
        prevStep ? router.push(prevStep) : null;
    };
    const nextButtonClick = () => {
        nextOnClick ? nextOnClick() : null;
        nextStep ? router.push(nextStep) : null;
    };

    return (
        <div style={{width:"100%", display:"flex", flexDirection:"column", alignItems:"center",  borderTop: removeBorder ? 'none' : `1px solid rgba(0, 0, 0, 0.07)`}}>
            <NavContainer height={isMobile ? '80px' : "100px"}>
                    <SecondaryButton size={isMobile ? "medium" : "large"} text={"Back"} isLight onClick={prevButtonClick}/>
                    <SecondaryButton size={isMobile ? "medium" : "large"} text={"Next"} disabled={disabledRight} hasArrow onClick={nextButtonClick}/>
            </NavContainer>
        </div>
    )
}

export default BottomNav;