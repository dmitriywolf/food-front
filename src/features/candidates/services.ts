import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { API_PATHS } from 'shared/api/paths';
import API from 'shared/api/service';

export const getCandidates = createAsyncThunk(
  '@@candidates/getCandidates',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get(API_PATHS.seekers);
      return data.seekers;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (error.response && error.response.data) {
          return rejectWithValue(error.response.data.message);
        }
      }

      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue('Failed get candidates');
    }
  },
);

export const getCandidateById = createAsyncThunk(
  '@@candidates/getCandidateById',
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await API.get(`${API_PATHS.seekers}/${id}`);
      return data.user;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (error.response && error.response.data) {
          return rejectWithValue(error.response.data.message);
        }
      }

      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue('Failed get seeker by id');
    }
  },
);
