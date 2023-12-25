import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from 'store/appStore';
import { ROLES, TOKEN_LOCALSTORAGE_KEY } from 'shared/constants';
import {
  userRegister,
  userLogin,
  userVerifyEmail,
  userForgotPassword,
  userResetPassword,
  userGetProfile,
  userEditSeeker,
  userEditEmployer,
  addVacancy,
  getVacancies,
} from './service';

import type { UserDataType, IVacancy } from './types';

interface IUserState {
  loading: boolean;
  error: string | null;
  userData: UserDataType;
  employerVacancies: IVacancy[];
}

const initialState: IUserState = {
  loading: false,
  error: null,
  userData: null,
  employerVacancies: [],
};

const userSlice = createSlice({
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
      })
      // EDIT SEEKER
      .addCase(userEditSeeker.pending, (state) => {
        state.loading = true;
      })
      .addCase(userEditSeeker.rejected, (state) => {
        state.loading = false;
      })
      .addCase(userEditSeeker.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload;
      })
      // EDIT EMPLOYER
      .addCase(userEditEmployer.pending, (state) => {
        state.loading = true;
      })
      .addCase(userEditEmployer.rejected, (state) => {
        state.loading = false;
      })
      .addCase(userEditEmployer.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload;
      })
      // GET SEEKER RESUME
      // .addCase(getResume.pending, (state) => {
      //   state.loading = true;
      // })
      // .addCase(getResume.rejected, (state) => {
      //   state.loading = false;
      // })
      // .addCase(getResume.fulfilled, (state, action) => {
      //   state.loading = false;
      //   state.seekerResume = action.payload;
      // })
      // // EDIT SEEKER RESUME
      // .addCase(editResume.pending, (state) => {
      //   state.loading = true;
      // })
      // .addCase(editResume.rejected, (state) => {
      //   state.loading = false;
      // })
      // .addCase(editResume.fulfilled, (state, action) => {
      //   state.loading = false;
      //   state.seekerResume = action.payload;
      // })
      // ADD_VACANCY
      .addCase(addVacancy.pending, (state) => {
        state.loading = true;
      })
      .addCase(addVacancy.rejected, (state) => {
        state.loading = false;
      })
      .addCase(addVacancy.fulfilled, (state, action) => {
        state.loading = false;
        state.employerVacancies.push(action.payload);
      })
      // GET Vacancies
      .addCase(getVacancies.pending, (state) => {
        state.loading = true;
      })
      .addCase(getVacancies.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getVacancies.fulfilled, (state, action) => {
        state.loading = false;
        state.employerVacancies = action.payload;
      });
  },
});

// Actions
export const { logout, setUser } = userSlice.actions;

// Selectors
export const selectUser = (state: RootState) => state.user.userData;
export const selectIsAuthorized = (state: RootState) => !!state.user.userData;
export const selectIsLoading = (state: RootState) => state.user.loading;
export const selectError = (state: RootState) => state.user.error;
// export const selectResume = (state: RootState) => state.user.seekerResume;
export const selectVacancies = (state: RootState) =>
  state.user.employerVacancies;

export const selectIsAdmin = (state: RootState) =>
  state.user.userData?.role === ROLES.admin;

// Reducer
export default userSlice.reducer;
