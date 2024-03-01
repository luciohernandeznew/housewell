import React, {useLayoutEffect, useRef, useState} from "react";
import {UserModel} from "../../slices/user";
import styled from "@emotion/styled";
import {colors} from "../../styles/oldColors";
import {Popover} from "react-tiny-popover";
import {SanitizedUser} from "../messages/MessageBox";
import {P2, P4} from "../Typography/OldTypography";
import Image from "next/image";

const IconContainer = styled.div<{color?: string}>`
    background-color: ${(props) => props.color ? props.color : "#c4c4c4"};
    color: ${colors.typographyBlack};
    border-radius: 100%;
    position: relative;
    
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`;

// todo: font update
const IconText = styled.span<{fontSize: string}>`
    font-size: ${(props) => props.fontSize};
    font-weight: bold;
    font-family: Arial;
`;

const PopoverContainer = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid ${colors.gray300};
    background: white;
    border-radius: 4px;
    padding: 8px;
`;

const UserInfoPopover = (props: { user: UserModel | SanitizedUser }) => {
    const user = props.user;

    return <PopoverContainer>
        <P2>First Name:</P2>
        <P4>{user.firstName}</P4>
    </PopoverContainer>
}

export type UserIconProps = {
    user: UserModel | SanitizedUser,
    showUserInfo: boolean
    height?: string,
    width?: string,
}

export const UserIcon: React.FC<UserIconProps> = (props: UserIconProps) => {
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [fontSize, setFontSize] = useState("24px");

    const containerRef = useRef<HTMLDivElement | null>(null);
    useLayoutEffect(() => {
        if (containerRef.current && containerRef.current.parentElement) {
            const containerWidth = containerRef.current.parentElement.clientWidth;
            const containerHeight = containerRef.current.parentElement.clientHeight;
            const newSize = Math.min(containerWidth, containerHeight) * 0.5;
            setFontSize(`${newSize}px`);
        }
    }, []);

    const user = props.user;
    const name = user.firstName && user.lastName ? user.firstName.charAt(0) + user.lastName.charAt(0) : user.id.substring(0,2);
    return <div ref={containerRef} style={{ width: props.width || "100%", height: props.height || "100%" }}>
        <Popover
            isOpen={isPopoverOpen}
            positions={['bottom']} // preferred positions by priority
            align={'center'}
            padding={8}
            content={<UserInfoPopover user={user} />}
            onClickOutside={() => setIsPopoverOpen(false)}
        >
            <IconContainer color={user.color} onClick={props.showUserInfo ? () => setIsPopoverOpen(!isPopoverOpen) : () => null}>
                { user.profilePictureUrl ?
                    <Image fill src={user.profilePictureUrl} alt={"Profile Picture"} style={{objectFit: "cover", borderRadius: "9999px"}} />
                    :
                    <IconText fontSize={fontSize}>{name}</IconText>
                }
            </IconContainer>
        </Popover>
    </div>
}

export default UserIcon;