import TimeAgo from "javascript-time-ago";
import en from 'javascript-time-ago/locale/en'
import styled from "@emotion/styled";
import { colors } from "../../../styles/colors";
import { EventModel, approveEvent, cancelEvent } from "../../../slices/events";
import {useAppDispatch} from "../../../store";
import {useState} from "react";
import { MintParagraph } from "../../Typography/Typography";
import SchedulingIconButton from "../../buttons/SchedulingIconButton";
import SecondaryButton from "../../buttons/SecondaryButton";
import { H4 } from "../../Typography/Typography";
import { useRouter } from "next/router";

import Image from 'next/image';
import dayjs from 'dayjs';
import BasicParentModal from "../modals/BasicParentModal";


TimeAgo.addLocale(en);

const EventCardContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: left;
    border-radius: 16px;
    border: 1px solid ${colors.gray400};
    padding: 24px;
`;

const RowDiv = styled.div`
    display: flex;
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: space-between !important;
`;
const IconDiv = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
`;

const EventCard = (props: {event: EventModel, needsApproval?: boolean}) => {
    const router = useRouter();
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const [isModalOpen, setModalOpen] = useState(false);
    const dispatch = useAppDispatch();
    const handleApproveEvent = () => {
        dispatch(approveEvent(props.event.id));
    };
    const handleCancelEvent = () => {
        dispatch(cancelEvent(props.event.id));
        setModalOpen(false)
    };
    const openModal = () => {
        setModalOpen(true);
    };
    const closeModal = () => {
        setModalOpen(false)
    }

    const start = dayjs(props.event.start).tz(userTimezone);
    const end = dayjs(props.event.end).tz(userTimezone);

    return (
      <EventCardContainer>
        <RowDiv>
          <MintParagraph size="20" weight="medium" style={{color:colors.gray900}}>
            {props.event.firstName + ' ' + props.event.lastName}
          </MintParagraph>
          <IconDiv>
            <SchedulingIconButton icon="/icon_svg/sms_edit.svg" onClick={() => { router.push({pathname: '/messages', query: {userId: props.event.schedulerId},}) }} style={{width:'36px', height:'36px'}} iconHeight={20} iconWidth={20} />
            <SchedulingIconButton icon="/icon_svg/closed.svg" onClick={openModal} style={{width:'36px', height:'36px', marginLeft:'4px'}} iconHeight={20} iconWidth={20} />
            {props.needsApproval && <SchedulingIconButton icon="/icon_svg/accept_tour_check.svg" style={{width:'36px', height:'36px', marginLeft:'4px'}} iconHeight={20} iconWidth={20} onClick={handleApproveEvent}/>}
          </IconDiv>
        </RowDiv>
        <RowDiv style={{marginTop:'16px'}}>
            <IconDiv>
                <Image src="/icon_svg/clock.svg" alt='yep clock' width={20} height={20} />
                <MintParagraph style={{marginLeft:'4px'}} size="14" weight="medium"> {start.format('hh:mma')} - {end.format('hh:mma')}
                </MintParagraph>
            </IconDiv>
            <IconDiv>
                <Image src="/icon_svg/calendar.svg" alt='calendar' width={20} height={20} />
                <MintParagraph style={{marginLeft:'4px'}} size="14" weight="medium">{start.format('DD MMM YYYY')}
                </MintParagraph>
            </IconDiv>
        </RowDiv>
        {isModalOpen && <BasicParentModal closeModal={closeModal}>
                <H4 style={{color:colors.gray900}}>Are you sure you&apos;d like to cancel?</H4>
                <MintParagraph size="18" weight="medium" style={{marginTop:'12px', marginBottom:'16px',color:colors.gray900}}>We&apos;ll send a notification to the buyer letting them know the tour has been cancelled.</MintParagraph>
                <RowDiv style={{marginTop:'12px'}}>
                    <SecondaryButton size='medium' onClick={closeModal} style={{paddingLeft:'20px', paddingRight:'20px', maxWidth:"134px"}} isLight text="No" />
                    <SecondaryButton size='medium' onClick={handleCancelEvent} style={{paddingLeft:'20px', paddingRight:'20px', maxWidth:"134px"}} text="Yes, cancel" />
                </RowDiv>
            </BasicParentModal>}
      </EventCardContainer>
      
    );
};

export default EventCard;