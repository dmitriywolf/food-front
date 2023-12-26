import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from 'store/appStore';
import { getVacancies, createVacancy } from './services';

import { IVacancy } from '../types';

interface IEmployerVacanciesState {
  loading: boolean;
  error: string | null;
  editedVacancy: IVacancy;
  vacancies: IVacancy[];
}

const DEFAULT_VACANCY_DATA = {
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
  applicationsCount: 0,
  createdAt: '',
  updatedAt: '',
};

const initialState: IEmployerVacanciesState = {
  loading: false,
  error: null,
  editedVacancy: DEFAULT_VACANCY_DATA,
  vacancies: [],
};

const employerVacanciesSlice = createSlice({
  name: '@@resume',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ADD VACANCY
      .addCase(createVacancy.pending, (state) => {
        state.loading = true;
      })
      .addCase(createVacancy.rejected, (state) => {
        state.loading = false;
      })
      .addCase(createVacancy.fulfilled, (state, action) => {
        state.loading = false;
        state.vacancies.push(action.payload);
      })
      // GET VACANCIES
      .addCase(getVacancies.pending, (state) => {
        state.loading = true;
      })
      .addCase(getVacancies.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getVacancies.fulfilled, (state, action) => {
        state.loading = false;
        state.vacancies = action.payload;
      });
  },
});

// Actions

// Selectors
export const selectIsLoading = (state: RootState) =>
  state.employerVacancies.loading;
export const selectError = (state: RootState) => state.employerVacancies.error;
export const selectEditedVacancy = (state: RootState) =>
  state.employerVacancies.editedVacancy;
export const selectVacancies = (state: RootState) =>
  state.employerVacancies.vacancies;

// Reducer
export default employerVacanciesSlice.reducer;
