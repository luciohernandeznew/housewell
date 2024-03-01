import ScheduleEvent from "../../src/components/reactPages/ScheduleEvent";
import {GetServerSidePropsContext} from "next";
import {makeAuthedApiRequest} from "../../src/utils/api/apiHelper";
import {SchedulingConfig, WeeklySchedule} from "../../src/components/scheduling/AvailabilityTab";
import {SanitizedEventModel} from "../../src/slices/events";

export type ScheduleEventPageProps = {
    weeklyScheduleData?: WeeklySchedule
    availConfig?: SchedulingConfig,
    propertyEvents?: SanitizedEventModel[],
    propertyData?: BasicAddressData,
}
export type BasicAddressData = {
    streetAddress?: string,
    city?: string,
    state?: string,
    zip?: string,
    address2?: string,
    propertyId?: string,
}


const ScheduleEventPage = (props: ScheduleEventPageProps) => {
    return (
        <ScheduleEvent
            weeklyScheduleData={props.weeklyScheduleData}
            availConfig={props.availConfig}
            propertyEvents={props.propertyEvents}
            propertyData={props.propertyData}
        />
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    try {
        const { req, res } = context;
        const { propertyId } = context.query;
        if (!propertyId) return {props: {}};

        const baseParams = {
            data: {propertyId},
            isServer: true,
            req,
            res
        }

        const availTimeSlotsResponse = await makeAuthedApiRequest({
            method: 'post',
            urlExtension: '/v1/availTimeslot/getAvailTimeslots',
            ...baseParams
        });

        const availConfigResponse = await makeAuthedApiRequest({
            method: 'get',
            urlExtension: '/v1/availConfig/getAvailConfig',
            ...baseParams
        });

        const propertyEventsResponse = await makeAuthedApiRequest({
            method: 'post',
            urlExtension: '/v1/event/getEventsByProperty',
            ...baseParams
        });
        const propertyData = await makeAuthedApiRequest({
            method: 'get',
            urlExtension: '/v1/property/basicAddressInfo',
            ...baseParams
        });

        return {
            props: {
                weeklyScheduleData: availTimeSlotsResponse?.data as WeeklySchedule,
                availConfig: availConfigResponse?.data as SchedulingConfig,
                propertyEvents: propertyEventsResponse?.data as SanitizedEventModel[],
                propertyData: propertyData?.data?.property as BasicAddressData,
            }
        }
    } catch (error) {
        console.log("ERROR", error);
        return {props: {}}
    }
}

export default ScheduleEventPage;