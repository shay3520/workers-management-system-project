import axios from 'axios';
import { useQuery } from 'react-query';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const registerUser = async (userData: { email: string; password: string; role: string }) => {
  try {
    const response = await axios.post(`${BASE_URL}/users/register`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (loginData: { email: string; password: string }) => {
  try {
    const response = await axios.post(`${BASE_URL}/users/login`, loginData);
    console.log('API Response:', response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const useFetchTotalAdmins = () => {
  return useQuery('totalAdmins', async () => {
    const { data } = await axios.get(`${BASE_URL}/users/totalAdmins`);
    return data.total;
  });
};
