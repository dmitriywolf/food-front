export const ROUTES = {
  home: '/',
  aboutUs: '/about-us',
  contacts: '/about-us/contacts',
  conditions: '/about-us/conditions',
  faq: '/about-us/faq',
  me: '/me',
  editMe: '/me-edit',
  signin: '/auth/signin',
  signup: '/auth/signup',
  confirmEmail: '/auth/confirm-email/:token',
  forgotPassword: '/auth/forgot-password',
  resetPassword: '/auth/reset-password/:token',
  companies: '/companies',
  company: '/companies/:companyid',
  jobs: '/jobs',
  job: '/jobs/:jobid',
  statistics: '/statistics',
  notFound: '*',
};

export const API_PATHS = {
  signup: '/auth/reguster',
  login: 'auth/login',
};

export const DEBUG = process.env.DEBUG === 'true';
export const API_URL = `${process.env.API_URL}/api`;

export const TOKEN_LOCALSTORAGE_KEY = 'token';
