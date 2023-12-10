import { combineReducers } from '@reduxjs/toolkit';
import { userSlice } from 'features/user';

export const rootReducer = combineReducers({
  user: userSlice,
});
