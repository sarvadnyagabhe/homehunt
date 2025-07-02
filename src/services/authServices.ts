import {ENDPOINT} from '../constant/urls';
import axiosInstance from '../axios';

export const handleAgentLogin = async (payload: {phone: string}) => {
  try {
    const response = await axiosInstance.post(ENDPOINT.agent_login, payload);
    return response;
  } catch (error) {
    throw error;
  }
};
export const handleUserLogin = async (payload: {phone: string}) => {
  try {
    const response = await axiosInstance.post(ENDPOINT.user_login, payload);
    return response;
  } catch (error) {
    throw error;
  }
};

export const VerifyUserOtp = async (payload: {phone: string; otp: number}) => {
  try {
    const response = await axiosInstance.post(ENDPOINT.verify_user, payload);
    return response;
  } catch (error) {
    throw error;
  }
};

export const VerifyAgentOtp = async (payload: {phone: string; otp: number}) => {
  try {
    const response = await axiosInstance.post(ENDPOINT.verify_agent, payload);
    return response;
  } catch (error) {
    throw error;
  }
};

export const handleUserResendOtp = async (payload: {phone: string}) => {
  try {
    const response = await axiosInstance.post(
      ENDPOINT.resend_user_otp,
      payload,
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const handleAgentResendOtp = async (payload: {phone: string}) => {
  try {
    const response = await axiosInstance.post(
      ENDPOINT.resend_agent_otp,
      payload,
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const handleAgentSignup = async (payload: {
  phone: number;
  name: string;
}) => {
  try {
    const response = await axiosInstance.post(ENDPOINT.register_agent, payload);
    return response;
  } catch (error) {
    throw error;
  }
};

export const handleAgentDetails = async (agentId: any) => {
  try {
    const response = await axiosInstance.get(
      `${ENDPOINT.get_agent_details}/${agentId}`,
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const handleUserDetails = async () => {
  try {
    const response = await axiosInstance.get(ENDPOINT.update_user_profile);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const handleAgentUpdateProfile = async (payload: any) => {
  try {
    const response = await axiosInstance.patch(
      ENDPOINT.update_agent_profile,
      payload,
      {headers: {'Content-Type': 'multipart/form-data'}},
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const handleUserUpdateProfile = async (payload: any) => {
  try {
    const response = await axiosInstance.patch(
      ENDPOINT.update_user_profile,
      payload,
      {headers: {'Content-Type': 'multipart/form-data'}},
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const getAgentDetails = async (agentId: string) => {
  try {
    const response = await axiosInstance.get(
      `${ENDPOINT.get_agent_details}/${agentId}`,
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const handleGetWorkingLocations = async () => {
  try {
    const response = await axiosInstance.get(ENDPOINT.work_location);
    return response;
  } catch (error) {
    throw error;
  }
};
