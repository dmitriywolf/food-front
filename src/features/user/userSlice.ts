import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from 'store/appStore';
import {
  fetchRegister,
  fetchLogin,
  fetchVerifyEmail,
  fetchForgotPassword,
} from './service';

type UserType = {
  firstName: string;
  lastName: string;
  email: string;
};

interface IUserState {
  status: string;
  error: {
    message?: 'string';
  } | null;
  userData: UserType | null;
}

const initialState: IUserState = {
  status: 'idle',
  error: null,
  userData: null,
};
const authSlice = createSlice({
  name: '@@ser',
  initialState,
  reducers: {
    logout: (state) => {
      state.userData = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // SIGNUP
      .addCase(fetchRegister.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchRegister.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload || action.error;
      })
      .addCase(fetchRegister.fulfilled, (state) => {
        state.status = 'idle';
      })
      // SIGNIN
      .addCase(fetchLogin.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload || action.error;
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userData = action.payload;
      })
      // ACTIVATE ACCOUNT
      .addCase(fetchVerifyEmail.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchVerifyEmail.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload || action.error;
      })
      .addCase(fetchVerifyEmail.fulfilled, (state) => {
        state.status = 'idle';
      })
      // FORGOT PASSWORD
      .addCase(fetchForgotPassword.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchForgotPassword.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload || action.error;
      })
      .addCase(fetchForgotPassword.fulfilled, (state) => {
        state.status = 'idle';
      });
  },
});

// Actions
export const { logout } = authSlice.actions;

// Selectors
export const selectUser = (state: RootState) => state.user.userData;

export const selectIsAuthorized = (state: RootState) => !!state.user.userData;
export const selectIsLoading = (state: RootState) =>
  state.user.status === 'loading';

// Reducer
export default authSlice.reducer;
