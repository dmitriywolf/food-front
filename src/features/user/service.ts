import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { API_PATHS } from 'shared/api/paths';
import API from 'shared/api/service';
import type { RootState } from 'store/appStore';
import { TOKEN_LOCALSTORAGE_KEY } from 'shared/constants';
import type {
  RegisterDataType,
  LoginDataType,
  VerifyEmailDataType,
  ForgotPasswordDataType,
  ResetPasswordDataType,
} from './types';

export const userRegister = createAsyncThunk(
  '@@user/register',
  async (registerData: RegisterDataType, { rejectWithValue }) => {
    try {
      const { data } = await API.post(API_PATHS.register, registerData);

      return data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (error.response && error.response.data) {
          return rejectWithValue(error.response.data.message);
        }
      }

      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue('Failed user register');
    }
  },
);

export const userLogin = createAsyncThunk(
  '@@user/login',
  async (loginData: LoginDataType, { rejectWithValue }) => {
    try {
      const { data } = await API.post(API_PATHS.login, loginData);
      const { user, token } = data;

      localStorage.setItem(TOKEN_LOCALSTORAGE_KEY, token);
      return user;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (error.response && error.response.data) {
          return rejectWithValue(error.response.data.message);
        }
      }

      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue('Failed user login');
    }
  },
);

export const userVerifyEmail = createAsyncThunk(
  '@@user/verifyEmail',
  async (verifyData: VerifyEmailDataType, { rejectWithValue }) => {
    try {
      const { data } = await API.post(API_PATHS.verifyEmail, verifyData);
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response && error.response.data) {
          return rejectWithValue(error.response.data.message);
        }
      }

      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue('Failed user verify email');
    }
  },
  {
    condition: (_, { getState }) => {
      const { user } = getState() as RootState;
      if (user.loading) {
        return false;
      }
      return true;
    },
  },
);

export const userForgotPassword = createAsyncThunk(
  '@@user/forgotPassword',
  async (forgotPasswordData: ForgotPasswordDataType, { rejectWithValue }) => {
    try {
      const { data } = await API.post(
        API_PATHS.forgotPassword,
        forgotPasswordData,
      );
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response && error.response.data) {
          return rejectWithValue(error.response.data.message);
        }
      }

      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue('Failed user forgot password');
    }
  },
);

export const userResetPassword = createAsyncThunk(
  '@@user/resetPassword',
  async (resetPasswordData: ResetPasswordDataType, { rejectWithValue }) => {
    try {
      const { data } = await API.post(
        API_PATHS.resetPassword,
        resetPasswordData,
      );
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response && error.response.data) {
          return rejectWithValue(error.response.data.message);
        }
      }

      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue('Failed user forgot password');
    }
  },
);
