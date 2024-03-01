import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {makeAuthedApiRequest} from "../utils/api/apiHelper";
import {LOGOUT_USER} from "../constants";


export type UserSettingsModel = {
    id: string;
    updateFrequency: number;
    notifMessageApp: boolean;
    notifMessageEmail: boolean;
    notifMessageSMS: boolean;
    notifShowingApp: boolean;
    notifShowingEmail: boolean;
    notifShowingSMS: boolean;
    notifShowingReminderApp: boolean;
    notifShowingReminderEmail: boolean;
    notifShowingReminderSMS: boolean;
    notifOfferApp: boolean;
    notifOfferEmail: boolean;
    notifOfferSMS: boolean;
    notifOfferUpdateApp: boolean;
    notifOfferUpdateEmail: boolean;
    notifOfferUpdateSMS: boolean;
}

export interface UserSettingsState {
    settings?: UserSettingsModel;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

export const initialState: UserSettingsState = {
    status: 'idle',
    error: null,
};

export const fetchUserSettings = createAsyncThunk(
    'userSettings/fetch',
    async () => {
        const response = await makeAuthedApiRequest({
            method: 'post',
            urlExtension: '/v1/userSettings/getUserSettings'
        });
        return response.data as UserSettingsModel;
    }
)

export const updateUserSettings = createAsyncThunk(
    'userSettings/update',
    async (data: {
        key: string, value: any
    }, thunkApi) => {
        const response = await makeAuthedApiRequest({
            method: 'post',
            urlExtension: '/v1/userSettings/updateUserSettings',
            data: data
        });
        return response.data as UserSettingsModel;
    }
)

export const userSettingsSlice = createSlice({
    name: 'userSettings',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(LOGOUT_USER, (state) => {
                return initialState;
            })
            .addCase(fetchUserSettings.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUserSettings.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.settings = action.payload;
            })
            .addCase(fetchUserSettings.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message ?? 'Unknown error';
            })
            .addCase(updateUserSettings.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateUserSettings.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.settings = action.payload;
            })
            .addCase(updateUserSettings.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message ?? 'Unknown error';
            });
    },
})

export const {  } = userSettingsSlice.actions

export default userSettingsSlice.reducer;