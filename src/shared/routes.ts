export const ROUTES = {
  home: '/',
  aboutUs: '/about-us',
  contacts: '/about-us/contacts',
  conditions: '/about-us/conditions',
  faq: '/about-us/faq',

  profile: '/profile',

  signin: '/auth/signin',
  signup: '/auth/signup',
  verifyEmail: '/auth/verify-email/:code',
  forgotPassword: '/auth/forgot-password',
  resetPassword: '/auth/reset-password/:code',

  companies: '/companies',
  company: '/companies/:companyid',

  jobs: '/jobs',
  job: '/jobs/:jobid',

  statistics: '/statistics',
  notFound: '*',
};
