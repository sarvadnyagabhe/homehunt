import axios from 'axios';
import {BASE_URL, ENDPOINT} from '../constant/urls';

const getReviewsList = async () => {
  try {
    const response = await axios.get(`${BASE_URL}${ENDPOINT.get_reviews}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export {getReviewsList};
