import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from 'store/appStore';
import { getCompanies, getTopCompanies, getCompanyById } from './services';

import type { ICompany } from './types';

interface ICompaniesState {
  loading: boolean;
  error: string | null;
  companies: ICompany[];
  topCompanies: ICompany[];
  currentCompany: {
    data: ICompany | null;
    jobs: [];
  };
}

const initialState: ICompaniesState = {
  loading: false,
  error: null,
  companies: [],
  topCompanies: [],
  currentCompany: {
    data: null,
    jobs: [],
  },
};

const companiesSlice = createSlice({
  name: '@@companies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET COMPANIES
      .addCase(getCompanies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCompanies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getCompanies.fulfilled, (state, action) => {
        state.loading = false;
        state.companies = action.payload;
      })
      // GET TOP COMPANIES
      .addCase(getTopCompanies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTopCompanies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getTopCompanies.fulfilled, (state, action) => {
        state.loading = false;
        state.topCompanies = action.payload;
      })
      // GET COMPANY BY ID
      .addCase(getCompanyById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCompanyById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getCompanyById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentCompany.data = action.payload;
      });
  },
});

// Selectors
export const selectAllCompanies = (state: RootState) => state.company.companies;
export const selectTopCompanies = (state: RootState) =>
  state.company.topCompanies;
export const selectCurrentCompany = (state: RootState) =>
  state.company.currentCompany;

export const selectIsLoading = (state: RootState) => state.company.loading;

// Reducer
export default companiesSlice.reducer;
