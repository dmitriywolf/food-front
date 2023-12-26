import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { API_PATHS } from 'shared/api/paths';
import API from 'shared/api/service';
import type { ICreateVacancy } from './types';

export const createVacancy = createAsyncThunk(
  '@@employerVacancies/createVacancy',
  async (vacancyData: ICreateVacancy, { rejectWithValue }) => {
    try {
      const { data } = await API.post(API_PATHS.jobs, vacancyData);
      return data.job;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (error.response && error.response.data) {
          return rejectWithValue(error.response.data.message);
        }
      }

      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue('Failed Edit Resume');
    }
  },
);

export const getVacancies = createAsyncThunk(
  '@@employerVacancies/getVacancies',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get(`${API_PATHS.jobs}/employer/all`);
      return data.jobs;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (error.response && error.response.data) {
          return rejectWithValue(error.response.data.message);
        }
      }

      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue('Failed getUser Resume');
    }
  },
);
