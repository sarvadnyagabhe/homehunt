import axios from 'axios';
import {BASE_URL, ENDPOINT} from '../constant/urls';

const getAllAgentList = async (id: number) => {
  try {
    const response = await axios.get(
      `${BASE_URL}${ENDPOINT.get_agent_by_location}?locationId=${id}`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getAgentDetailsById = async (id: number) => {
  try {
    const response = await axios.get(
      `${BASE_URL}${ENDPOINT.get_agent_details}/${id}`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export {getAllAgentList, getAgentDetailsById};
