import axios from 'axios';

import { API_URL, TOKEN_LOCALSTORAGE_KEY } from 'shared/constants';

const instance = axios.create({
  baseURL: API_URL,
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem(
    TOKEN_LOCALSTORAGE_KEY,
  );
  return config;
});

export default instance;
