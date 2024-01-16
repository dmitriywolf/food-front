import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from 'store/appStore';
import { getMyChats, createChat, getChat, sendMessage } from './services';

import { IChat } from '../types';

interface IChatsState {
  loading: boolean;
  error: string | null;
  chats: IChat[];
  currentChat: IChat;
}

const DEFAULT_CHAT_DATA = {
  _id: '',
  members: [],
  messages: [],
};

const initialState: IChatsState = {
  loading: false,
  error: null,
  chats: [],
  currentChat: DEFAULT_CHAT_DATA,
};

const chatsSlice = createSlice({
  name: '@@chats',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET CHATS
      .addCase(getMyChats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMyChats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getMyChats.fulfilled, (state, action) => {
        state.loading = false;
        state.chats = action.payload;
      })
      // GET CHAT
      .addCase(getChat.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getChat.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getChat.fulfilled, (state, action) => {
        state.loading = false;
        state.currentChat = { ...state.currentChat, ...action.payload };
      })
      // CREATE CHAT
      .addCase(createChat.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createChat.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createChat.fulfilled, (state, action) => {
        state.loading = false;
        state.currentChat = action.payload;
      })
      // SEND MESSAGE
      .addCase(sendMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.currentChat.messages.push(action.payload);
      });
  },
});

// Selectors
export const selectChats = (state: RootState) => state.chats.chats;
export const selectCurrentChat = (state: RootState) => state.chats.currentChat;

export const selectIsLoading = (state: RootState) => state.chats.loading;

// Reducer
export default chatsSlice.reducer;
