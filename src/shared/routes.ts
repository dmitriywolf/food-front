export const ROUTES = {
  home: '/',

  // About pages
  aboutUs: '/about-us',
  contacts: '/about-us/contacts',
  conditions: '/about-us/conditions',
  faq: '/about-us/faq',

  // account
  account: '/account',
  accountTabs: '/account/:tab',

  profile: '/account/profile',

  // seeker profile
  profileResume: '/account/resume',
  profileApplications: '/account/applications',

  // employer profile
  profileAddEditVacancy: '/account/add-edit-vacancy',
  profileVacancies: '/account/vacancies',

  // auth
  signin: '/auth/signin',
  signup: '/auth/signup',
  verifyEmail: '/auth/verify-email/:code',
  forgotPassword: '/auth/forgot-password',
  resetPassword: '/auth/reset-password/:code',

  // companies
  companies: '/companies',
  company: '/companies/:companyid',

  // jobs
  jobs: '/jobs',
  job: '/jobs/:jobid',

  // candidates
  candidates: '/candidates',
  candidate: '/candidates/:candidateid',

  // not found
  notFound: '*',
};
