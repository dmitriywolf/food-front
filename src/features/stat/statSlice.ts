import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from 'store/appStore';
import {
  getTotalStat,
  getLevelStat,
  getDomainsStat,
  getEmploymentStat,
} from './services';

import { ITotalStat, ILevelStat, IEmploymentStat, IDomainStat } from './types';

const COLOES = ['indigo.6', 'yellow.6', 'teal.6'];

interface IStatState {
  // Total statistics
  totalStatLoading: boolean;
  totalStatError: string | null;
  totalStat: ITotalStat[];

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
  // Total statistics
  totalStatLoading: false,
  totalStatError: null,
  totalStat: [],

  // Level statistics
  levelStatLoading: false,
  levelStatError: null,
  levelStat: [],

  // Employment statistics
  employmentStatLoading: false,
  employmentStatError: null,
  employmentStat: [],

  // Domains statistics
  domainsStatLoading: false,
  domainsStatError: null,
  domainsStat: [],
};

const statSlice = createSlice({
  name: '@@stat',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET TOTAL STAT
      .addCase(getTotalStat.pending, (state) => {
        state.totalStatLoading = true;
        state.totalStatError = null;
      })
      .addCase(getTotalStat.rejected, (state, action) => {
        state.totalStatLoading = false;
        state.totalStatError = action.payload as string;
      })
      .addCase(getTotalStat.fulfilled, (state, action) => {
        state.totalStatLoading = false;
        state.totalStatError = null;
        state.totalStat = action.payload;
        // state.totalStat = action.payload.map(
        //   (el: { name: string; value: number }, idx: number) => ({
        //     ...el,
        //     color: COLOES[idx],
        //   }),
        // );
      })
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
export const selectTotalStat = (state: RootState) => state.stat.totalStat;
export const selectTotalStatIsLoading = (state: RootState) =>
  state.stat.totalStatLoading;
export const selectTotalError = (state: RootState) => state.stat.totalStatError;

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
