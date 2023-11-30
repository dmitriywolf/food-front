export const ROUTES = {
  HOME: '/',
  LOGIN: '/signin',
  SIGNUP: '/signup',
  NOT_FOUND: '*',
};

export const DEBUG = process.env.DEBUG === 'true';
export const SERVER_URL = process.env.API_URL;
