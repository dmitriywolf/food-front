import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { API_PATHS } from 'shared/api/paths';
import API from 'shared/api/service';

export const getLevelStat = createAsyncThunk(
  '@@stat/getLevelStat',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get(`${API_PATHS.statistics}/level`);
      return data.stat;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (error.response && error.response.data) {
          return rejectWithValue(error.response.data.message);
        }
      }

      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue('Failed get level statistics');
    }
  },
);

export const getEmploymentStat = createAsyncThunk(
  '@@stat/getEmploymentStat',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get(`${API_PATHS.statistics}/employment`);
      return data.stat;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (error.response && error.response.data) {
          return rejectWithValue(error.response.data.message);
        }
      }

      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue('Failed get employment statistics');
    }
  },
);

export const getDomainsStat = createAsyncThunk(
  '@@stat/getDomainsStat',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get(`${API_PATHS.statistics}/domains`);
      return data.stat;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (error.response && error.response.data) {
          return rejectWithValue(error.response.data.message);
        }
      }

      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue('Failed get domains statistics');
    }
  },
);
