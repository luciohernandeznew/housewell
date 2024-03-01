import React from "react";
import dayjs from "dayjs";
import styled from "@emotion/styled";
import {colors} from "../../styles/colors";

export const StyledInputContainer = styled.div<{shouldReverse?: boolean}>`
    display: flex;
    width: 100%;
    border: 1px solid ${colors.gray300};
    border-radius: 8px;
    box-sizing: border-box;
    padding: 1px;

    &:focus-within {
        outline: none;
        border: 2px solid ${colors.darkgreen1000};
        padding: 0px;
        box-sizing: border-box;
        border-radius: 8px;
    }
    &:disabled {
        background-color: ${colors.gray100};
        color: ${colors.gray700};
    }
`;

export const StyledLabel = styled.label`
    font-size: 12px;
    line-height: 12px;
    margin-left: 12px;
    margin-top: 8px;
    color: ${colors.gray800};
    font-family: Mint Grotesk Medium;
    margin-bottom: 2px; 
`;

export const StyledInput = styled.input<{isSmall?: boolean}>`
    height: 28px;
    border: none;

    font-size: ${props => props.isSmall ? '16px' : '24px'};
    line-height: ${props => props.isSmall ? '18px' : '24px'};
    font-family: Mint Grotesk Medium;
    margin: 2px 15px 0 10px;

    &:focus {
        outline: none;
        border-radius: 0;
    }
    
    ::placeholder {
        color: ${colors.gray700};
    }
    &:disabled {
        background-color: ${colors.gray100};
        color: ${colors.gray700};
    }
`;

export type DatetimeMultiItem = {
    label?: string;
    placeholder?: string;
}

export type StyledDatetimeMultiProps = {
    setValue: (date: Date) => void;
    value: Date;
    comparisonDate?: Date;
    style?: React.CSSProperties;
    data: {
        dayInput: DatetimeMultiItem,
        dateInput: DatetimeMultiItem,
        timeInput?: DatetimeMultiItem
    };
    disabled?: boolean;
    idPrefix?: string;
    isSmall?: boolean;
    onlyDate?: boolean;
    removeMinDate?: boolean;
}


const StyledDatetimeMultiInput: React.FC<StyledDatetimeMultiProps> = (props: StyledDatetimeMultiProps) => {
    const valueDate = dayjs(props.value);
    const compDate = dayjs(props.comparisonDate) || dayjs();
    const earliestDate = valueDate.isBefore(compDate) ? valueDate : compDate;

    const handleDayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const dayValue = parseInt(event.target.value.replace(/[^0-9]/g, ''));
        if (dayValue > 365) return;
        if (!isNaN(dayValue)) {
            props.setValue(compDate.hour(valueDate.hour()).minute(valueDate.minute()).add(dayValue, 'day').toDate());
        } else {
            props.setValue(compDate.hour(valueDate.hour()).minute(valueDate.minute()).toDate());
        }
    }

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const dateValue = dayjs(event.target.value);
        if (dateValue.isValid()) {
            const updatedDate = valueDate.year(dateValue.year()).month(dateValue.month()).date(dateValue.date());
            props.setValue(updatedDate.hour(valueDate.hour()).minute(valueDate.minute()).toDate());
        } else {
            props.setValue(compDate.hour(valueDate.hour()).minute(valueDate.minute()).toDate());
        }
    }

    const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const timeValue = dayjs(`${valueDate.format('YYYY-MM-DD')} ${event.target.value}`, 'YYYY-MM-DD HH:mm');
        if (timeValue.isValid()) {
            props.setValue(timeValue.year(valueDate.year()).month(valueDate.month()).day(valueDate.day()).toDate());
        } else {
            props.setValue(compDate.year(valueDate.year()).month(valueDate.month()).day(valueDate.day()).toDate());
        }
    }

    return <StyledInputContainer style={props.style}>

        {props.onlyDate ?  <div style={{ display: "flex", flexDirection: "column", flex: "1", paddingBottom: "8px" }}>
            {props.data.dateInput.label && <StyledLabel htmlFor={`${props.idPrefix}_DateInput`}>{props.data.dateInput.label}</StyledLabel>}
            <StyledInput type="date"
                        isSmall={props.isSmall}
                            style={{}}
                         id={`${props.idPrefix}_DateInput`}
                         min={props.removeMinDate ? '' : compDate.format('YYYY-MM-DD')}
                         max={compDate.add(365, 'day').format('YYYY-MM-DD')}
                         value={valueDate.format('YYYY-MM-DD')}
                         onChange={handleDateChange}
                         disabled={props.disabled}
                         placeholder={props.data.dateInput.placeholder}
                         required
            />
        </div> : <><div style={{ display: "flex", flexDirection: "column", flex: "1", borderRight: `1px solid ${colors.gray300}`, paddingBottom: "8px", paddingRight:'20px' }}>
            {props.data.dayInput.label && <StyledLabel htmlFor={`${props.idPrefix}_DaysInput`}>{props.data.dayInput.label}</StyledLabel>}
            <StyledInput type="number"
                        isSmall={props.isSmall}
                        style={{width:'100%'}}
                         id={`${props.idPrefix}_DaysInput`}
                         min="1"
                         max="365"
                         value={`${valueDate.startOf('day').diff(compDate.startOf('day'), 'day')}`}
                         onChange={handleDayChange}
                         disabled={props.disabled}
                         placeholder={props.data.dayInput.placeholder}
                         required
            />
        </div>

        <div style={{ display: "flex", flexDirection: "column", flex: "1", borderRight: props.data.timeInput && `1px solid ${colors.gray300}`, paddingBottom: "8px" }}>
            {props.data.dateInput.label && <StyledLabel htmlFor={`${props.idPrefix}_DateInput`}>{props.data.dateInput.label}</StyledLabel>}
            <StyledInput type="date"
                        isSmall={props.isSmall}
                            style={{width: props.isSmall ? '140px' : ''}}
                         id={`${props.idPrefix}_DateInput`}
                         min={earliestDate.format('YYYY-MM-DD')}
                         max={compDate.add(365, 'day').format('YYYY-MM-DD')}
                         value={valueDate.format('YYYY-MM-DD')}
                         onChange={handleDateChange}
                         disabled={props.disabled}
                         placeholder={props.data.dateInput.placeholder}
                         required
            />
        </div>

        {props.data.timeInput && <div style={{ display: "flex", flexDirection: "column", flex: "1", paddingBottom: "8px" }}>
            {props.data.timeInput.label && <StyledLabel htmlFor={`${props.idPrefix}_TimeInput`}>{props.data.timeInput.label}</StyledLabel>}
            <StyledInput type="time"
                        isSmall={props.isSmall}
                         id={`${props.idPrefix}_TimeInput`}
                         value={valueDate.format('HH:mm')}
                         onChange={handleTimeChange}
                         disabled={props.disabled}
                         placeholder={props.data.timeInput.placeholder}
                         required
            />
        </div>}</>}
    </StyledInputContainer>
}

export default StyledDatetimeMultiInput;