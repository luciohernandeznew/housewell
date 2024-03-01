import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { makeAuthedApiRequest } from "../utils/api/apiHelper";
import {RootState} from "../store";
import {fetchMessages} from "./messages";
import {fetchEventsByPropertyDashboard} from "./events";
import {fetchOfferById} from "./offers";
import {fetchChats} from "./chats";
import {LOGOUT_USER} from "../constants";


// todo: split model to own file
export type NotificationModel = {
    id: string;
    userId: string;
    objectId: string;
    notifType: 'MSG' | 'OFFER' | 'EVENT' | 'SYS';
    read: boolean;
    title: string;
    description?: string;
    timestamp: Date;
}

export interface NotificationsState {
    notifications: NotificationModel[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

export const initialState: NotificationsState = {
    notifications: [],
    status: 'idle',
    error: null,
};

export const selectUnreadMsgNotifications = (state: RootState) => 
    state.notificationReducer.notifications.filter(
        (notif: NotificationModel) => notif.notifType === 'MSG' && notif.read === false
    );

export const selectUnreadNonMsgNotifications = (state: RootState) =>
    state.notificationReducer.notifications.filter(
        (notif: NotificationModel) => notif.notifType !== 'MSG' && notif.read === false
    );
export const selectNonMsgNotifications = (state: RootState) =>
    state.notificationReducer.notifications.filter(
        (notif: NotificationModel) => notif.notifType !== 'MSG'
    );
export const selectUnreadNotifications = (state: RootState) =>
    state.notificationReducer.notifications.filter(
        (notif: NotificationModel) => notif.read === false
    );

    


export const markNotificationsAsRead = createAsyncThunk(
    'notifications/markAsRead',
    async (objectId: string, thunkAPI) => {
        
        const rootState = thunkAPI.getState() as RootState;

        // Get notifications with the provided objectId
        const notifications = rootState.notificationReducer.notifications.filter(
            (notif: NotificationModel) => notif.objectId === objectId
        );
        

        const notificationIds = notifications.map((notif: NotificationModel) => notif.id);

        // Send the request to the API
        const response = await makeAuthedApiRequest({
            method: 'post',
            urlExtension: '/v1/notification/readNotificationsById',
            data: { ids: notificationIds },
        });

        return response.data;
    }
);

export const readAllNonMessageNotifications = createAsyncThunk(
    'notifications/markAllNonMessageAsRead',
    async (_, thunkAPI) => {
        const rootState = thunkAPI.getState() as RootState;
        const response = await makeAuthedApiRequest({
            method: 'post',
            urlExtension: '/v1/notification/readAllNonMessageNotifications',
            data: { userId: rootState.userReducer.user?.id },
        });

        return response.data;
    }
);

export const fetchNotifications = createAsyncThunk(
    'notifications/fetch',
    async (_, thunkAPI) => {
        const response = await makeAuthedApiRequest({
            method: 'post',
            urlExtension: '/v1/notification/getNotifications'
        });
        const notifications = response.data as NotificationModel[];

        // sorry for this code
        const currNotifs = (thunkAPI.getState() as RootState).notificationReducer.notifications.slice();
        if (notifications.slice()
            .some((notification) =>
                !currNotifs.some((curr: NotificationModel) => curr.id === notification.id) && notification.notifType === 'MSG')) {
            thunkAPI.dispatch(fetchChats());
            thunkAPI.dispatch(fetchMessages());
        }


        notifications.slice().forEach((notification) => {
            if (!currNotifs.some((curr: NotificationModel) => curr.id === notification.id) && notification.notifType === 'OFFER' && !notification.read && notification.objectId) {
                thunkAPI.dispatch(fetchOfferById({offerId: notification.objectId }));
            }
            if (!currNotifs.some((curr: NotificationModel) => curr.id === notification.id) && notification.notifType === 'EVENT' && notification.objectId) {
                thunkAPI.dispatch(fetchEventsByPropertyDashboard({propertyId: notification.objectId}));
            }
        });

        return notifications;
    }
);

export const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(LOGOUT_USER, (state) => {
                return initialState;
            })
            .addCase(fetchNotifications.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchNotifications.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.notifications = action.payload;
            })
            .addCase(fetchNotifications.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message ?? 'Unknown error';
            })
            .addCase(markNotificationsAsRead.fulfilled, (state, action) => {
                action.payload.forEach((id: string) => {
                    const notif = state.notifications.find((notif) => notif.id === id);
                    if (notif) notif.read = true;
                });
            })
            .addCase(markNotificationsAsRead.rejected, (state, action) => {
                state.error = action.error.message ?? 'Unknown error';
            })
            .addCase(readAllNonMessageNotifications.fulfilled, (state) => {
                state.notifications.forEach((notif) => {
                    if (notif.notifType !== 'MSG') {
                        notif.read = true;
                    }
                });
            });
    },
})

export const {  } = notificationSlice.actions

export default notificationSlice.reducer;