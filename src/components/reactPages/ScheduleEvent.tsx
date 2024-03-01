import TimeslotSelector, {convertToDate} from "../scheduling/buyer/TimeslotSelector";
import React, {use, useEffect, useState} from "react";
import {useRouter} from "next/router";
import {ScheduleEventPageProps} from "../../../pages/schedule-event";
import styled from "@emotion/styled";
import {TimeZone, timeZoneMapping, timeZoneOfficialZoneMapping} from "../scheduling/AvailabilityTab";
import {useAppDispatch, useAppSelector} from "../../store";
import {createEvent} from "../../slices/events";
import dayjs from "dayjs";
import { H2, H3, H4, H5, H6, MintParagraph } from "../Typography/Typography";
import BasicParentModal from "../boxes/modals/BasicParentModal";
import { colors } from "../../styles/colors";
import StatusMessage from "../stuff/StatusMessage";
import SecondaryButton from "../buttons/SecondaryButton";
import { makeAuthedApiRequest } from "../../utils/api/apiHelper";
import { isError, set } from "lodash";



const Container = styled.div`
    display: flex;
    flex-direction: column;
`;

const ScheduleEvent: React.FC<ScheduleEventPageProps> = (props: ScheduleEventPageProps) => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.userReducer.user);
    const { propertyId, date, time } = router.query;
    const [timeZone] = useState(timeZoneMapping[props.availConfig?.timeZone as TimeZone] || 'Eastern Time');
    const officialTimezone = timeZoneOfficialZoneMapping[props.availConfig?.timeZone as TimeZone];
    const failedBackgroundCheck = useAppSelector((state) => state.eventReducer.failedBackgroundCheck);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [readyToNavigate, setReadyToNavigate] = useState(false);
    useEffect(() => {
        let timeoutId;
    
        if (!user?.hasSeenScheduleModal) { 
            timeoutId = setTimeout(() => {
                setIsModalOpen(true);
            }, 300);
        } else {
            setIsModalOpen(false);
        }
    
        // Cleanup function to clear the timeout if the component unmounts before the timeout finishes
        return () => clearTimeout(timeoutId);
    }, [user?.hasSeenScheduleModal]);

    const closeModal = async () => {
        setIsModalOpen(false);
    };

    let dateObj = new Date(date as string);
    if (isNaN(dateObj.getTime())) dateObj = new Date();
    const [selDate, onDateChange] = useState(dateObj);
    const [selTime, setSelTime] = useState(time as string);

    useEffect(() => {
        if (selDate === new Date(date as string)) return;
        router.push({ query: { ...router.query, date: selDate.toDateString() }});
    }, [selDate]);

    useEffect(() => {
        router.push({ query: { ...router.query, time: selTime }});
    }, [selTime]);
    useEffect(() => {
        if (readyToNavigate) {
            if (failedBackgroundCheck) {
                setReadyToNavigate(false);
            }
            else {
                router.push('/buy');
            }
        }
    }, [readyToNavigate]);
    if (!propertyId) return (<>ERROR: YOU MUST HAVE A PROPERTY ID</>);

    const aptLength = props.availConfig?.length30 ? 30 : 15;

    const saveEvent = () => {
        const result = window.confirm(`Confirm a showing for ${selDate.toDateString()} at ${selTime} this will still need to be approved by the seller, we'll send you an email when they've confirmed the showing.`);
        if (result) {
            const start = convertToDate(selDate, dayjs(selTime, 'h:mmA').tz(officialTimezone).utc().format('HH:mm:ss'));
            const end = start.add(aptLength, 'minute');
            dispatch(createEvent({
                propertyId: propertyId as string,
                start: start.toDate(),
                end: end.toDate(),
                length: aptLength
            }))
            if (failedBackgroundCheck) {
                return;

            }
            setReadyToNavigate(true);
        }
    }

    return (
        <Container>
            <SecondaryButton size='medium' hasArrow isLight borderless reverseArrow text={"Back"} style={{width:"160px"}} onClick={() => router.push(`/property-listing?propertyId=${propertyId}`)} />
            <MintParagraph style={{marginTop: '12px', marginLeft: '8px'}} size="20" weight="light">Address: {props.propertyData?.streetAddress}</MintParagraph>
            <MintParagraph style={{marginTop: '12px', marginLeft: '8px'}} size="20" weight="light">Timezone: {timeZone}</MintParagraph>
            <MintParagraph style={{marginTop: '12px', marginBottom: '12px', marginLeft: '8px'}} size="20" weight="light">Appointment Length: {aptLength} minutes</MintParagraph>
            <TimeslotSelector
                onChange={onDateChange}
                date={selDate}
                schedulingProps={props}
                selTime={selTime}
                setSelTime={setSelTime}
                saveEvent={saveEvent}
            />

            {isModalOpen &&
                <BasicParentModal nonClosable={true} closeModal={closeModal}>
                    
                    <>
            
            <H4 style={{color: colors.gray900}}>How Scheduling a Showing Works:</H4>
            <H6 style={{color: colors.gray900, marginTop: '24px'}}><span style={{color: colors.brightgreen1300}}> 1.</span> Choose a time that works for you based on seller availablity. If no avaialable time works for you can reach out to the sellers to request a different time via messages.</H6>
            <H6 style={{color: colors.gray900, marginTop: '24px'}}><span style={{color: colors.brightgreen1300}}> 2.</span> Once you submit your showing request we will submit it to the sellers for approval. You will receive a notification and email once it has been approved.</H6>
            <H6 style={{color: colors.gray900, marginTop: '24px'}}><span style={{color: colors.brightgreen1300}}> 3.</span> Show up for your showing at the showing time. We will send you a code to access the lockbox 15 minutes before the showing to your email if your showing has been approved.</H6>
            <StatusMessage style={{marginTop: '24px', marginBottom:"12px"}} hasIcon> <MintParagraph size={"14"} weight={"medium"}>By clicking below, you understand and acknowledge that to ensure the safety and security of our
                homeowners and other potential buyers, some properties on Housewell.com may require you to undergo
                a background check before scheduling a viewing. Consenting to a background check is free and optional, but may
                be necessary to access certain listings.</MintParagraph></StatusMessage>
            <StatusMessage style={{ marginBottom:"24px"}} hasIcon> <MintParagraph size={"14"} weight={"medium"}>Note: Please reach out to your Housewell point of contact in messages or email <span style={{ fontWeight: 'bold', }}>support@housewell.com</span> if you have any questions or issues.</MintParagraph></StatusMessage></>
            <SecondaryButton size="medium" onClick={() => closeModal()} text="Acknowledge" hasArrow style={{ width: "100%" }} />

                </BasicParentModal>
            }
                        
        </Container>
    )
}

export default ScheduleEvent;