export { default as employerVacanciesSlice } from './employerVacanciesSlice';

// components
export { Vacancy } from './components/Vacancy';

// service
export { getVacancies, createVacancy } from './services';

// selectors
export {
  selectIsLoading,
  selectError,
  selectEditedVacancy,
  selectVacancies,
} from './employerVacanciesSlice';
