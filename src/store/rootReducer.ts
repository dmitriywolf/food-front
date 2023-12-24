import { combineReducers } from '@reduxjs/toolkit';
import { userSlice } from 'features/user';
import { companiesSlice } from 'features/companies';

export const rootReducer = combineReducers({
  user: userSlice,
  company: companiesSlice,
});
