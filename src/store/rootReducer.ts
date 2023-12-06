import { combineReducers } from '@reduxjs/toolkit';
import { authSlice } from 'features/auth';

export const rootReducer = combineReducers({
  auth: authSlice,
});
