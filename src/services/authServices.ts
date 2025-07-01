import axios from 'axios';
import {BASE_URL, ENDPOINT} from '../constant/urls';

export const handleAgentLogin = async (payload: {phone: string}) => {
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
export const handleUserLogin = async (payload: {phone: string}) => {
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

export const VerifyUserOtp = async (payload: {phone: string; otp: number}) => {
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

export const VerifyAgentOtp = async (payload: {phone: string; otp: number}) => {
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

export const handleUserResendOtp = async (payload: {phone: string}) => {
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

export const handleAgentResendOtp = async (payload: {phone: string}) => {
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

export const handleAgentDetails = async (agentId: any) => {
  try {
    const response = await axios.get(
      `${BASE_URL}${ENDPOINT.get_agent_details}/${agentId}`,
    );
    console.log('agentId', agentId, response?.data);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const handleUserDetails = async (userId: any) => {
  try {
    const response = await axios.get(
      `${BASE_URL}${ENDPOINT.get_user_details}/${userId}`,
    );
    console.log('user', userId, response?.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const handleAgentUpdateProfile = async (payload: any) => {
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

export const handleUserUpdateProfile = async (payload: any) => {
  try {
    const response = await axios.patch(
      `${BASE_URL}${ENDPOINT.update_agent_profile}`,
      payload,
      {
        headers: {
          'content-Type': 'multipart/form-data',
        },
      },
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAgentDetails = async (agentId: string, token: string) => {
  try {
    const response = await axios.get(
      `${BASE_URL}${ENDPOINT.get_agent_details}/${agentId}`,
      {
        headers: {Authorization: `Bearer ${token}`},
      },
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserDetails = async (userId: string, token: string) => {
  try {
    const url = `${BASE_URL}${ENDPOINT.user_details}${userId}`;
    const response = await axios.get(url, {
      headers: {Authorization: `Bearer ${token}`},
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const handleGetWorkingLocations = async (token: string) => {
  try {
    const response = await axios.get(`${BASE_URL}${ENDPOINT.work_location}`, {
      headers: {Authorization: `Bearer ${token}`},
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
