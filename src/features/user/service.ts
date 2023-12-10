import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { API_PATHS } from 'shared/api/paths';
import API from 'shared/api/service';
import type { RootState } from 'store/appStore';
import { TOKEN_LOCALSTORAGE_KEY } from 'shared/constants';
import { setItemLS } from 'utils';
import type {
  RegisterDataType,
  LoginDataType,
  VerifyEmailDataType,
  ForgotPasswordDataType,
} from './types';

export const fetchRegister = createAsyncThunk(
  '@@user/register',
  async (registerData: RegisterDataType, { rejectWithValue }) => {
    try {
      const { data } = await API.post(API_PATHS.register, registerData);

      return data;
    } catch (error) {
      // Попадает в action.payload
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data);
      }

      if (error instanceof Error) {
        return rejectWithValue(error);
      }

      return rejectWithValue({ message: 'Failed signup.' });
    }
  },
);

export const fetchLogin = createAsyncThunk(
  '@@user/signin',
  async (loginData: LoginDataType, { rejectWithValue }) => {
    try {
      const { data } = await API.post(API_PATHS.login, loginData);

      const { user, token } = data;

      setItemLS(TOKEN_LOCALSTORAGE_KEY, token);

      return user;
    } catch (error) {
      // Попадает в action.payload
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data);
      }

      if (error instanceof Error) {
        return rejectWithValue(error);
      }

      return rejectWithValue({ message: 'Failed signin.' });
    }
  },
);

export const fetchVerifyEmail = createAsyncThunk(
  '@@user/verifyEmail',
  async (verifyData: VerifyEmailDataType, { rejectWithValue }) => {
    try {
      const { data } = await API.post(API_PATHS.verifyEmail, verifyData);
      return data;
    } catch (error) {
      // Попадает в action.payload
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data);
      }

      if (error instanceof Error) {
        return rejectWithValue(error);
      }

      return rejectWithValue({ message: 'Failed account activation' });
    }
  },
  {
    condition: (_, { getState }) => {
      const { user } = getState() as RootState;

      if (user.status === 'loading') {
        // Already fetched or in progress, don't need to re-fetch
        return false;
      }
      return true;
    },
  },
);

export const fetchForgotPassword = createAsyncThunk(
  '@@user/forgotPassword',
  async (forgotPasswordData: ForgotPasswordDataType, { rejectWithValue }) => {
    try {
      const { data } = await API.post(
        API_PATHS.forgotPassword,
        forgotPasswordData,
      );
      return data;
    } catch (error) {
      // Попадает в action.payload
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data);
      }

      if (error instanceof Error) {
        return rejectWithValue(error);
      }

      return rejectWithValue({ message: 'Failed forgot password' });
    }
  },
);
