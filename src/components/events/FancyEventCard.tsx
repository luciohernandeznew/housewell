import TimeAgo from "javascript-time-ago";
import React, { useEffect, useRef } from 'react';
import en from 'javascript-time-ago/locale/en'
import styled from "@emotion/styled";
import { colors } from "../../styles/colors";
import { EventModel, approveEvent, cancelEvent } from "../../slices/events";
import {useAppDispatch} from "../../store";
import {useState} from "react";
import { H2, H4, MintParagraph, AzeretMonoParagraph } from "../Typography/Typography";
import { useRouter } from "next/router";
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import SecondaryButton from "../buttons/SecondaryButton";
import BasicParentModal from "../boxes/modals/BasicParentModal";

import Image from 'next/image';
import dayjs from 'dayjs';
import { useDevice } from "../../contexts/DeviceContext";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customParseFormat);
TimeAgo.addLocale(en);

const EventCardContainer = styled.div`
    display: flex;
    align-items: flex-start;
    border-radius: 16px;
    border: 1px solid ${colors.gray300};
    padding: 16px;
    align-items: center;
    gap: 20px;
`;

const MonthDayContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 10px 12px 6px 12px;
    gap: 2px;
    align-self: stretch;
    border: 1px solid ${colors.gray300};
    border-radius: 8px;
`;

const ContentDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 22px;
    align-self: stretch;
    width: 100%;
`;

const RowDiv = styled.div`
    display: flex;
    position: relative;
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: space-between !important;
`;
const IconDiv = styled.div`
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
`;

const OptionsDiv = styled.div`
    position: absolute;
    right: 31px;
    top: -40px;
    background-color: white;
    border: 1px solid ${colors.gray300};
    border-radius: 4px;
    z-index: 1;
`;

const TopOptionsDiv = styled.div`
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    text-align: left;
    padding: 8px;
    border-bottom: 1px solid ${colors.gray300};
    cursor: pointer;

    &:hover {
        background-color: ${colors.gray100};
    }

    &:active {
        background-color: ${colors.gray200};
    }
`;

const BottomOptionsDiv = styled.div`
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    text-align: left;
    padding: 8px;
    cursor: pointer;

    &:hover {
        background-color: ${colors.gray100};
    }

    &:active {
        background-color: ${colors.gray200};
    }
`;

const ThreeDotsButton = styled.button`
    background-color: ${colors.gray100};
    width: 22px;
    height: 36px;
    border-radius: 8px;
    cursor: pointer;

    &:hover {
        background-color: ${colors.gray200};
    }

    &:active {
        background-color: ${colors.gray300};
    }
`;


const FancyEventCard = (props: {event: EventModel, isMobile?: boolean}) => {
    const router = useRouter();
    const { windowSize } = useDevice();
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const start = dayjs(props.event.start).tz(userTimezone);
    const end = dayjs(props.event.end).tz(userTimezone);
    const monthName = start.format('MMMM');
    const dayOfMonth = start.format('DD');
    const [isModalOpen, setModalOpen] = useState(false);
    const dispatch = useAppDispatch();
    const optionsRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (optionsRef.current && !optionsRef.current.contains(event.target as Node)) {
                setIsOptionsOpen(false);
            }
        }
    
        // Attach the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Remove the event listener on cleanup
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    
    
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
        setIsOptionsOpen(false);
        setModalOpen(false)
    }
    const [isOptionsOpen, setIsOptionsOpen] = useState(false);

    const toggleOptions = () => {
      setIsOptionsOpen(!isOptionsOpen);
    };
  
    const handleMessageSellers = () => {
        const groupId = props.event.groupId;
        router.push(`/messages?groupId=${groupId}`);
    };
  

    return (
        <EventCardContainer>
            <MonthDayContainer>
                <MintParagraph style={{color:colors.orange1000}} size="12" weight="medium">{monthName}</MintParagraph>
                <H2 style={{color:colors.typographyBlack}}>{dayOfMonth}</H2>
            </MonthDayContainer>
            
            <ContentDiv>
                <RowDiv style={{alignItems: 'flex-start'}}>
                    <div>
                        <MintParagraph size={props.isMobile ? '14' : "18"} weight="medium" style={{color:colors.gray1000}}>{props.event.streetAddress + (props.event?.address2 ? ' ' + props.event.address2 : '')}</MintParagraph>
                        <MintParagraph size={props.isMobile ? '14' : "18"} weight="medium" style={{color:colors.gray1000}}>{props.event.city + ', ' + props.event.state + ' ' + props.event.zip}</MintParagraph>
                    </div>
                    <ThreeDotsButton onClick={toggleOptions}><Image src="/icon_svg/dots.svg" alt='dots' width={20} height={20} /></ThreeDotsButton>
                    {isOptionsOpen && (
                        <OptionsDiv ref={optionsRef}>
                            <TopOptionsDiv onClick={handleMessageSellers}><MintParagraph size="12" weight="regular">Message</MintParagraph></TopOptionsDiv>
                            <BottomOptionsDiv onClick={openModal}><MintParagraph size="12" weight="regular">Cancel Showing</MintParagraph></BottomOptionsDiv>
                        </OptionsDiv>
                    )} 
                </RowDiv>
                <RowDiv>
                    <IconDiv>
                        <Image src="/icon_svg/clock.svg" alt='yep clock' width={20} height={20} />
                        <MintParagraph style={{marginLeft:'4px'}} size={props.isMobile ? '12' : "16"} weight="medium"> {start.format('hh:mma')} - {end.format('hh:mma')}
                        </MintParagraph>
                    </IconDiv>
                    {props.event.canceled ? <AzeretMonoParagraph weight="medium" style={{padding:'6px 12px', borderRadius: '38px', backgroundColor: colors.orange200, fontSize:props.isMobile ? '10px' : '12px', color:colors.orange1000}}>CANCELLED</AzeretMonoParagraph> 
                    : props.event.approved ? <AzeretMonoParagraph weight="medium" style={{padding:'6px 12px', borderRadius: '38px', backgroundColor: colors.brightgreen1000, fontSize:props.isMobile ? '10px' : '12px', color:colors.darkgreen1000}}>CONFIRMED</AzeretMonoParagraph> 
                    : <AzeretMonoParagraph weight="medium" style={{padding:'6px 12px', borderRadius: '38px', backgroundColor: colors.gray200, fontSize:props.isMobile ? '10px' : '12px', color:colors.darkgreen1000}}>{windowSize.width < 1460 ? 'PENDING' : 'PENDING APPROVAL'}</AzeretMonoParagraph>}
                </RowDiv>
            </ContentDiv>
            {isModalOpen && <BasicParentModal closeModal={closeModal}>
                <H4 style={{color:colors.gray900, marginBottom: '48px'}}>Are you sure you&apos;d like to cancel?</H4>
                <RowDiv style={{marginTop:'12px'}}>
                    <SecondaryButton size='medium' onClick={closeModal} style={{paddingLeft:'20px', paddingRight:'20px', maxWidth:"134px"}} isLight text="No" />
                    <SecondaryButton size='medium' onClick={handleCancelEvent} style={{paddingLeft:'20px', paddingRight:'20px', maxWidth:"134px"}} text="Yes, cancel" />
                </RowDiv>
            </BasicParentModal>}
        </EventCardContainer>
    );
};

export default FancyEventCard;