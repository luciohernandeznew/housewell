import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { UserModel } from './user';
import { makeAuthedApiRequest } from '../utils/api/apiHelper';
import {LOGOUT_USER} from "../constants";
import { IncomingMessage, ServerResponse } from 'http';
import { AxiosError } from 'axios';

  
export type GroupModel = {
    id: string;
    ownerUser: string;
    name: string;
    loanApplicationId?: string;
    createdAt: string;
    updatedAt: string;
    hasStartedLoanApp: boolean;
}
  
export type GroupWithMembersModel = {
    group: GroupModel;
    members: UserModel[];
}
  
type GroupsState = {
    groups: GroupWithMembersModel[];
    selectedGroupId?: string;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}


  
export const fetchUserGroups = createAsyncThunk(
    'groups/fetch',
    async (arg: { isServer?: boolean; req?: IncomingMessage; res?: ServerResponse }, { rejectWithValue }) => {
        try {
            const { isServer, req, res } = arg;

            const response = await makeAuthedApiRequest({
                method: 'post',
                urlExtension: '/v1/group/getUserGroups',
                isServer,
                req,
                res,
            });

            return response.data as GroupWithMembersModel[];
        } catch (err) {
            const axiosError = err as AxiosError;
            return rejectWithValue(axiosError?.response?.data);
        }
    }
);

export const createGroup = createAsyncThunk(
    'groups/create',
    async (groupName: string) => {
        const response = await makeAuthedApiRequest({
            method: 'post',
            urlExtension: '/v1/group/create',
            data: {
                groupName
            }
        });
        return response.data as GroupWithMembersModel;
    }
);
  
const initialState: GroupsState = {
    groups: [],
    status: 'idle',
    error: null,
};
  
export const groupsSlice = createSlice({
    name: 'groups',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(LOGOUT_USER, (state) => {
                return initialState;
            })
            .addCase(fetchUserGroups.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUserGroups.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.groups = action.payload;
            })
            .addCase(fetchUserGroups.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message ?? 'Unknown error';
            })
            .addCase(createGroup.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createGroup.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.groups = [...state.groups, action.payload];
            })
            .addCase(createGroup.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message ?? 'Unknown error';
            })
    },
})
export default groupsSlice.reducer;