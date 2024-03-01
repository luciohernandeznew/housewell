import React, {useState, useContext} from "react";
import {P1} from "../Typography/OldTypography";
import SwitchButton from "../buttons/SwitchButton";
import {colors} from "../../styles/oldColors";
import {
    FIFTEEN_MIN_INTERVAL_OPTIONS_REVERSE,
    FIFTEEN_MIN_INTERVAL_OPTIONS_TYPE,
    FIFTEEN_MIN_INTERVAL_OPTIONS
} from "./schedulingConstants";
import IconButton from "../buttons/IconButton";
import TimeDropdown from "./ScheduleDropdown";
import { WeeklyContext, days } from "./AvailabilityTab";
import Image from "next/image";

const Timeslot = ({timeslot, index, day} : {timeslot: { start: string, end: string, isError: boolean}, index: number, day: days}) => {
    const { updateDaySlot, deleteDaySlot } = useContext(
        WeeklyContext
    );
    // todo: error states for when there is overlap between timeslots & bump the times when there is within timeslots
    const onStartChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const startIndex = FIFTEEN_MIN_INTERVAL_OPTIONS_REVERSE[event.target.value as FIFTEEN_MIN_INTERVAL_OPTIONS_TYPE];
        const endIndex = FIFTEEN_MIN_INTERVAL_OPTIONS_REVERSE[timeslot.end as FIFTEEN_MIN_INTERVAL_OPTIONS_TYPE];
        if (startIndex < endIndex) {
            updateDaySlot(day, {start: event.target.value, end: timeslot.end, isError: false}, index, false, false);
        } else {
            updateDaySlot(day, {start: event.target.value, end: FIFTEEN_MIN_INTERVAL_OPTIONS[startIndex + 1], isError: false}, index, false, true);
        }
    }
    const onEndChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const startIndex = FIFTEEN_MIN_INTERVAL_OPTIONS_REVERSE[timeslot.start as FIFTEEN_MIN_INTERVAL_OPTIONS_TYPE];
        const endIndex = FIFTEEN_MIN_INTERVAL_OPTIONS_REVERSE[event.target.value as FIFTEEN_MIN_INTERVAL_OPTIONS_TYPE];
        if (startIndex < endIndex) {
            updateDaySlot(day, {start: timeslot.start, end: event.target.value, isError: false}, index, false, true);
        } else {
            updateDaySlot(day, { start: FIFTEEN_MIN_INTERVAL_OPTIONS[endIndex - 1], end: event.target.value, isError: false }, index, false, true);
        }
    }
    const onPlusClick = () => {
        const endIndex = FIFTEEN_MIN_INTERVAL_OPTIONS_REVERSE[timeslot.end as FIFTEEN_MIN_INTERVAL_OPTIONS_TYPE];
        updateDaySlot(
            day,
            {start: FIFTEEN_MIN_INTERVAL_OPTIONS[endIndex], end: FIFTEEN_MIN_INTERVAL_OPTIONS[endIndex + 8], isError:false},
            index + 1,
            true,
            false,
        );
    }
    const onDeleteClick = () => {
        deleteDaySlot(day, index);

    }
    return (<div>
        <TimeDropdown currentTime={timeslot.start} onChange={onStartChange}/>
        <TimeDropdown currentTime={timeslot.end} isSecond={true} onChange={onEndChange}/>
        <div style={{height: "8px"}}/>
        <div style={{display: "flex"}}>
            <IconButton icon={<Image src={"/icon_svg/scheduling/plus.svg"} width={16} height={16} alt="Icon"/>} onClick={onPlusClick}/>
            { index != 0 ?
                <IconButton isSecond={true} icon={<Image src={"/icon_svg/scheduling/trash.svg"} width={16} height={16} alt="Icon"/>} onClick={onDeleteClick}/> 
                :
                <div></div>
            }
        </div>
        <div>
            {timeslot.isError ? <P1 jakarta weight="light" style={{color: colors.accent600}}>Overlapping timeslots</P1> : <div></div>}
        </div>
        <div style={{height: "10px"}}/>
    </div>)
}

const DayColumn = ({title, day } : {title: string, day: days}) => {
    const { weeklyContext, updateDayIsActive } = useContext(
        WeeklyContext
      );
    const [checked, setChecked] = useState<boolean>(weeklyContext[day].isActive);
    const onCheckedChange = () => {
        updateDayIsActive(day, !checked);
        setChecked(!checked);
    }

    return (<div style={{width: "100px"}}>
        <div style={{position: "relative", padding: "12px 0 16px 0", width: "100px"}}>
            <P1 jakarta weight="medium">{title}</P1>
            <div style={{position: "absolute", display: "flex", alignItems:"center", top: 0, left: "66px", height: "100%", width: "36px"}}>
                <div style={{height: "18px", width:"36px", display: "flex", alignItems:"center"}}>
                    <SwitchButton checked={checked} setChecked={onCheckedChange} />
                </div>
            </div>
        </div>
        {checked ?
            <div>
                {weeklyContext[day].timeSlots.map((timeslot, i) => {
                    return <Timeslot index={i} timeslot={timeslot} key={title+i} day={day} />
                })}
            </div>
            :
            <div>
                <P1 jakarta weight="light" style={{color: colors.gray600}}>Unavailable</P1>
            </div>
        }
    </div>)
}

export default DayColumn;