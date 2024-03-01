import {colors} from "../../styles/colors";
import {P4} from "../Typography/OldTypography";
import React, {useState, createContext, useEffect} from "react";
import styled from "@emotion/styled";
import DayColumn from "./AT_DayColumn";
import { makeAuthedApiRequest } from "../../utils/api/apiHelper";
import { FIFTEEN_MIN_INTERVAL_OPTIONS_REVERSE, FIFTEEN_MIN_INTERVAL_OPTIONS_TYPE } from "./schedulingConstants";
import ErrorToast from '../toast/customErrorToast';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import SecondaryButton from "../buttons/SecondaryButton";
import { MintParagraph } from "../Typography/Typography";
import { useDevice } from "../../contexts/DeviceContext";

import {EventModel} from "../../slices/events";

import IndividualEvent from "../boxes/events/IndividualEvent";


dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customParseFormat);

class OverlappingTimeslotError extends Error {
    constructor(message: string) {
      super(message);
      this.name = 'OverlappingTimeslotError';
    }
  }

type DailySchedule = {
    isActive: boolean,
    timeSlots: Slots,
}

type ResponsiveProps = {
    isMobile?: boolean
}

const StyledContentDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content: flex-start;
    width: 100%;
    position: relative;
`;
const Container = styled.div<{ isMobile?: boolean }>`
    margin-top: 24px;
    display: grid;
    grid-template-columns: ${props => props.isMobile ? '1fr' : 'repeat(3, 1fr)'};
    grid-gap: 20px;
    align-items: start;
    justify-items: left;
`
const DailyScheduleContainer = styled.div<{ isMobile?: boolean }>`
    margin-top: 24px;
    display: grid;
    grid-template-columns: ${props => props.isMobile ? 'repeat(1, 1fr)' : 'repeat(7, 1fr)'};
    grid-gap: 10px;
    max-width: 805px;
    align-items: start;
    justify-items: left;
`
const EmptyGreyContainer = styled.div`
    width: 100%;
    height: 230px;
    margin-top: 24px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    text-align: center;
    border: 1px solid ${colors.gray200};
    background-color: ${colors.gray100};
`

export type days = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";

export type TimeZone = 'ET' | 'CT' | 'MT' | 'PT'

export type WeeklySchedule = {
    "Monday": DailySchedule,
    "Tuesday": DailySchedule,
    "Wednesday": DailySchedule,
    "Thursday": DailySchedule,
    "Friday": DailySchedule,
    "Saturday": DailySchedule,
    "Sunday": DailySchedule,
}
export type Slot = {
    start: string,
    end: string,
    isError: boolean,
}
export type SchedulingConfig = {
    userId: string,
    length15: boolean,
    length30: boolean,
    timeZone: TimeZone
}

export type SchedulingPageProps = {
    weeklyScheduleData: WeeklySchedule,
    propertyId: string
    availConfig: SchedulingConfig
    
}


// todo: move, is now shared
export const timeZoneMapping = {
    "ET": "Eastern Time",
    "CT": "Central Time",
    "MT": "Mountain Time",
    "PT": "Pacific Time"
}

export const timeZoneOfficialZoneMapping = {
    "ET": "America/New_York",
    "CT": "America/Chicago",
    "MT": "America/Denver",
    "PT": "America/Los_Angeles"
}

type Slots = [Slot] | [];


const LengthTab = styled.div<{ selected: boolean }>`
    padding: 4px 12px;
    border: 1px solid ${colors.darkgreen1000};
    background: ${props => props.selected ? colors.darkgreen1000 : "none"};
    color: ${props => props.selected ? colors.background : colors.darkgreen1000};
    border-left: none;
    cursor: pointer;
