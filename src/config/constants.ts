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

export const DEBUG = process.env.DEBUG === 'true';
export const SERVER_URL = process.env.API_URL;
