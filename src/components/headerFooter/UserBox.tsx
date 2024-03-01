import React, {useState} from "react";
import {Popover} from "react-tiny-popover";
import {UserModel} from "../../slices/user";
import {useAppDispatch, AppDispatch} from "../../store";
import styled from "@emotion/styled";
import {MintParagraph} from "../Typography/Typography";
import Image from "next/image";
import UserIcon from "../stuff/UserIcon";
import {colors} from "../../styles/colors";
import {NextRouter, useRouter} from "next/router";
import { getCookie} from "cookies-next";
import { makeAuthedApiRequest } from "../../utils/api/apiHelper";
import { useSession } from "@pylonlending/react-elements";

import { LOGOUT_USER } from "../../constants";

const NavContainer = styled.div`
    max-height: 68px;
    min-height: 68px;
    display: flex;
    align-items: center;
    padding: 0 16px;
    
    border: 1px solid #EAEAEA;
    border-radius: 20px;
    cursor: pointer;
`;

const DropdownContainer = styled.div`
    background-color: ${colors.background};
    border: 1px solid #EAEAEA;
    border-radius: 8px;
    padding: 8px 0;
`;

export type UserBoxProps = {
    user: UserModel
}

type DropdownMenuItemType = {
    text: string;
    onClick: (event?: any) => void;
}

const DropdownMenuItem = styled.div`
    padding: 12px 48px 12px 24px;
    
    &:hover {
        background-color: ${colors.gray100};
        z-index: -1;
    }
`;

export type DropdownMenuProps = {
    router: NextRouter
}

const logout = async (router: NextRouter, destroy: Function, dispatch: AppDispatch) => {
    try {
        await makeAuthedApiRequest({method: 'post', urlExtension: '/v1/user/logout'})
        destroy();
        if (window.Intercom) {
            window.Intercom('shutdown');
        }
        dispatch({type: LOGOUT_USER});
        router.push('/login');
    } catch (e) {
        console.log(e);
    }
    
}

const DropdownMenu: React.FC<DropdownMenuProps> = (props: DropdownMenuProps) => {

    const { destroy } = useSession();
    const dispatch = useAppDispatch();
    const menuItems: DropdownMenuItemType[] = [
        { text: "Settings", onClick: () => props.router.push("/settings") },
        { text: "Logout", onClick: () => logout(props.router, destroy, dispatch) }
    ];

    return <DropdownContainer>
        {menuItems.map((item: DropdownMenuItemType, i) => {
            return <DropdownMenuItem onClick={item.onClick} key={i}>
                <MintParagraph size={"14"} weight={"regular"} >{item.text}</MintParagraph>
            </DropdownMenuItem>
        })}
    </DropdownContainer>
}

const UserBox: React.FC<UserBoxProps> = (props: UserBoxProps) => {
    const router = useRouter();

    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const displayName = props.user.firstName && props.user.lastName ? `${props.user.firstName} ${props.user.lastName}` : props.user.email;


    return <Popover
        isOpen={isPopoverOpen}
        positions={['bottom']} // preferred positions by priority
        align={'end'}
        padding={8}
        content={<DropdownMenu router={router} />}
        onClickOutside={() => setIsPopoverOpen(false)}
    >
        <NavContainer onClick={() => setIsPopoverOpen(!isPopoverOpen)}>
            <MintParagraph size={"16"} weight={"medium"}>{displayName}</MintParagraph>
            <div style={{height: "44px", width: "44px", margin: "0 4px 0 16px"}}>
                <UserIcon user={props.user} showUserInfo={false} />
            </div>
            <Image src="/icon_svg/arrowdown.svg" alt="dropdown arrow" height={24} width={24} />
        </NavContainer>
    </Popover>
}

export default UserBox;