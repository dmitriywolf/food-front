import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from 'store/appStore';
import { getCompanies, getCompanyById } from './services';

import { ICompany, IJob } from '../types';

const DEFAULT_COMPANY: ICompany = {
  _id: '',
  firstName: '',
  lastName: '',
  email: '',
  emailVerified: false,
  avatar: '',
  phone: '',
  linkedin: '',
  createdAt: '',
  userPosition: '',
  companyName: '',
  companyHiresCount: 0,
  companyWebSite: '',
  companyDouPage: '',
  companyLogo: '',
  companyEmployeesCount: 0,
  companyDescription: '',
  companyOffices: '',
};

interface ICompaniesState {
  loading: boolean;
  error: string | null;
  companies: ICompany[];
  currentCompany: {
    data: ICompany;
    jobs: IJob[];
  };
}

const initialState: ICompaniesState = {
  loading: false,
  error: null,
  companies: [],
  currentCompany: {
    data: DEFAULT_COMPANY,
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
        state.currentCompany.data = action.payload.user;
        state.currentCompany.jobs = action.payload.jobs;
      });
  },
});

// Selectors
export const selectCompanies = (state: RootState) => state.companies.companies;
export const selectCurrentCompany = (state: RootState) =>
  state.companies.currentCompany;
export const selectIsLoading = (state: RootState) => state.companies.loading;

// Reducer
export default companiesSlice.reducer;
