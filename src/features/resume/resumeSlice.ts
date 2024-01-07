import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from 'store/appStore';
import { getMyResume, editResume, getResumes, getResumeById } from './services';

import { IResume } from '../types';

interface IResumeState {
  loading: boolean;
  error: string | null;
  myResume: IResume;
  resumes: IResume[];
  currentResume: IResume;
}

const DEFAULT_RESUME_DATA = {
  _id: '',
  owner: '',
  position: '',
  category: '',
  skills: [],
  workExperience: 0,
  experienceLevel: '',
  salaryExpectations: 0,
  country: '',
  city: '',
  relocation: false,
  englishLevel: '',
  summary: '',
  employment: [],
  dontConsider: [],
  createdAt: '',
  updatedAt: '',
  isPublished: false,
};

const initialState: IResumeState = {
  loading: false,
  error: null,
  myResume: DEFAULT_RESUME_DATA,
  resumes: [],
  currentResume: DEFAULT_RESUME_DATA,
};

const resumeSlice = createSlice({
  name: '@@resume',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET
      .addCase(getMyResume.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMyResume.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getMyResume.fulfilled, (state, action) => {
        state.loading = false;
        state.myResume = action.payload;
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
        state.myResume = action.payload;
      })
      // GET RESUMES
      .addCase(getResumes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getResumes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getResumes.fulfilled, (state, action) => {
        state.loading = false;
        state.resumes = action.payload;
      })
      // GET RESUME BY ID
      .addCase(getResumeById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getResumeById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getResumeById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentResume = action.payload;
      });
  },
});

// Actions

// Selectors
export const selectIsLoading = (state: RootState) => state.resume.loading;
export const selectError = (state: RootState) => state.resume.error;
export const selectMyResume = (state: RootState) => state.resume.myResume;

export const selectResumes = (state: RootState) => state.resume.resumes;
export const selectCurrentResume = (state: RootState) =>
  state.resume.currentResume;

// Reducer
export default resumeSlice.reducer;
