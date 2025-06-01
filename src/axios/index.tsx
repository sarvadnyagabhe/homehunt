import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, {AxiosError, AxiosRequestConfig} from 'axios';
import {clearAuthState} from '../store/slice/authSlice';
import {Dispatch} from '@reduxjs/toolkit';
import {Platform} from 'react-native';

export const setAxiosInterceptor = async (token: any, dispatch: Dispatch) => {
  const headers = {
    'content-type': 'application/json',
    authorization: `Bearer ${token}`,
  };

  // Add a request interceptor
  axios.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      config.headers = {
        ...headers,
        ...config.headers,
      };
      return config;
    },
    function (error: AxiosError) {
      console.log('error in axios request', error);

      return Promise.reject(error);
    },
  );

  // Add a response interceptor
  axios.interceptors.response.use(
    function (response) {
      return response;
    },
    async function (error: AxiosError) {
      console.log('error', error);

      if (error?.response?.status == 401) {
        await AsyncStorage.clear();
        dispatch(clearAuthState());
      }
      return Promise.reject(error);
    },
  );
};
