import { combineReducers } from '@reduxjs/toolkit';
import { userSlice } from 'features/user';
import { companiesSlice } from 'features/companies';
import { jobsSlice } from 'features/jobs';
import { candidatesSlice } from 'features/candidates';

export const rootReducer = combineReducers({
  user: userSlice,
  companies: companiesSlice,
  jobs: jobsSlice,
  candidates: candidatesSlice,
});
