// frontend/src/axiosConfig.js

import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: '/api', // Base URL for all API requests
});

// Request interceptor to add the token to headers
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
