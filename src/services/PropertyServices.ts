import axios from 'axios';
import {BASE_URL, ENDPOINT} from '../constant/urls';

const getReviewsList = async (params: any) => {
  try {
    const response = await axios.get(
      `${BASE_URL}${ENDPOINT.get_reviews}?agent_id=${params.agent_id}`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const AddNewReview = async (payload: any) => {
  try {
    const response = await axios.post(
      `${BASE_URL}${ENDPOINT.add_reviews}`,
      payload,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const handleAddBookmark = async (payload: any) => {
  try {
    const response = await axios.post(
      `${BASE_URL}${ENDPOINT.bookmark}`,
      payload,
    );
    return response?.data;
  } catch (error) {
    throw error;
  }
};

const handleGetAgentBookmark = async () => {
  try {
    const response = await axios.get(`${BASE_URL}${ENDPOINT.bookmark}`);
    return response?.data;
  } catch (error) {
    throw error;
  }
};

const handleDeleteAgentBookmark = async (payload: any) => {
  try {
    const response = await axios.delete(`${BASE_URL}${ENDPOINT.bookmark}`, {
      data: payload,
    });
    return response?.data;
  } catch (error) {
    throw error;
  }
};

export {
  getReviewsList,
  AddNewReview,
  handleAddBookmark,
  handleGetAgentBookmark,
  handleDeleteAgentBookmark,
};
