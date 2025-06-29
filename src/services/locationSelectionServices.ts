import axios from 'axios';
import {BASE_URL, ENDPOINT} from '../constant/urls';

const getAllCityList = async () => {
  try {
    const response = await axios.get(`${BASE_URL}${ENDPOINT.get_city}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getAllAreasList = async (cityId: number) => {
  try {
    let url = `${BASE_URL}${ENDPOINT.get_areas}`;
    if (cityId) {
      url += `?cityId=${cityId}`;
    }
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getAllLocalitiesList = async (payload: {
  cityId: number;
  areaId: number | undefined;
}) => {
  try {
    let url = `${BASE_URL}${ENDPOINT.get_localities}?cityId=${payload?.cityId}`;
    if (payload?.areaId) {
      url = url + `&areaId=${payload?.areaId}`;
    }
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const searchLocalities = async (payload: {name: string; cityId?: number}) => {
  try {
    let url = `${BASE_URL}${ENDPOINT.search_localities}?name=${payload?.name}`;
    if (payload?.cityId) {
      url += `&cityId=${payload?.cityId}`;
    }
    console.log({url});

    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export {
  getAllCityList,
  getAllAreasList,
  getAllLocalitiesList,
  searchLocalities,
};
