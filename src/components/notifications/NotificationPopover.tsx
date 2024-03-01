import React from "react";
import styled from "@emotion/styled";
import {NotificationModel} from "../../slices/notifications";
import TimeAgo from 'javascript-time-ago'

// English.
import en from 'javascript-time-ago/locale/en'
import {NextRouter, useRouter} from "next/router";
import {makeAuthedApiRequest} from "../../utils/api/apiHelper";
import {colors} from "../../styles/colors";
import {MintParagraph} from "../Typography/Typography";

TimeAgo.addDefaultLocale(en)

const PopoverContainer = styled.div`
    display: flex;
    flex-direction: column;
    background: white;
    border-radius: 4px;
    width: 30vw;
    max-height: 40vh;
    
    border-radius: 8px;
    box-shadow: 0px 10px 30px 0px rgba(0, 0, 0, 0.15);
    overflow: auto;
`;

const TileContainer = styled.div`
    display: flex;
    padding: 16px;
    justify-content: space-between;
    align-items: stretch;
    border-bottom: 1px solid ${colors.gray100};
    cursor: pointer;
    
    &:hover {
        background-color: ${colors.gray100};
    }
`;

const AlertBadge = styled.div`
  width: 16px;
  height: 16px;
  background-color: ${colors.orange1000};
  border-radius: 100%;
  display: inline-block;
  position: absolute;
  right: 0;
  top: 0;
`;

export type NotificationPopoverProps = {
    notifications: NotificationModel[]
}

export async function redirect(notifId: string, notifType: 'MSG' | 'OFFER' | 'EVENT' | 'SYS', objectId: string, router: NextRouter) {
    const response = await makeAuthedApiRequest({
        method: 'post',
        urlExtension: '/v1/notification/readNotification',
        data: {id: notifId}
    });

    switch (notifType) {
        case "EVENT":
            // todo: link to the actual event in the future - will have to refactor objectId to !not! be property id
            router.push({pathname: '/property-admin', query: {propertyId: objectId},});
            break;
        case "MSG":
            router.push({pathname: '/messages', query: {chatId: objectId},});
            break;
        case "OFFER":
            router.push({pathname: '/offer-review', query: {offerId: objectId},});
            break;
        case "SYS":
            break;
    }
}

export const NotificationTile = (props: {style?: React.CSSProperties, notif: NotificationModel, onClick?: (event?: any) => void;}) => {
    const notif = props.notif;
    const timeAgo = new TimeAgo('en-US')

    return <TileContainer onClick={props.onClick} style={props.style}>
        <div style={{display: "flex", flexDirection: "column", justifyContent: "center", width: "100%"}}>
            <div style={{display: "flex"}}>
                {/* todo: icon based off of type */}
                <MintParagraph size={"16"} weight={"medium"} style={notif.read ? {} : {color: colors.orange1000}}>{notif.title}</MintParagraph>
                <div style={{width: "72px", position: "relative", display: "flex", marginLeft: "auto", justifyContent: "end"}}>
                    {!notif.read && <AlertBadge />}
                </div>
            </div>
            <MintParagraph size={"14"} weight={"medium"} style={{ color: colors.gray700, padding: "8px 0" }} > {notif.description}</MintParagraph>
            <MintParagraph size={"12"} weight={"medium"} style={{ fontSize: "12px", color: colors.gray900 }}>
                {timeAgo.format(new Date(notif.timestamp))}
            </MintParagraph>
        </div>
    </TileContainer>
}

const NotificationPopover: React.FC<NotificationPopoverProps> = (props: NotificationPopoverProps) => {
    const router = useRouter();

    return (<PopoverContainer>
            {props.notifications.length > 0 ? props.notifications
                .slice()
                .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
                .map((notif, i) => {
                    return <NotificationTile notif={notif} key={i} onClick={() => redirect(notif.id, notif.notifType, notif.objectId, router)} />
                }) : <div style={{ padding: "32px 0", display: "flex", justifyContent: "center" }}>
                <MintParagraph style={{color:colors.gray900}} size={"24"} weight={"medium"}>No Notifications</MintParagraph>
            </div>
            }
        </PopoverContainer>
    );
}

export default NotificationPopover;