import styled from "@emotion/styled";
import React, {ReactNode} from "react";
import {colors} from "../../styles/colors";
import {H4, H6} from "../Typography/Typography";

const Container = styled.div<{isMobile?: boolean}>`
    margin: 24px 0 32px 0;
    padding: ${props => props.isMobile ? '15px 15px 15px 15px;' : '32px 40px 24px 40px;'} 
    border-radius: 20px;
    border: 1px solid ${colors.gray200};
`;

export type SettingsContainerProps = {
    children: ReactNode,
    title: string,
    titleChildren?: ReactNode,
    style?: React.CSSProperties,
    isMobile?: boolean
}

const SettingsContainer: React.FC<SettingsContainerProps> = ({children, title, titleChildren, isMobile, style}) => {
    return <div>
        <div style={{display:"flex", justifyContent:'space-between', alignItems:'center'}}>
            {!isMobile ? <H4>{title}</H4> : <H6>{title}</H6>}
            {titleChildren}
        </div>
        <Container style={style} isMobile={isMobile}>
            {children}
        </Container>
    </div>
}

export default SettingsContainer;