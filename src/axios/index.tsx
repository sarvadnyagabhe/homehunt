import axios, {AxiosRequestConfig, AxiosResponse, AxiosError} from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL} from '../constant/urls';

// Create axios instance
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor
axiosInstance.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    // Add token if available
    const token = await AsyncStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log('[Request]', config);
    return config;
  },
  (error: AxiosError) => {
    console.error('[Request Error]', error);
    return Promise.reject(error);
  },
);

// Add response interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log('[Response]', response);
    return response.data;
  },
  (error: AxiosError) => {
    console.error('[Response Error]', error);

    if (error.response?.status === 401) {
      // Handle unauthorized globally
      console.warn('Unauthorized! Logging out...');
      // Optionally clear AsyncStorage or navigate to login
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