`;

const baseTimeslot : Slot = {
    start: "9:00am",
    end: "11:00am",
    isError: false
}

const baseSchedule = {
    "Monday": { isActive: false, timeSlots: [] },
    "Tuesday": { isActive: false, timeSlots: [] },
    "Wednesday": { isActive: false, timeSlots: [] },
    "Thursday": { isActive: false, timeSlots: [] },
    "Friday": { isActive: false, timeSlots: [] },
    "Saturday": { isActive: false, timeSlots: [] },
    "Sunday": { isActive: false, timeSlots: [] },
} as WeeklySchedule;
type WeeklyScheduleContextType = {
    weeklyContext: WeeklySchedule;
    updateDayIsActive: (day: days, newActiveState: boolean) => void;
    updateDaySlot: (day: days, slot: Slot, index: number, isNewSlot: boolean, shouldSort: boolean ) => void;
    deleteDaySlot: (day: days, index: number) => void,
  };


export const WeeklyContext = createContext<WeeklyScheduleContextType>(
    {
        weeklyContext: baseSchedule,
        updateDayIsActive: (day: days, newActiveState: boolean) => {},
        updateDaySlot: (day: days, slot: Slot, index: number, isNewSlot: boolean, shouldSort: boolean ) => {},
        deleteDaySlot: (day: days, index: number) => {},
    }
)


function checkAndUpdatepdateErrorStateForSlots(slots: Slots) {
    slots.forEach((outerSlot: Slot, outerIndex: number) => {
        const outerSlotStartIndex = FIFTEEN_MIN_INTERVAL_OPTIONS_REVERSE[outerSlot.start as FIFTEEN_MIN_INTERVAL_OPTIONS_TYPE];
        const outerSlotEndIndex = FIFTEEN_MIN_INTERVAL_OPTIONS_REVERSE[outerSlot.end as FIFTEEN_MIN_INTERVAL_OPTIONS_TYPE];
        outerSlot.isError = false;
        slots.forEach((innerSlot: Slot, innerIndex: number) => {
            const innerSlotStartIndex = FIFTEEN_MIN_INTERVAL_OPTIONS_REVERSE[innerSlot.start as FIFTEEN_MIN_INTERVAL_OPTIONS_TYPE];
            const innerSlotEndIndex = FIFTEEN_MIN_INTERVAL_OPTIONS_REVERSE[innerSlot.end as FIFTEEN_MIN_INTERVAL_OPTIONS_TYPE];
            const hasOverlap =
                (innerSlotStartIndex > outerSlotStartIndex && innerSlotStartIndex < outerSlotEndIndex) ||
                (innerSlotEndIndex > outerSlotStartIndex && innerSlotEndIndex < outerSlotEndIndex) ||
                (outerSlotStartIndex > innerSlotStartIndex && outerSlotStartIndex < innerSlotEndIndex) ||
                (outerSlotEndIndex > innerSlotStartIndex && outerSlotEndIndex < innerSlotEndIndex) ||
                (innerSlotStartIndex === outerSlotStartIndex && innerSlotEndIndex === outerSlotEndIndex && innerIndex !== outerIndex);
            if (hasOverlap) {
                outerSlot.isError = true;
            }
        });
    });
}
    
    
const AvailabilityTab = (props: { weeklyScheduleData?: WeeklySchedule, propertyId?: string, availConfig?: SchedulingConfig, events?: EventModel[] }) => {
    const { isMobile } = useDevice();
    const [weeklyScheduleContext, setWeeklyScheduleContext] = useState(props.weeklyScheduleData || baseSchedule);
    const events = props.events || [];
    const approvedEvents = events.filter(event => event.approved);
    const notApprovedEvents = events.filter(event => !event.approved);
    const [timeZone] = useState(timeZoneMapping[props.availConfig?.timeZone as TimeZone] || 'Eastern Time');
    const [length15, setLength15] = useState(props.availConfig?.length15 || false);
    const [cardView, setCardView] = useState(true);
    const [length30, setLength30] = useState(!props.availConfig?.length15);
    const onLength15Click = () => {
        if(!length15) {
            setLength30(false);
        }
        setLength15(!length15);
    }
    const onLength30Click = () => {
        if(!length30) {
            setLength15(false);
        }
        setLength30(!length30);
    }

    const updateDayIsActive = (day: days, newActiveState: boolean) => {
        const baseSlotCopy = {...baseTimeslot};
        const newSchedule = {...weeklyScheduleContext};
        newSchedule[day].isActive = newActiveState;
        if (newActiveState) {
            newSchedule[day].timeSlots.length === 0 ? newSchedule[day].timeSlots = [baseSlotCopy] : null;
        }
        setWeeklyScheduleContext({...weeklyScheduleContext, [day]: newSchedule[day]});
    }
    const updateDaySlot = (day: days, slot: Slot, index: number, isNewSlot: boolean, shouldSort: boolean ) => {
        const newSchedule = {...weeklyScheduleContext};
        if (!isNewSlot) {
            newSchedule[day].timeSlots.splice(index, 1);
        }
        newSchedule[day].timeSlots.splice(index, 0, slot);
        checkAndUpdatepdateErrorStateForSlots(newSchedule[day].timeSlots);
        if (shouldSort) {
            newSchedule[day].timeSlots.sort((a: Slot, b: Slot) => {
                const aEndIndex = FIFTEEN_MIN_INTERVAL_OPTIONS_REVERSE[a.end as FIFTEEN_MIN_INTERVAL_OPTIONS_TYPE];
                const bEndIndex = FIFTEEN_MIN_INTERVAL_OPTIONS_REVERSE[b.end as FIFTEEN_MIN_INTERVAL_OPTIONS_TYPE];
                return aEndIndex - bEndIndex;
            });
        }
        setWeeklyScheduleContext({...weeklyScheduleContext, [day]: newSchedule[day]});
    }
    // on update check for each if either element of slot is in error state if it is update error, if not remove error
    // insert on element each 
    const deleteDaySlot = (day: days, index: number) => {
        const newSchedule = {...weeklyScheduleContext};
        const timeSlots = newSchedule[day].timeSlots
        if ((index >= 0 && index < timeSlots.length)) {
            timeSlots.splice(index, 1);
            // this step can be avoided in many cases but probably unnecessary to optimize
            checkAndUpdatepdateErrorStateForSlots(timeSlots);
            setWeeklyScheduleContext({...weeklyScheduleContext, [day]: newSchedule[day]});
        } else {
            console.error("index out of bounds for array");
        }
    }

    const saveSchedule = async () => {
        try {
            Object.keys(weeklyScheduleContext).forEach((day: string) => {
                if (!weeklyScheduleContext[day as days].isActive) {
                    weeklyScheduleContext[day as days].timeSlots = [];
                }
            });
            const apiBody: WeeklySchedule = JSON.parse(JSON.stringify(weeklyScheduleContext)); // shitty deep copy lol
            Object.keys(apiBody).forEach((day) => {
                // @ts-ignore
                const dailySchedule = apiBody[day] as DailySchedule;
                dailySchedule.timeSlots.forEach((timeSlot: Slot) => {
                    if (timeSlot.isError) {
                        throw new OverlappingTimeslotError("Cannot save schedule with errors");
                    }

                    // Get the current date in the specified timezone
                    const officialTimezone = timeZoneOfficialZoneMapping[props.availConfig?.timeZone as TimeZone];
                    const currentDate = dayjs().tz(officialTimezone);
                    const parsedStart = dayjs(`${currentDate.format('YYYY-MM-DD')} ${timeSlot.start}`, 'YYYY-MM-DD h:mma');
                    const parsedEnd = dayjs(`${currentDate.format('YYYY-MM-DD')} ${timeSlot.end}`, 'YYYY-MM-DD h:mma');
                    const combinedStartTime = currentDate.hour(parsedStart.hour()).minute(parsedStart.minute());
                    const combinedEndTime = currentDate.hour(parsedEnd.hour()).minute(parsedEnd.minute());
                    const startUtc = combinedStartTime.utc().format('HH:mm');
                    const endUtc = combinedEndTime.utc().format('HH:mm');
                    timeSlot.start = startUtc;
                    timeSlot.end = endUtc;
                });
            });

            await makeAuthedApiRequest({
                method: 'post',
                urlExtension: '/v1/availTimeslot/createOrUpdateAvailTimeslot',
                data: { schedule: apiBody, propertyId: props.propertyId },
            })
        } catch (error) {
            if (error instanceof OverlappingTimeslotError) {
              console.log('User tried to submit overlapping timeslots:', error.message);
              ErrorToast({ message: `Can't have overlapping timeslots` });
            } else {
              throw error; // re-throw other errors
            }
        }
    }
    const saveSettings = async () => {
        if (!length15 && !length30) {
            throw new Error("Must select at least one length");
        }
        await makeAuthedApiRequest({
            method: 'post',
            urlExtension: '/v1/availConfig/createAvailConfig',
            data: { length15, length30, propertyId: props.propertyId },
        })
    }
    const saveSeetingsAndSchedule = async () => {
        Promise.all([saveSettings(), saveSchedule()]);
        setCardView(true);
    }
    const checkIcon = "/icon_svg/check_big.svg"
    const gearIcon = "/icon_svg/gear.svg"

    if (cardView) {
        return <StyledContentDiv>
            <div style={{display: "flex", justifyContent:'space-between', alignItems: "center", width: "100%"}}>
                <MintParagraph size={ isMobile ? '24' : "32"} weight="regular" style={{color:colors.gray900}}>Awaiting Approval</MintParagraph>
                <SecondaryButton size="medium" text={isMobile ? 'Settings': "Modify Showing Settings"} onClick={() => setCardView(false)} isLight icon={gearIcon} hasArrow reverseArrow iconHeight={24} iconWidth={24} iconSpacing="12px" style={{padding:"0 20px"}}></SecondaryButton>
            </div>
            {(!notApprovedEvents || notApprovedEvents.length === 0) ? 
                <EmptyGreyContainer>
                    <MintParagraph size="24" weight="regular" style={{color:colors.gray600}}>No showings awaiting approval.</MintParagraph> 
                </EmptyGreyContainer>
                :
                <Container isMobile={isMobile}>
                    {
                        notApprovedEvents.map((event, i) =>
                            <div key={i} style={{width: "100%"}}>
                                <IndividualEvent event={event} key={event.id} needsApproval />
                            </div>
                        )
                    }
                </Container>
            }
            <MintParagraph size={isMobile ? '24' : "32"} weight="regular" style={{color:colors.gray900, marginTop:"24px"}}>Upcoming Showings</MintParagraph>
            {(!approvedEvents || approvedEvents.length === 0) ? 
                <EmptyGreyContainer>
                    <MintParagraph size="24" weight="regular" style={{color:colors.gray600}}>No upcoming showings for this property yet.</MintParagraph> 
                </EmptyGreyContainer>
                :
                <Container isMobile={isMobile}>
                    {
                        approvedEvents.map((event, i) =>
                            <div key={i} style={{width: "100%"}}>
                                <IndividualEvent event={event} key={event.id} />
                            </div>
                        )
                }
                </Container>
            }
            <div style={{height:'100px'}}></div>
        </StyledContentDiv>
    }

    return <>
        <div style={{display: "flex", justifyContent:'space-between', flexDirection: isMobile ? 'column' : 'row', marginBottom: isMobile ? '32px' : '12px', alignItems: "center", width: "100%"}}>
            {!isMobile && <MintParagraph size="32" weight="regular" style={{color:colors.gray900}}>Schedule</MintParagraph>}
            <div style={{display: "flex", width: isMobile ? '100%' : '', justifyContent: isMobile ? 'space-between' : 'space-between', alignItems: "center"}}>
                <SecondaryButton onClick={() => setCardView(true)} text="Cancel" isLight style={{padding:"0 20px"}} size={"medium"}></SecondaryButton>
                <div style={{width:"12px"}}></div>
                <SecondaryButton onClick={saveSeetingsAndSchedule} icon={checkIcon} hasArrow reverseArrow iconWidth={24} iconHeight={24} iconSpacing={'12px'} text="Save" style={{padding:"0 20px"}} size={"medium"}></SecondaryButton>
            </div>
        </div>
        <div style={{borderBottom: `1px solid ${colors.gray200}`, display: "flex", paddingRight: "0"}}>
            <div style={{display: "flex", alignItems: "flex-start", width: "15vw",  paddingRight: "8px", marginTop:'12px',}}>
                <div style={{display: "flex", flexDirection: "column", alignItems: "left", width: "100%"}}>
                    <P4 jakarta style={{fontSize:"12px",padding: "0 0 5px 0", alignContent: "left"}} weight={"light"}>Time Zone: </P4>
                    <P4 jakarta style={{fontSize:"16px"}} weight={"light"}>{timeZone} </P4>
                </div>
            </div>

            <div style={{borderLeft: `1px solid ${colors.gray200}`, display: "flex", alignItems: "flex-start", marginTop:'12px'}}>
                <div style={{marginLeft: isMobile ? '10px' : "32px"}}>
                    <MintParagraph size="16" weight="regular" style={{padding: "0 0 5px 4px", fontSize:"16px"}}>Length of Tours</MintParagraph>
                    {!isMobile && <MintParagraph size="12" weight="regular" style={{padding: "0 0 5px 4px", fontSize:"12px"}}>Select how long you&apos;d like tours to be, typically larger houses need to have longer tours</MintParagraph>}
                    <div style={{display: "flex", padding:"0 0 0 4px"}}>
                        <LengthTab selected={length15} onClick={() => onLength15Click()} style={{borderLeft: `1px solid ${colors.darkgreen1000}`}}><P4 jakarta weight={"bold"}>15 min</P4></LengthTab>
                        <LengthTab selected={length30} onClick={() => onLength30Click()}><P4 jakarta weight={"bold"}>30 min</P4></LengthTab>
                    </div>
                </div>
            </div>

            <span style={{height: "120px"}}/>
        </div>

        <div style={{paddingTop: "38px"}}>
            <P4 jakarta style={{fontSize:"16px"}}>Set your weekly availability for tours</P4>
            <DailyScheduleContainer isMobile={isMobile}>
                <WeeklyContext.Provider value={{
                    weeklyContext: weeklyScheduleContext,
                    updateDayIsActive,
                    updateDaySlot,
                    deleteDaySlot,
                }}>
                    <DayColumn title="MON" day="Monday"/>
                    <DayColumn title="TUE" day="Tuesday"/>
                    <DayColumn title="WED" day="Wednesday"/>
                    <DayColumn title="THU" day="Thursday"/>
                    <DayColumn title="FRI" day="Friday"/>
                    <DayColumn title="SAT" day="Saturday"/>
                    <DayColumn title="SUN" day="Sunday"/>
                </WeeklyContext.Provider>
            </DailyScheduleContainer>
        </div>
    </>
};


export default AvailabilityTab;