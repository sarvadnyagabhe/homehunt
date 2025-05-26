import axios from 'axios';
import {BASE_URL, ENDPOINT} from '../constant/urls';

export const handleLogin = async (payload: {phone: number}) => {
  try {
    const response = await axios.post(
      `${BASE_URL}${ENDPOINT.user_login}`,
      payload,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const VerifyOtp = async (payload: {phone: number; otp: number}) => {
  try {
    const response = await axios.post(
      `${BASE_URL}${ENDPOINT.user_login}`,
      payload,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const handleResendOtp = async (payload: {phone: number}) => {
  try {
    const response = await axios.post(
      `${BASE_URL}${ENDPOINT.resend_otp}`,
      payload,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
