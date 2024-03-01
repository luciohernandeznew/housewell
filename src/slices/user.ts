import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {makeAuthedApiRequest} from "../utils/api/apiHelper";
import { AxiosError } from "axios";
import {LOGOUT_USER} from "../constants";


export type UserModel = {
    id: string,
    email: string,
    propertyId?: string,
    onboardingStep?: string,
    signInType: 'local' | 'google' | 'facebook' | 'apple',
    userType?: 'agent' | 'consumer' | 'admin',
    transactionSideType?: 'buyer' | 'seller',
    planType?: 'none' | 'standard' |'premium',
    phoneNumber?: string
    firstName?: string
    lastName?: string
    profilePictureUrl?: string
    pylonUserId?: string
    color: string
    hasSeenScheduleModal?: boolean;
    intercomHash?: string;
}

export const fetchUser = createAsyncThunk(
    'user/fetch',
    async (_, { rejectWithValue }) => {
        try {
            const response = await makeAuthedApiRequest({
                method: 'post',
                urlExtension: '/v1/user/getPersonalDetails'
            });
            return response.data as UserModel;
        } catch (error) {
            const axiosError = error as AxiosError;
            if (axiosError && axiosError.response && axiosError.response.status === 401) {
                return rejectWithValue(axiosError.response.data);
            }

            throw error;
        }
    }
)

export const updateUserHasSeenScheduleModal = createAsyncThunk(
    'user/updateHasSeenScheduleModal',
    async (hasSeenScheduleModal: boolean, { rejectWithValue }) => {

        try {
            console.log('hasSeenScheduleModal', hasSeenScheduleModal);
            const response = await makeAuthedApiRequest({
                method: 'post',
                urlExtension: '/v1/user/updateHasSeenScheduleModal',
                data: { hasSeenScheduleModal },
            });
            return response.data as UserModel;
        } catch (error) {
            const axiosError = error as AxiosError;
            if (axiosError.response) {
                return rejectWithValue(axiosError.response.data);
            }
            throw error;
        }
    }
);

export interface UserState {
    user?: UserModel
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

export const initialState: UserState = {
    user: undefined,
    status: 'idle',
    error: null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(LOGOUT_USER, (state) => {
                return initialState;
            })
            .addCase(fetchUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.error = null;
                state.user = action.payload;
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string ?? 'Unknown error';
            })
            .addCase(updateUserHasSeenScheduleModal.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateUserHasSeenScheduleModal.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.error = null;
                state.user = action.payload; // Updates the user data with the response
            })
            .addCase(updateUserHasSeenScheduleModal.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string ?? 'Unknown error';
            });
    },
})

export const {  } = userSlice.actions

export default userSlice.reducer;