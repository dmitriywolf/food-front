import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from 'store/appStore';
import { TOKEN_LOCALSTORAGE_KEY } from 'shared/constants';
import {
  userRegister,
  userLogin,
  userVerifyEmail,
  userForgotPassword,
  userResetPassword,
  userGetProfile,
} from './service';

import type { UserDataType } from './types';

interface IUserState {
  loading: boolean;
  error: string | null;
  userData: UserDataType | null;
}

const initialState: IUserState = {
  loading: false,
  error: null,
  userData: null,
};

const authSlice = createSlice({
  name: '@@user',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem(TOKEN_LOCALSTORAGE_KEY);
      state.loading = false;
      state.userData = null;
      state.error = null;
    },
    setUser: (state, { payload }) => {
      state.userData = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // REGISTER
      .addCase(userRegister.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userRegister.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(userRegister.fulfilled, (state) => {
        state.loading = false;
      })
      // LOGIN
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload;
      })
      // VERIFY EMAIL
      .addCase(userVerifyEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userVerifyEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(userVerifyEmail.fulfilled, (state) => {
        state.loading = false;
      })
      //  FORGOT PASSWORD
      .addCase(userForgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userForgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(userForgotPassword.fulfilled, (state) => {
        state.loading = false;
      })
      //  RESET PASSWORD
      .addCase(userResetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userResetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(userResetPassword.fulfilled, (state) => {
        state.loading = false;
      })
      // GET PROFILE
      .addCase(userGetProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(userGetProfile.rejected, (state) => {
        state.loading = false;
      })
      .addCase(userGetProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload;
      });
  },
});

// Actions
export const { logout, setUser } = authSlice.actions;

// Selectors
export const selectUser = (state: RootState) => state.user.userData;

export const selectIsAuthorized = (state: RootState) => !!state.user.userData;
export const selectIsLoading = (state: RootState) => state.user.loading;
export const selectError = (state: RootState) => state.user.error;

// Reducer
export default authSlice.reducer;
