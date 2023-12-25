import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from 'store/appStore';
import { getResume, editResume } from './services';

import { IResume } from '../types';

interface IResumeState {
  loading: boolean;
  error: string | null;
  resume: IResume | null;
}

const initialState: IResumeState = {
  loading: false,
  error: null,
  resume: null,
};

const resumeSlice = createSlice({
  name: '@@resume',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET
      .addCase(getResume.pending, (state) => {
        state.loading = true;
      })
      .addCase(getResume.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getResume.fulfilled, (state, action) => {
        state.loading = false;
        state.resume = action.payload;
      })
      // EDIT
      .addCase(editResume.pending, (state) => {
        state.loading = true;
      })
      .addCase(editResume.rejected, (state) => {
        state.loading = false;
      })
      .addCase(editResume.fulfilled, (state, action) => {
        state.loading = false;
        state.resume = action.payload;
      });
  },
});

// Actions

// Selectors
export const selectIsLoading = (state: RootState) => state.resume.loading;
export const selectError = (state: RootState) => state.resume.error;
export const selectResume = (state: RootState) => state.resume.resume;

// Reducer
export default resumeSlice.reducer;
