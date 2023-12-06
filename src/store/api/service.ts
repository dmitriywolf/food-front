import axios from 'axios';

import { API_URL, API_PATHS, TOKEN_LOCALSTORAGE_KEY } from 'config/constants';
import type { SignupType } from './types';

const instance = axios.create({
  baseURL: API_URL,
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem(
    TOKEN_LOCALSTORAGE_KEY,
  );
  return config;
});

// AUTH
const signup = async (signupData: SignupType) => {
  const data = await instance.post(API_PATHS.signup, {
    body: JSON.stringify(signupData),
  });

  return data;
};

export const apiService = {
  signup,
};
