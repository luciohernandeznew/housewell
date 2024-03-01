import React, {ReactNode, useEffect, useState} from 'react';
import {useRouter} from "next/router";
import SecondaryButton from "../../src/components/buttons/SecondaryButton";
import Image from "next/image";
import styled from "@emotion/styled";
import ListingTab from "../../src/components/property-admin/ListingTab";
import AvailabilityTab, {SchedulingPageProps} from '../../src/components/scheduling/AvailabilityTab';
import OffersTab from "../../src/components/property-admin/OffersTab";
import {GetServerSidePropsContext} from "next";
import {getCookie, setCookie} from "cookies-next";
import {makeAuthedApiRequest} from "../../src/utils/api/apiHelper";
import {
    SchedulingConfig,
    timeZoneOfficialZoneMapping,
    WeeklySchedule
} from "../../src/components/scheduling/AvailabilityTab";

import { H4, H6, MintParagraph } from "../../src/components/Typography/Typography";
import dayjs from "dayjs";
import {useAppDispatch, useAppSelector, initializeStore} from "../../src/store";
import {fetchEventsByPropertyDashboard} from "../../src/slices/events";
import { fetchOffersByPropertyId } from "../../src/slices/offers";
import {fetchProperties} from "../../src/slices/properties";
import { colors } from '../../src/styles/colors';
import { useDevice } from "../../src/contexts/DeviceContext";
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'



TimeAgo.addDefaultLocale(en)



const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    
    & > h1, & > h2, & > h4 {
        margin: 0;
    }
`;

const TabNav = styled.div<{selected: boolean, isMobile?: boolean}>`
    display: flex;
    align-items: center;
    
    font-family: 'Mint Grotesk Medium';
    font-weight: ${props => props.selected ? "bold" : "400"};
    font-size: ${props => props.isMobile ? "20px" : "24px"};
    
    margin-right: 8px;
    margin-bottom: ${props => props.selected ? "0px" : "3px"};
    padding-bottom: 12px;
    
    color: ${props => props.selected ? "#202626" : "#303831"};
    border-bottom: ${props => props.selected ? "3px solid #202626" : "none"};
`;

const NotifBadge = styled.div<{selected: boolean}>`
    display: flex;
    align-items: center;
    justify-content: center;
    
    width: 20px;
    height: 24px;
    padding: 3px 6px;
    margin-left: 10px;
    
    background: ${props => props.selected ? "#E0650D" : "#CACFCA"};
    color: ${props => props.selected ? "white" : "black"};
    border-radius: 38px;
