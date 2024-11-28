// frontend/src/axiosConfig.js

import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api', // Base URL for all API requests
  withCredentials: true, // Include cookies in requests
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor to handle errors globally
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // If unauthorized, redirect to login
    if (error.response && error.response.status === 401) {
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
