import axios from 'axios';
import {BASE_URL, ENDPOINT} from '../constant/urls';

const getReviewsList = async (params: any) => {
  try {
    const response = await axios.get(
      `${BASE_URL}${ENDPOINT.get_reviews}?${params}`,
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

export {getReviewsList, AddNewReview};
