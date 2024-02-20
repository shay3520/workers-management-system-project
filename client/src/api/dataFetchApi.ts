import { useQuery } from 'react-query';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const useFetchTotalAdmins = () => {
  return useQuery('totalAdmins', async () => {
    const { data } = await axios.get(`${BASE_URL}/users/totalAdmins`);
    return data.total;
  });
};

export const useFetchTotalEmployees = () => {
  return useQuery('totalEmployees', async () => {
    const { data } = await axios.get(`${BASE_URL}/employees/totalEmployees`);
    return data.total;
  });
};

export const useFetchTotalSalary = () => {
  return useQuery('totalSalary', async () => {
    const { data } = await axios.get(`${BASE_URL}/employees/totalSalary`);
    return data.totalSalary;
  });
};
