import axios from 'axios';
import { useQuery, useQueryClient } from 'react-query';
import { Employee } from '../Pages/ManageEmployees/Shared/EmployeesControlTable/type';
import { FormData } from '../Pages/ManageEmployees/Shared/EmployeesControlTable/Shared/AddEmployeeModal/type';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;


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

  export const DeleteEmployee = async (employeeId: Employee["_id"]) => {
    const queryClient = useQueryClient();
    try {
      await axios.delete(`${BASE_URL}/employees/${employeeId}`);
      queryClient.invalidateQueries('employeesControl');
    } catch (error) {
      console.error("Failed to delete employee:", error);
      throw error; 
    }
  };

  export const updateEmployee = async (employeeId: Employee["_id"], foormData: FormData) => {
    const url = `${BASE_URL}/employees/updateEmployee/${employeeId}`;
    try {
      await axios.put(url, foormData);
    } catch (error) {
      console.error("Failed to update employee:", error);
      throw error; 
    }
  };
  