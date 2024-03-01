import styled from '@emotion/styled'
import {ReactNode} from 'react'
import AuthNav from '../headerFooter/AuthNav';
import BottomNav from '../headerFooter/BottomNav';
import { useDevice } from "../../contexts/DeviceContext";



const StyledContentDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content: flex-start;
    width: 100%;
    position: relative;
    box-sizing: border-box;
    padding-left: 24px;
    padding-right: 24px;
`;

const TopNavbar = styled(AuthNav)`
`
type ParentProps = {
    heightRemoval: number;
}

// todo height calc will change because mobile navs will be of diff sizes
const ContentParent = styled.div<ParentProps>`
    overflow: auto;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    height: calc(100vh - ${props => 200 - props.heightRemoval}px);
    position: relative;
    
`

const StyledBottomNav = styled(BottomNav)`

`;


type PageLayoutProps = {
    children: ReactNode;
    prevStep?: string;
    nextStep?: string;
    disabledRight?: boolean;
    maxWidth?: string;
    removeBottomNav?: boolean;
    nextOnClick?: (event?: any) => void;
    prevOnClick?: (event?: any) => void;
    removeBorder?: boolean;
}
const OnboardingScreenFrame: React.FC<PageLayoutProps> = ({ children, prevStep, nextStep, disabledRight, maxWidth, removeBottomNav, nextOnClick, prevOnClick, removeBorder })  => {
    const { isMobile } = useDevice();
    return (
      <div style={{display:"flex", flexDirection:"column"}}>
        <TopNavbar/>
        <ContentParent heightRemoval={isMobile ? removeBottomNav ? 125 : 55 : removeBottomNav ? 100 : 0}>
            <StyledContentDiv style={{maxWidth: maxWidth || "768px" }}>
                <div style={{height:"50px"}}></div>
                {children}
            </StyledContentDiv>
        </ContentParent>
        {removeBottomNav ? null : 
        <StyledBottomNav prevStep={prevStep || ""} nextStep={nextStep || ""} nextOnClick={nextOnClick} prevOnClick={prevOnClick} disabledRight={disabledRight} removeBorder={removeBorder}/>
        }
      </div>
    )
  }



export default OnboardingScreenFrame;