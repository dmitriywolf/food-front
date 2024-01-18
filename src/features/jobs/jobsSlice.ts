import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from 'store/appStore';
import {
  getJobs,
  getJobById,
  applyToJob,
  getMyApplications,
  getTotal,
} from './services';

import { IJob } from '../types';

interface IJobsState {
  loading: boolean;
  error: string | null;
  jobs: IJob[];
  currentJob: IJob;
  myApplications: IJob[];
  totalCount: string;
}

const DEFAULT_JOB_DATA = {
  _id: '',
  author: '',
  title: '',
  category: '',
  domain: '',
  skills: [],
  workExperience: 0,
  experienceLevel: '',
  salaryRange: '',
  country: '',
  city: '',
  englishLevel: '',
  summary: '',
  companyType: '',
  employment: [],
  viewsCount: 0,
  applications: [],
  isArchive: false,
  createdAt: '',
  updatedAt: '',
};

const initialState: IJobsState = {
  loading: false,
  error: null,
  jobs: [],
  currentJob: DEFAULT_JOB_DATA,
  myApplications: [],
  totalCount: '',
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
      // GET TOTAL JOBS COUNT
      .addCase(getTotal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTotal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getTotal.fulfilled, (state, action) => {
        state.loading = false;
        state.totalCount = action.payload;
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
      })
      // APPLY TO JOB
      .addCase(applyToJob.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(applyToJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(applyToJob.fulfilled, (state, action) => {
        state.loading = false;
        state.currentJob.applications.push(action.payload);
      })
      // GET MY APPLICATIONS
      .addCase(getMyApplications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMyApplications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getMyApplications.fulfilled, (state, action) => {
        state.loading = false;
        state.myApplications = action.payload;
      });
  },
});

// Selectors
export const selectJobs = (state: RootState) => state.jobs.jobs;
export const selectCurrentJob = (state: RootState) => state.jobs.currentJob;
export const selectMyApplications = (state: RootState) =>
  state.jobs.myApplications;

export const selectIsLoading = (state: RootState) => state.jobs.loading;

export const selectTotalJobsCount = (state: RootState) => state.jobs.totalCount;

// Reducer
export default jobsSlice.reducer;
