import Calendar from 'react-calendar';
import React, {Dispatch, SetStateAction, useState} from "react";
import {ScheduleEventPageProps} from "../../../../pages/schedule-event";
import {Slot} from "../AvailabilityTab";
import { H4, MintParagraph } from '../../Typography/Typography';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import styled from "@emotion/styled";
import {colors} from "../../../styles/oldColors";
import PrimaryButton from "../../buttons/PrimaryButton";
import { useDevice } from '../../../contexts/DeviceContext';
import { useAppSelector } from '../../../store';
import BasicParentModal from '../../boxes/modals/BasicParentModal';
dayjs.extend(isSameOrAfter)
dayjs.extend(utc);
dayjs.extend(timezone);


const dayNameMap = {
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
    0: "Sunday"
};

function calculateAvailableTimeslots() {

}

export type TimeslotSelectorProps = {
    onChange: Dispatch<SetStateAction<Date>>,
    date: Date,
    setSelTime: Dispatch<SetStateAction<string>>,
    selTime: string,
    schedulingProps: ScheduleEventPageProps,
    saveEvent: () => void;
    
}

// todo: move
export function convertToDate(date: Date, time: string | undefined) {
    return dayjs( `${dayjs(date).format('YYYY-MM-DD')} ${time} Z`, 'YYYY-MM-DD HH:mm:ss Z');
}

const TimeslotSelectButton = styled.div<{selected: boolean}>`
    height: 52px;
    border-radius: 8px;
    width: 200px;
    margin-right: 12px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background-color: ${props => props.selected ? colors.main500 : "none"};
    color: ${props => props.selected ? "white" : "inherit"};
`;

const CalendarContainer = styled.div`
    padding: 24px;
    flex: 1;
    flex-basis: 50%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
`;


const TimeslotSelector = (props: TimeslotSelectorProps) => {
    const { isMobile } = useDevice();
    const today = dayjs();
    const tomorrow = today.add(1, 'day').startOf('day');
    const twoWeeksFromNow = today.add(2, 'weeks');
    const failedBackgroundCheck = useAppSelector((state) => state.eventReducer.failedBackgroundCheck);
    const user = useAppSelector((state) => state.userReducer.user);
    const [shouldShowFailedBackgroundCheckModal, setShouldShowFailedBackgroundCheckModal] = useState(true);
    const closeModal = async () => {
        setShouldShowFailedBackgroundCheckModal(false);
    };
    const confirmEvent = () => {
        props.saveEvent();
    }

    const aptLength = props.schedulingProps.availConfig?.length30 ? 30 : 15;
    const currDateEvents = props.schedulingProps.propertyEvents?.slice()
        .filter((event) => dayjs(event.start).day() == props.date.getDay());

    if (!props.schedulingProps.weeklyScheduleData) {
        return <>
            This property has not set up their schedule yet.<br/>Please send them a message if you&apos;d like to see the property.
        </>
    }

    // @ts-ignore
    const currDateSchedule = props.schedulingProps.weeklyScheduleData[dayNameMap[props.date.getDay()]] as DailySchedule;

    const availTimes: string[] = [];
    if (currDateSchedule != undefined && currDateSchedule.isActive) {
        currDateSchedule.timeSlots.forEach((timeslot: Slot) => {
            let curr = convertToDate(props.date, timeslot.start);
            let endDate = convertToDate(props.date, timeslot.end);
            
            if (endDate.isBefore(curr)) {
                endDate = endDate.add(1, 'day');
            }
    
            while (curr.isBefore(endDate)) {
                if (currDateEvents === undefined || currDateEvents.find((event) =>
                    (dayjs(event.start).isSameOrAfter(curr) && dayjs(event.start).isBefore(curr.add(aptLength, 'minute')))
                    || (dayjs(event.end).isAfter(curr) && dayjs(event.end).isBefore(curr.add(aptLength, 'minute')))) === undefined) {
                    availTimes.push(curr.format('h:mm A'));
                }
                curr = curr.add(aptLength, 'minute');
            }
        })
    }
    

    return (
        <>
        <div style={{ display: "flex", flexDirection: "column" }} >
            <div style={{ display: "flex", flexDirection: isMobile ? 'column' : 'row', alignItems: isMobile ? 'center' : '', border: `1px solid ${colors.gray300}`}} >
                <CalendarContainer style={{borderRight: isMobile ? 'none' : '1px solid ${colors.gray300'}}>
                        <Calendar
                            onChange={props.onChange}
                            value={props.date}
                            calendarType={"US"}
                            defaultView={"month"}
                            showFixedNumberOfWeeks={true}
                            defaultValue={new Date()} />
                </CalendarContainer>
                <div style={{ padding: "24px", flex: 1, flexBasis: "50%", display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
                    <MintParagraph size='16' weight='regular' style={{marginBottom:'7px', width: '100%'}}>{props.date.toDateString()}</MintParagraph>
                    {availTimes.length === 0 || dayjs(props.date).isAfter(twoWeeksFromNow) || dayjs(props.date).isBefore(tomorrow) ? <MintParagraph size='16' weight='light' style={{textAlign:'center', width: '100%'}}> No timeslots available</MintParagraph> : availTimes.map((time, i) => {
                        if (dayjs(props.date).isAfter(twoWeeksFromNow)) {
                            return <></>
                        }
                        return <div style={{ display: "flex" }} key={i}>
                            <TimeslotSelectButton
                                selected={props.selTime === time}
                                onClick={() => props.setSelTime(time)}>
                                <MintParagraph weight='medium' size='14'>{time}</MintParagraph>
                            </TimeslotSelectButton>
                            {props.selTime === time &&
                            <PrimaryButton
                                text={"Confirm"}
                                style={{height: "52px"}}
                                onClick={confirmEvent}
                            />}
                        </div>
                    })}
                </div>
            </div>
        </div>
        {(failedBackgroundCheck && shouldShowFailedBackgroundCheckModal) && <BasicParentModal closeModal={closeModal}>
            <H4 style={{color: colors.gray900}}>Background Check Failed</H4>
            <MintParagraph size='24' weight='light' style={{marginTop:'12px'}}> 
                    Unfortunately you failed our background check. If you believe this was an error, please contact us at support@housewell.com. In the meantime you will not be able to schedule showings but you can use other features of Housewell.
            </MintParagraph>
        </BasicParentModal>}
        </>
    )
}

export default TimeslotSelector;