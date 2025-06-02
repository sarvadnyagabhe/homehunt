import axios from 'axios';
import {BASE_URL, ENDPOINT} from '../constant/urls';

export const handleAgentLogin = async (payload: {phone: number}) => {
  try {
    const response = await axios.post(
      `${BASE_URL}${ENDPOINT.agent_login}`,
      payload,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const handleUserLogin = async (payload: {phone: number}) => {
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

export const VerifyUserOtp = async (payload: {phone: number; otp: number}) => {
  try {
    const response = await axios.post(
      `${BASE_URL}${ENDPOINT.verify_user}`,
      payload,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const VerifyAgentOtp = async (payload: {phone: number; otp: number}) => {
  try {
    const response = await axios.post(
      `${BASE_URL}${ENDPOINT.verify_agent}`,
      payload,
    );
    console.log(response.data);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const handleUserResendOtp = async (payload: {phone: number}) => {
  try {
    const response = await axios.post(
      `${BASE_URL}${ENDPOINT.resend_user_otp}`,
      payload,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const handleAgentResendOtp = async (payload: {phone: number}) => {
  try {
    const response = await axios.post(
      `${BASE_URL}${ENDPOINT.resend_agent_otp}`,
      payload,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const handleAgentSignup = async (payload: {
  phone: number;
  name: string;
}) => {
  try {
    const response = await axios.post(
      `${BASE_URL}${ENDPOINT.register_agent}`,
      payload,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const handleAgentDetails = async (agentId: number) => {
  try {
    const response = await axios.get(
      `${BASE_URL}${ENDPOINT.get_agent_details}/${agentId}`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const handleProfile = async (payload: any) => {
  try {
    const response = await axios.patch(
      `${BASE_URL}${ENDPOINT.update_agent_profile}`,
      payload,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
