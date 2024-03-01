import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {makeAuthedApiRequest} from "../utils/api/apiHelper";
import {LOGOUT_USER} from "../constants";
import { IncomingMessage, ServerResponse } from 'http';
import { AxiosError } from 'axios';
import { isAxiosError } from "../utils/helpers";

// todo: move models
export type EventModel = {
    id: string;
    schedulerId: string;
    propertyId: string;
    start: Date;
    end: Date;
    length: number;
    approved: boolean;
    canceled: boolean;
    type: number;
    firstName?: string;
    lastName?: string;
    streetAddress?: string;
    address2?: string;
    city?: string;
    state?: string;
    zip?: string;
    groupId?: string;
}


export type SanitizedEventModel = {
    propertyId: string,
    start: string,
    end: string,
    length: number
}

export interface EventsState {
    events: EventModel[];
    eventsByProperty: { [key: string]: EventModel[] };
    failedBackgroundCheck: boolean;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

export const initialState: EventsState = {
    events: [],
    eventsByProperty: {},
    failedBackgroundCheck: false,
    status: 'idle',
    error: null,
};

export const fetchEvents = createAsyncThunk(
    'events/fetch',
    async (
        arg: { 
            isServer?: boolean; 
            req?: IncomingMessage; 
            res?: ServerResponse 
        }, 
        { rejectWithValue }
    ) => {
        try {
            const { isServer, req, res } = arg;

            const response = await makeAuthedApiRequest({
                method: 'post',
                urlExtension: '/v1/event/getEvents',
                isServer,
                req,
                res
            });

            return response.data as EventModel[];

        } catch (err) {
            const axiosError = err as AxiosError;
            return rejectWithValue(axiosError?.response?.data);
        }
    }
);
export const fetchEventsByPropertyDashboard = createAsyncThunk(
    'events/fetchByPropertyDashboard',
    async (
        arg: { 
            propertyId: string; 
            isServer?: boolean; 
            req?: IncomingMessage; 
            res?: ServerResponse 
        }, 
        { rejectWithValue }
    ) => {
        try {
            const { propertyId, isServer, req, res } = arg;
            const data = {
                propertyId
            };

            const response = await makeAuthedApiRequest({
                method: 'post',
                urlExtension: '/v1/event/getEventsByPropertyDashboard',
                data,
                isServer,
                req,
                res
            });
            return response.data as EventModel[];

        } catch (err) {
            const axiosError = err as AxiosError;
            return rejectWithValue(axiosError?.response?.data);
        }
    }
);


export const approveEvent = createAsyncThunk(
    'events/approve',
    async (eventId: string) => {
        const response = await makeAuthedApiRequest({
            method: 'post',
            urlExtension: '/v1/event/approveEvent',
            data: { eventId }
        });
        return response.data as EventModel;  
    }
);

export const cancelEvent = createAsyncThunk(
    'events/cancel',
    async (eventId: string) => {
        console.log('cancelling', eventId)
        const response = await makeAuthedApiRequest({
            method: 'post',
            urlExtension: '/v1/event/cancelEvent',
            data: { eventId }
        });
        return response.data as EventModel;
    }
);

export const createEvent = createAsyncThunk(
    'events/create',
    async (eventData: {
        propertyId: string,
        start: Date,
        end: Date,
        length: number
    }, { rejectWithValue }) => {
        try {
            const response = await makeAuthedApiRequest({
                method: 'post',
                urlExtension: '/v1/event/createEvent',
                data: eventData
            });
            return response.data as EventModel;
        } catch (error) {
            const axiosError = error as AxiosError;
            return rejectWithValue(axiosError.response?.data);
        }
    }
);


export const eventsSlice = createSlice({
    name: 'events',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(LOGOUT_USER, (state) => {
                return initialState;
            })
            .addCase(fetchEvents.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchEvents.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.events = action.payload;
            })
            .addCase(fetchEvents.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message ?? 'Unknown error';
            })

            .addCase(fetchEventsByPropertyDashboard.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchEventsByPropertyDashboard.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const propertyId = action.meta.arg.propertyId;
                if (!state.eventsByProperty[propertyId]) {
                    state.eventsByProperty[propertyId] = [];
                }
                action.payload.forEach((event: EventModel) => {
                    const eventExists = state.eventsByProperty[propertyId].some(existingEvent => existingEvent.id === event.id);
                    if (!eventExists) {
                        state.eventsByProperty[propertyId].push(event);
                    }
                });
            })
            .addCase(fetchEventsByPropertyDashboard.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message ?? 'Unknown error';
            })
            .addCase(approveEvent.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const event = action.payload;
                const index = state.events.findIndex(e => e.id === event.id);
                if (index !== -1) {
                    state.events[index] = event;
                }
                const propertyEvents = state.eventsByProperty[event.propertyId];
                if (propertyEvents) {
                    const propertyEventIndex = propertyEvents.findIndex(e => e.id === event.id);
                    if (propertyEventIndex !== -1) {
                        propertyEvents[propertyEventIndex] = event;
                    }
                }
            })
            .addCase(approveEvent.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message ?? 'Unknown error';
            })

            .addCase(cancelEvent.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const event = action.payload;
                const index = state.events.findIndex(e => e.id === event.id);
                
                if (index !== -1) {
                    state.events[index].canceled = true;
                }
                
                const propertyEvents = state.eventsByProperty[event.propertyId];
                if (propertyEvents) {
                    const propertyEventIndex = propertyEvents.findIndex(e => e.id === event.id);
                    if (propertyEventIndex !== -1) {
                        propertyEvents.splice(propertyEventIndex, 1);
                    }
                }
            })
            .addCase(cancelEvent.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message ?? 'Unknown error';
            })

            .addCase(createEvent.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createEvent.fulfilled, (state, action) => {
                state.failedBackgroundCheck = false;
                state.status = 'succeeded';
        
                state.events = [...state.events, action.payload];
            })
            .addCase(createEvent.rejected, (state, action) => {
                state.status = 'failed';
                if (action.payload) {
                    // Assuming action.payload will have the structure { error: string, code: string }
                    const errorData = action.payload as any; // Use an appropriate type here
                    if (errorData.code === 'BKD_CHK_FAIL') {
                        state.failedBackgroundCheck = true;
                    }
                    state.error = errorData.error ?? 'Unknown error';
                } else {
                    state.error = action.error.message ?? 'Unknown error';
                }
            });
        
    },
})

export const {  } = eventsSlice.actions

export default eventsSlice.reducer;