import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from 'store/appStore';
import { ISeekerAccount } from '../types';
import { getCandidates, getCandidateById } from './services';

const DEFAULT_CANDIDATE_DATA = {
  _id: '',
  firstName: '',
  lastName: '',
  email: '',
  emailVerified: false,
  avatar: '',
  phone: '',
  linkedin: '',
  createdAt: '',
  updatedAt: '',
  searchStatus: false,
  skype: '',
  telegram: '',
  github: '',
  role: '',
  portfolio: '',
  applications: [],
  resume: {
    _id: '',
    owner: '',
    position: '',
    category: '',
    skills: '',
    workExperience: 0,
    salaryExpectations: 0,
    country: '',
    city: '',
    relocation: false,
    englishLevel: '',
    summary: '',
    createdAt: '',
    updatedAt: '',
    remoteWork: false,
    office: false,
    partTime: false,
    freelance: false,
    isPublished: false,
  },
};

interface ICandidatesState {
  loading: boolean;
  error: string | null;
  candidates: ISeekerAccount[];
  currentCandidate: ISeekerAccount | null;
}

const initialState: ICandidatesState = {
  loading: false,
  error: null,
  candidates: [],
  currentCandidate: DEFAULT_CANDIDATE_DATA,
};

const candidatesSlice = createSlice({
  name: '@@candidates',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET CANDIDATES
      .addCase(getCandidates.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCandidates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getCandidates.fulfilled, (state, action) => {
        state.loading = false;
        state.candidates = action.payload;
      })
      // GET CANDIDATE BY ID
      .addCase(getCandidateById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCandidateById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getCandidateById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentCandidate = action.payload;
      });
  },
});

// Selectors
export const selectCandidates = (state: RootState) =>
  state.candidates.candidates;
export const selectCurrentCandidate = (state: RootState) =>
  state.candidates.currentCandidate;
export const selectIsLoading = (state: RootState) => state.candidates.loading;

// Reducer
export default candidatesSlice.reducer;
