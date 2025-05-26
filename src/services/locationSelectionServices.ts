import axios from 'axios';
import {BASE_URL, ENDPOINT} from '../constant/urls';

const getAllCityList = async () => {
  try {
    const response = await axios.get(`${BASE_URL}${ENDPOINT.get_locations}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export {getAllCityList};
