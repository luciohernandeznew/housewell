import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {makeAuthedApiRequest} from "../utils/api/apiHelper";
import {LOGOUT_USER} from "../constants";


export type MessageModel = {
    id: string;
    userId: string;
    chatId: string;
    chatType: 'USER' | 'GROUP' | 'PROPERTY' | 'PHONE';
    text: string;
    attachments?: string;
    sendTime: Date;
    editTime?: Date;
    read: boolean;
}

export interface MessagesState {
    messages: MessageModel[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

export const initialState: MessagesState = {
    messages: [],
    status: 'idle',
    error: null,
};

export const fetchMessages = createAsyncThunk(
    'messages/fetch',
    async () => {
        const response = await makeAuthedApiRequest({
            method: 'post',
            urlExtension: '/v1/message/getMessages'
        });
        return response.data as MessageModel[];
    }
)

export const sendMessage = createAsyncThunk(
    'messages/send',
    async (messageData: {
        chatId: string;
        chatType: 'USER' | 'GROUP' | 'PROPERTY' | 'PHONE';
        text: string;
    }, thunkAPI) => {
        const response = await makeAuthedApiRequest({
            method: 'post',
            urlExtension: '/v1/message/createMessage',
            data: messageData
        });
        thunkAPI.dispatch(fetchMessages());
        return response.data as MessageModel;
    }
);

export const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(LOGOUT_USER, (state) => {
                return initialState;
            })
            .addCase(fetchMessages.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchMessages.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.messages = action.payload;
            })
            .addCase(fetchMessages.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message ?? 'Unknown error';
            })
            .addCase(sendMessage.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(sendMessage.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.messages = [...state.messages, action.payload];
            })
            .addCase(sendMessage.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message ?? 'Unknown error';
            });
    },
})

export const {  } = messagesSlice.actions

export default messagesSlice.reducer;