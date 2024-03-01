import React from "react";
import {EventModel} from "../../slices/events";
import TimeAgo from 'javascript-time-ago'

// English.
import en from 'javascript-time-ago/locale/en'
import styled from "@emotion/styled";
import { H5, P4 } from "../Typography/OldTypography";
import dayjs from "dayjs";
TimeAgo.addLocale(en)

const Container = styled.div`
`;


const EventCardContainer = styled.div`
    width: 350px;
    height: 150px;
    border: 1px solid #202626;
    margin: 32px;
    padding: 16px;
`;

const EventCard = (props: {event: EventModel}) => {
    const timeAgo = new TimeAgo('en-US')
    return <EventCardContainer>
        <H5>{props.event.propertyId}</H5>
        <P4>Start: {dayjs(props.event.start, 'YYYY-MM-DD h:mma').toString()}</P4>
        <P4>End: {dayjs(props.event.end, 'YYYY-MM-DD h:mma').toString()}</P4>
        <P4>{timeAgo.format(new Date(props.event.start))}</P4>
    </EventCardContainer>
}

const ScheduledTab: React.FC<{events: EventModel[]}> = (props: {events: EventModel[]}) => {

    console.log(props);
    return <Container>
        {props.events.map((event, i) => <EventCard event={event} key={i} />)}
    </Container>
}

export default ScheduledTab;