`;

const createTabNav = (text: string, index: number, tab: number, setTab: (tab: number) => void, notifs: number, isMobile?: boolean) => {
    return(<TabNav selected={index === tab} onClick={() => setTab(index)} isMobile={isMobile}>
        {text}
        {notifs > 0 && <NotifBadge selected={index === tab}>{notifs}</NotifBadge>}
    </TabNav>)
}

const isParsed = (weeklyScheduleData: WeeklySchedule) => {
    let ret = false;

    Object.values(weeklyScheduleData).forEach((dailySchedule) => {
        dailySchedule.timeSlots.forEach((slot) => {
            if (slot.end.includes("am") || slot.end.includes("pm")) ret = true;
        })
    })

    return ret;
}

// todo: handle unauthorized users
const PropertyAdminPage = (props: SchedulingPageProps) => {
    const router = useRouter();
    const { isMobile } = useDevice();
    // @ts-ignore
    const {propertyId} = (router.query.propertyId ? router.query : props) as string; // todo: fix whatever is wrong w/ typescript w/ this line

    const offers = useAppSelector((state) => state.offersReducer.offersByProperty);
    const properties = useAppSelector((state) => state.propertiesReducer.properties);
    const eventsByProperty = useAppSelector((state) => state.eventReducer.eventsByProperty);
    const events = eventsByProperty?.[propertyId] || [];
    const timeAgo = new TimeAgo('en-US')


    const [tab, setTab] = useState(3);


    const {availConfig} = props;


    const property = properties[propertyId];

    const schedule = props.weeklyScheduleData;
    if (schedule && !isParsed(schedule)) {
        Object.values(schedule).forEach((dailySchedule) => {
            dailySchedule.timeSlots.forEach((slot) => {
                // @ts-ignore
                const timezoneString = timeZoneOfficialZoneMapping[availConfig.timeZone];

                const currentDateUtc = dayjs.utc();
                const combinedUtcDateTimeStart = dayjs.utc(`${currentDateUtc.format('YYYY-MM-DD')}T${slot.start}`);
                const combinedUtcDateTimeEnd = dayjs.utc(`${currentDateUtc.format('YYYY-MM-DD')}T${slot.end}`);
                const convertedStart = combinedUtcDateTimeStart.tz(timezoneString);
                const convertedEnd = combinedUtcDateTimeEnd.tz(timezoneString);
                const convertedStartString = convertedStart.format('h:mma');
                const convertedEndString = convertedEnd.format('h:mma');
                slot.start = convertedStartString;
                slot.end = convertedEndString;
            })
        })
    }

    if (!property) {
        return <>LOADING</> // todo: better loading
    }

    let tabComp : ReactNode = null;
    if (tab === 1) {
        tabComp = <ListingTab property={property}/>
    } else if (tab === 2) {
        tabComp = <AvailabilityTab availConfig={availConfig} weeklyScheduleData={props.weeklyScheduleData} propertyId={propertyId} events={events}/>
    } else if (tab === 3) {
        tabComp = <OffersTab offers={offers[propertyId]} listPrice={`${property.listPrice}`} />
    }

    return (
        <div style={{ margin: isMobile ? '0 4%' : "0 4%" }}>
            <SecondaryButton size='medium' hasArrow isLight borderless reverseArrow text={"Dashboard"} style={{ margin: "12px 0" }} onClick={() => router.push("/dashboard")} />
            <div style={{ display: "flex", minHeight: '180px', marginBottom: isMobile ? '32px' : "64px" }}>
                {!isMobile && <Image
                    style={{ borderRadius: "12px" }}
                    src={property.coverImage || "/property_placeholder.png"}
                    alt="Dashboard Property"
                    height={220}
                    width={330} />}
                <div style={{ display: "flex", justifyContent: 'space-between', marginLeft: isMobile ? '0' : "32px", borderBottom: "1px solid rgba(0, 0, 0, 0.07)", flexGrow: 2 }}>
                    <TextContainer>

                        <div style={{display:'flex', marginBottom: isMobile ? '24px' : 0}}>
                            <div>
                                {isMobile ? <H6>{property.streetAddress ? property.streetAddress: "Street Address Not Set"}</H6> :<H4>{property.streetAddress ? property.streetAddress: "Street Address Not Set"}</H4>}
                                {isMobile ? <H6>{`${property.city ? property.city + ',' : ''} ${property.state ? property.state : ''} ${property.zip ? property.zip : ''}`}</H6> 
                                : <H4>{`${property.city ? property.city + ',' : ''} ${property.state ? property.state : ''} ${property.zip ? property.zip : ''}`}</H4>}
                            </div>
                            {isMobile && <div style={{ marginLeft: "auto", textAlign: "right" }}>
                                <MintParagraph size='24' weight='medium' style={{ margin: "0 0 12px 0", color:colors.gray1000}}>{!property?.listPrice ? "Price Not Set" : '$' + parseFloat(property.listPrice?.toString() || '0').toLocaleString('en-US', { maximumFractionDigits: 0 })}</MintParagraph>
                                <MintParagraph size='14' weight='medium' style={{color: colors.gray700}}>
                                {property.listedDate ? 
                                    "Active for " + timeAgo.format(new Date(property.listedDate)).replace(" ago", "") 
                                    : "Not yet listed"}
                            </MintParagraph></div>}
                        </div>
                        <div style={{ display: "flex", marginTop: "auto", width: isMobile ? '92vw' : "400px", justifyContent: "space-between" }}>
                            {createTabNav("Listing", 1, tab, setTab, 0, isMobile)}
                            {createTabNav("Showings", 2, tab, setTab, events.length, isMobile)}
                            {createTabNav("Offers", 3, tab, setTab, offers?.[propertyId]?.length || 0, isMobile)}
                        </div>
                    </TextContainer>
                    {!isMobile && <div style={{ marginLeft: "auto", textAlign: "right" }}>
                        <MintParagraph size='32' weight='medium' style={{ margin: "0 0 12px 0", color:colors.gray1000}}>{!property?.listPrice ? "Price Not Set" : '$' + parseFloat(property.listPrice?.toString() || '0').toLocaleString('en-US', { maximumFractionDigits: 0 })}</MintParagraph>
                        <MintParagraph size='14' weight='medium' style={{color: colors.gray700}}>
                            {property.listedDate ? 
                                "Active for " + timeAgo.format(new Date(property.listedDate)).replace(" ago", "") 
                                : "Not yet listed"}
                        </MintParagraph></div>
                    }
                </div>
            </div>
            <div>
                {tabComp}
            </div>
        </div>
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    try {
        // should probably change this so propid passed in via url then we validate if user has access to that property
        const {req, res, query} = context;
        let propertyId = query.propertyId as string;
        const timeSlotsRequest = {
            method: 'post',
            urlExtension: '/v1/availTimeslot/getAvailTimeslots',
            data: {propertyId},
            isServer: true,
            req,
            res
        }
        const getAvailConfig = {
            method: 'get',
            urlExtension: '/v1/availConfig/getAvailConfig',
            data: {propertyId},
            isServer: true,
            req,
            res
        }

        // todo: fix ts problem
        // @ts-ignore
        const [availTimeSlotsResponse, availConfigResponse] = await Promise.all([makeAuthedApiRequest(timeSlotsRequest), makeAuthedApiRequest(getAvailConfig)]);
        const store = initializeStore();
        await Promise.all([
            store.dispatch(fetchProperties({ isServer: true, req: context.req, res: context.res })),
            store.dispatch(fetchOffersByPropertyId({ isServer: true, req: context.req, res: context.res, propertyId })),
            store.dispatch(fetchEventsByPropertyDashboard({ isServer: true, req: context.req, res: context.res, propertyId }))
        ]);
          // Get only the part of the state that has changed (propertiesReducer in this case)
        const { propertiesReducer, offersReducer, eventReducer } = store.getState();


        return {
            props: {
                weeklyScheduleData: availTimeSlotsResponse?.data as WeeklySchedule,
                propertyId,
                availConfig: availConfigResponse?.data as SchedulingConfig,
                initialState: { propertiesReducer, offersReducer, eventReducer }
            }
        };
    } catch (error) {
        console.error("ERROR", error);
        return {props: {}}
    }
}

export default PropertyAdminPage;