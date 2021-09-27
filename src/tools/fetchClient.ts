import axios from 'axios';
import { API_URL } from '../config';

export const fetchClient = () => {
  const instance = axios.create({
    baseURL: API_URL,
  });

  // Set the AUTH token for any request
  instance.interceptors.request.use(function (config) {
    const userId = localStorage.getItem('user_id');
    config.headers.userId = userId ?? '';
    return config;
  });

  return instance;
};




