import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from 'store/appStore';
import { getJobs, getJobById } from './services';

import { IJob } from '../types';

interface IJobsState {
  loading: boolean;
  error: string | null;
  jobs: IJob[];
  currentJob: IJob;
}

const DEFAULT_JOB_DATA = {
  _id: '',
  author: '',
  title: '',
  category: '',
  domain: '',
  skills: '',
  workExperience: 0,
  experienceLevel: '',
  salaryRange: '',
  country: '',
  city: '',
  englishLevel: '',
  summary: '',
  companyType: '',
  employmentOptions: '',
  viewsCount: 0,
  applications: [],
  createdAt: '',
  updatedAt: '',
};

const initialState: IJobsState = {
  loading: false,
  error: null,
  jobs: [],
  currentJob: DEFAULT_JOB_DATA,
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
export const selectJobs = (state: RootState) => state.jobs.jobs;
export const selectCurrentJob = (state: RootState) => state.jobs.currentJob;

export const selectIsLoading = (state: RootState) => state.jobs.loading;

// Reducer
export default jobsSlice.reducer;
