import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { API_PATHS } from 'shared/api/paths';
import API from 'shared/api/service';

export const getCompanyById = createAsyncThunk(
  '@@companies/getCompanyById',
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await API.get(`${API_PATHS.employers}/${id}`);
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

      return rejectWithValue('Failed Edit Resume');
    }
  },
);

export const getCompanies = createAsyncThunk(
  '@@companies/getCompanies',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get(API_PATHS.employers);
      return data.employers;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (error.response && error.response.data) {
          return rejectWithValue(error.response.data.message);
        }
      }

      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue('Failed get companies');
    }
  },
);

export const getTopCompanies = createAsyncThunk(
  '@@companies/getTopCompanies',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get(API_PATHS.topEmployers);
      return data.employers;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (error.response && error.response.data) {
          return rejectWithValue(error.response.data.message);
        }
      }

      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue('Failed get companies');
    }
  },
);

export const getCompanyJobsById = createAsyncThunk(
  '@@companies/getCompanyJobs',
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await API.get(`${API_PATHS.jobs}/user/${id}`);
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

      return rejectWithValue('Failed get companies');
    }
  },
);
