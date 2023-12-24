import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from 'store/appStore';
import { getJobs, getTopJobs, getJobById } from './services';

import type { IJob } from './types';

interface IJobState {
  loading: boolean;
  error: string | null;
  jobs: IJob[];
  topJobs: IJob[];
  currentJob: IJob | null;
}

const initialState: IJobState = {
  loading: false,
  error: null,
  jobs: [],
  topJobs: [],
  currentJob: null,
};

const jobsSlice = createSlice({
  name: '@@jobs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET JOBS
      .addCase(getJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload;
      })
      // GET TOP JOBS
      .addCase(getTopJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTopJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getTopJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.topJobs = action.payload;
      })
      // GET JOB BY ID
      .addCase(getJobById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getJobById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getJobById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentJob = action.payload;
      });
  },
});

// Selectors
export const selectAllJobs = (state: RootState) => state.jobs.jobs;
export const selectTopJobs = (state: RootState) => state.jobs.topJobs;
export const selectCurrentJob = (state: RootState) => state.jobs.currentJob;

export const selectIsLoading = (state: RootState) => state.jobs.loading;

// Reducer
export default jobsSlice.reducer;
