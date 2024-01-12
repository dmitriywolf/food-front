import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { API_PATHS } from 'shared/api/paths';
import API from 'shared/api/service';

export const getMyChats = createAsyncThunk(
  '@@chats/getMyChats',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get(`${API_PATHS.chats}`);
      return data.chats;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (error.response && error.response.data) {
          return rejectWithValue(error.response.data.message);
        }
      }

      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue('Failed get myChats');
    }
  },
);

export const createChat = createAsyncThunk(
  '@@chats/createChat',
  async (receiverId: string, { rejectWithValue }) => {
    try {
      const { data } = await API.post(API_PATHS.chats, { receiverId });
      return data.chat;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (error.response && error.response.data) {
          return rejectWithValue(error.response.data.message);
        }
      }

      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue('Failed get jobs');
    }
  },
);

export const getChat = createAsyncThunk(
  '@@chats/getChat',
  async (chatId, { rejectWithValue }) => {
    try {
      const { data } = await API.get(`${API_PATHS.chats}/${chatId}`);
      return data.chat;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (error.response && error.response.data) {
          return rejectWithValue(error.response.data.message);
        }
      }

      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue('Failed get jobs');
    }
  },
);
