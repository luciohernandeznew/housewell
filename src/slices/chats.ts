import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {makeAuthedApiRequest} from "../utils/api/apiHelper";
import {UserModel} from "./user";
import {LOGOUT_USER} from "../constants";

export type ChatModel = {
    id: string;
    name: string;
    chatType: 'USER' | 'GROUP' | 'PROPERTY' | 'PHONE';
    ownerId: string;
}

export type ChatWithMembersModel = ChatModel & {
    members: UserModel[]
}

export interface ChatState {
    chats?: ChatWithMembersModel[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

export const initialState: ChatState = {
    status: 'idle',
    error: null,
};

export const fetchChats = createAsyncThunk(
    'chats/fetch',
    async () => {
        const response = await makeAuthedApiRequest({
            method: 'post',
            urlExtension: '/v1/chat/getChats'
        });
        return response.data as ChatWithMembersModel[];
    }
)

export const renameChat = createAsyncThunk(
    'chats/rename',
    async ({chat, name}: {chat: ChatModel, name: string}) => {
        const response = await makeAuthedApiRequest({
            method: 'post',
            urlExtension: `/v1/chat/editChat`,
            data: { chatId: chat.id, chatType: chat.chatType, ownerId: chat.ownerId, name },
        });
        return response.data as ChatModel;
    }
);

export const chatsSlice = createSlice({
    name: 'chats',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(LOGOUT_USER, (state) => {
                return initialState;
            })
            .addCase(fetchChats.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchChats.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.chats = action.payload;
            })
            .addCase(fetchChats.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message ?? 'Unknown error';
            })
            .addCase(renameChat.fulfilled, (state, action) => {
                const chatToUpdate = state.chats?.find(chat => chat.id === action.payload.id);
                if (chatToUpdate) {
                    chatToUpdate.name = action.payload.name;
                }
            })
    },
})

export const {  } = chatsSlice.actions

export default chatsSlice.reducer;