import { combineReducers } from '@reduxjs/toolkit';
import { userSlice } from 'features/user';
import { companiesSlice } from 'features/companies';
import { jobsSlice } from 'features/jobs';

export const rootReducer = combineReducers({
  user: userSlice,
  companies: companiesSlice,
  jobs: jobsSlice,
});
