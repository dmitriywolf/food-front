import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from 'store/appStore';
import { getVacancies, createVacancy, updateVacancy } from './services';

import { IVacancy } from '../types';

interface IEmployerVacanciesState {
  loading: boolean;
  error: string | null;
  currentVacancy: IVacancy;
  vacancies: IVacancy[];
}

const DEFAULT_VACANCY_DATA = {
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

const initialState: IEmployerVacanciesState = {
  loading: false,
  error: null,
  currentVacancy: DEFAULT_VACANCY_DATA,
  vacancies: [],
};

const employerVacanciesSlice = createSlice({
  name: '@@employerVacancies',
  initialState,
  reducers: {
    setCurrentVacancy: (state, { payload }) => {
      state.currentVacancy = state.vacancies.find(
        (vac) => vac._id === payload,
      ) as IVacancy;
    },
    resetCurrentVacancy: (state) => {
      state.currentVacancy = DEFAULT_VACANCY_DATA;
    },
  },
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
      // EDIT VACANCY
      .addCase(updateVacancy.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateVacancy.rejected, (state) => {
        state.loading = false;
        state.currentVacancy = DEFAULT_VACANCY_DATA;
      })
      .addCase(updateVacancy.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.currentVacancy = DEFAULT_VACANCY_DATA;
        state.vacancies = state.vacancies.map((vac) =>
          vac?._id === payload._id ? payload : vac,
        );
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
export const { setCurrentVacancy, resetCurrentVacancy } =
  employerVacanciesSlice.actions;

// Selectors
export const selectIsLoading = (state: RootState) =>
  state.employerVacancies.loading;

export const selectError = (state: RootState) => state.employerVacancies.error;

export const selectCurrentVacancy = (state: RootState) =>
  state.employerVacancies.currentVacancy;

export const selectVacancies = (state: RootState) =>
  state.employerVacancies.vacancies;

// Reducer
export default employerVacanciesSlice.reducer;
