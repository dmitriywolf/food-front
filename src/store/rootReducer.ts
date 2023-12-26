import { combineReducers } from '@reduxjs/toolkit';
import { userSlice } from 'features/user';
import { resumeSlice } from 'features/resume';
import { employerVacanciesSlice } from 'features/employerVacancies';

import { companiesSlice } from 'features/companies';
import { jobsSlice } from 'features/jobs';
import { candidatesSlice } from 'features/candidates';

export const rootReducer = combineReducers({
  user: userSlice,
  resume: resumeSlice,
  employerVacancies: employerVacanciesSlice,

  companies: companiesSlice,
  jobs: jobsSlice,
  candidates: candidatesSlice,
});
