import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { makeAuthedApiRequest } from '../utils/api/apiHelper';
import { AxiosError } from 'axios';
import { LOGOUT_USER } from '../constants';
import { BasicProperty } from '../models/basicProperty';
import { IncomingMessage, ServerResponse } from 'http';




export type LikedPropertyModel = {
    propertyId: string,
    property: BasicProperty
};


export const fetchLikedProperties = createAsyncThunk(
    'likedProperties/fetch',
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
                method: 'get',
                urlExtension: '/v1/likedProperties/getLikedProperties',
                isServer,
                req,
                res
            });

            return response.data as LikedPropertyModel[];

        } catch (error) {
            const axiosError = error as AxiosError;
            return rejectWithValue(axiosError.response?.data ?? 'Unknown error');
        }
    }
);
export const likeProperty = createAsyncThunk(
    'likedProperties/like',
    async (propertyId: string, { rejectWithValue }) => {
        try {
            const response = await makeAuthedApiRequest({
                method: 'post',
                urlExtension: '/v1/likedProperties/likeProperty',
                data: { propertyId }
            });

            return response.data as LikedPropertyModel;

        } catch (error) {
            const axiosError = error as AxiosError;
            return rejectWithValue(axiosError.response?.data ?? 'Unknown error');
        }
    }
);



export const deleteLikedProperty = createAsyncThunk(
    'likedProperties/delete',
    async (propertyId: string, { rejectWithValue }) => {
        try {
            await makeAuthedApiRequest({
                method: 'post',
                urlExtension: '/v1/likedProperties/deleteLikedProperty',
                data: { propertyId }
            });
            return propertyId;
        } catch (error) {
            const axiosError = error as AxiosError;
            return rejectWithValue(axiosError.response?.data ?? 'Unknown error');
        }
    }
);



export interface LikedPropertiesState {
    likedProperties: LikedPropertyModel[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

export const initialState: LikedPropertiesState = {
    likedProperties: [],
    status: 'idle',
    error: null,
};

export const likedPropertiesSlice = createSlice({
    name: 'likedProperties',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(LOGOUT_USER, () => initialState)
            .addCase(fetchLikedProperties.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchLikedProperties.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.error = null;
                state.likedProperties = action.payload;
            })
            .addCase(fetchLikedProperties.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string ?? 'Unknown error';
            })
            .addCase(deleteLikedProperty.fulfilled, (state, action) => {
                state.likedProperties = state.likedProperties.filter(lp => lp.propertyId !== action.payload);
            })
            .addCase(deleteLikedProperty.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string ?? 'Unknown error';
            })
            .addCase(likeProperty.fulfilled, (state, action) => {
                // Assuming that the payload is the liked property,
                // and it's not already in the state.
                const existingProperty = state.likedProperties.find(lp => lp.propertyId === action.payload.propertyId);
                if (!existingProperty) {
                    state.likedProperties.push(action.payload);
                }
            })
            .addCase(likeProperty.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string ?? 'Unknown error';
            });
    },
});

export default likedPropertiesSlice.reducer;
