import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from 'store/appStore';
import { getLevelStat, getDomainsStat, getEmploymentStat } from './services';

import { ILevelStat, IEmploymentStat, IDomainStat } from './types';

const DEMO_LEVELS = [
  {
    level: 'Trainee/Intern',
    Vacancies: 2,
    Candidates: 5,
  },
  {
    level: 'Junior',
    Vacancies: 2,
    Candidates: 5,
  },
  {
    level: 'Middle',
    Vacancies: 2,
    Candidates: 5,
  },
  {
    level: 'Senior',
    Vacancies: 2,
    Candidates: 5,
  },
  {
    level: 'Team Lead',
    Vacancies: 2,
    Candidates: 5,
  },
  {
    level: 'Chief/Head of',
    Vacancies: 2,
    Candidates: 5,
  },
];

const DEMO_EMPLOYMENT = [
  {
    employment: 'Remote',
    Vacancies: 2,
    Candidates: 5,
  },
  {
    employment: 'Office',
    Vacancies: 2,
    Candidates: 5,
  },
  {
    employment: 'Part-time',
    Vacancies: 2,
    Candidates: 5,
  },
  {
    employment: 'Freelance',
    Vacancies: 2,
    Candidates: 5,
  },
];

const DEMO_DOMAINS = [
  {
    domain: '',
    Adult: 20,
    Gambling: 10,
    Dating: 8,
    GameDev: 3,
    Blockchain: 2,
  },
];

interface IStatState {
  // Level statistics
  levelStatLoading: boolean;
  levelStatError: string | null;
  levelStat: ILevelStat[];

  // Employment statistics
  employmentStatLoading: boolean;
  employmentStatError: string | null;
  employmentStat: IEmploymentStat[];

  // Domains statistics
  domainsStatLoading: boolean;
  domainsStatError: string | null;
  domainsStat: IDomainStat[];
}

const initialState: IStatState = {
  // Level statistics
  levelStatLoading: false,
  levelStatError: null,
  levelStat: DEMO_LEVELS,

  // Employment statistics
  employmentStatLoading: false,
  employmentStatError: null,
  employmentStat: DEMO_EMPLOYMENT,

  // Domains statistics
  domainsStatLoading: false,
  domainsStatError: null,
  domainsStat: DEMO_DOMAINS,
};

const statSlice = createSlice({
  name: '@@stat',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET LEVEL STAT
      .addCase(getLevelStat.pending, (state) => {
        state.levelStatLoading = true;
        state.levelStatError = null;
      })
      .addCase(getLevelStat.rejected, (state, action) => {
        state.levelStatLoading = false;
        state.levelStatError = action.payload as string;
      })
      .addCase(getLevelStat.fulfilled, (state, action) => {
        state.levelStatLoading = false;
        state.levelStatError = null;
        state.levelStat = action.payload;
      })
      // GET EMPLOYMENT STAT
      .addCase(getEmploymentStat.pending, (state) => {
        state.employmentStatLoading = true;
        state.employmentStatError = null;
      })
      .addCase(getEmploymentStat.rejected, (state, action) => {
        state.employmentStatLoading = false;
        state.employmentStatError = action.payload as string;
      })
      .addCase(getEmploymentStat.fulfilled, (state, action) => {
        state.employmentStatLoading = false;
        state.employmentStatError = null;
        state.employmentStat = action.payload;
      })
      // GET DOMAINS STAT
      .addCase(getDomainsStat.pending, (state) => {
        state.domainsStatLoading = true;
        state.domainsStatError = null;
      })
      .addCase(getDomainsStat.rejected, (state, action) => {
        state.domainsStatLoading = false;
        state.domainsStatError = action.payload as string;
      })
      .addCase(getDomainsStat.fulfilled, (state, action) => {
        state.domainsStatLoading = false;
        state.domainsStatError = null;
        state.domainsStat = action.payload;
      });
  },
});

// Actions

// Selectors
// Level
export const selectLevelStat = (state: RootState) => state.stat.levelStat;
export const selectLevelStatIsLoading = (state: RootState) =>
  state.stat.levelStatLoading;
export const selectLevelError = (state: RootState) => state.stat.levelStatError;

// Employment
export const selectEmploymentStat = (state: RootState) =>
  state.stat.employmentStat;
export const selectEmploymentStatIsLoading = (state: RootState) =>
  state.stat.employmentStatLoading;
export const selectEmploymentError = (state: RootState) =>
  state.stat.employmentStatError;

// Domains
export const selectDomainsStat = (state: RootState) => state.stat.domainsStat;
export const selectDomainsStatIsLoading = (state: RootState) =>
  state.stat.domainsStatLoading;
export const selectDomainsError = (state: RootState) =>
  state.stat.domainsStatError;

// Reducer
export default statSlice.reducer;
