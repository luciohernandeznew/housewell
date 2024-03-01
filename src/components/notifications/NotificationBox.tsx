import React, {useEffect, useState} from "react";
import Image from "next/image";
import {fetchNotifications, selectNonMsgNotifications, selectUnreadNonMsgNotifications, readAllNonMessageNotifications} from "../../slices/notifications";
import {useAppDispatch, useAppSelector} from "../../store";
import {Popover} from "react-tiny-popover";
import styled from "@emotion/styled";
import NotificationPopover from "./NotificationPopover";
import {getCookie} from "cookies-next";
import {colors} from "../../styles/colors";

const IconContainer = styled.div<{active: boolean}>`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    height: 48px;
    width: 48px;
    border-radius: 48px;
    ${props => props.active && `background-color: ${colors.gray200};`}
`;

const NotificationBox: React.FC = () => {
    const notifs = useAppSelector(selectNonMsgNotifications);
    const unreadNonMessages = useAppSelector(selectUnreadNonMsgNotifications);
    const hasNotifs = unreadNonMessages.length > 0;
    const dispatch = useAppDispatch();



    const [isPopoverOpen, setIsPopoverOpen] = useState(false);

    const handleClickOutside = () => {
        setIsPopoverOpen(false);
    };
    const handleOpenNotifs = () => {
        setTimeout(() => {
            dispatch(readAllNonMessageNotifications());
        }, 4000);
    };
    

    return (<>
            {/*{hasNotifs && <span style={{ color: "#E0650D", padding: "16px", fontWeight: "bold" }}>{notifCount} Notification{notifCount > 1 && "s"}</span>}*/}
            {/* todo: if we keep this popover code, we will need to deal with overflow when too large */}
            <Popover
                isOpen={isPopoverOpen}
                positions={['bottom']} // preferred positions by priority
                align={'center'}
                padding={18}
                content={<NotificationPopover notifications={notifs}
                />}
                onClickOutside={handleClickOutside}
            >
                <IconContainer active={isPopoverOpen} onClick={() => {setIsPopoverOpen(!isPopoverOpen); handleOpenNotifs();}}>
                    <div style={{ position: "relative", height: "32px", width: "32px", cursor: "pointer" }}>
                        {/* todo: illegally using these icons replace lol */}
                        {
                            hasNotifs ?
                                <Image fill src="/icon_svg/bell_notif.svg" alt="me"/>
                                : <Image fill src="/icon_svg/bell.svg" alt="me"/>
                        }
                    </div>
                </IconContainer>
            </Popover>
        </>
    )
}

export default NotificationBox;