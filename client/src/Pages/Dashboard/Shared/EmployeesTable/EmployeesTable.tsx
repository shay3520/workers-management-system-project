import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Employee, FetchError } from './type'; 

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const fetchEmployees = async (): Promise<Employee[]> => {
  const { data } = await axios.get<Employee[]>(`${BASE_URL}/employees/table1`); 
  return data;
};

const EmployeesTable = () => {
  const { data: employees, isLoading, isError, error } = useQuery<Employee[], FetchError>('employees', fetchEmployees);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error?.message}</div>;

  return (
    <TableContainer component={Paper} sx={{ maxWidth: '100%', mt: 4, mx: 'auto' }}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold', fontSize: { xs: '0.8rem', sm: '1.2rem' }, padding: { xs: '6px', sm: '16px' } }}>Name</TableCell>
            <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: { xs: '0.8rem', sm: '1.2rem' }, padding: { xs: '6px', sm: '16px' } }}>Email</TableCell> 
            <TableCell align="right" sx={{ fontWeight: 'bold', fontSize: { xs: '0.8rem', sm: '1.2rem' }, padding: { xs: '6px', sm: '16px' } }}>Salary</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employees?.map((employee) => (
            <TableRow key={employee._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row" align="left" sx={{ fontSize: { xs: '0.8rem', sm: '1rem' }, padding: { xs: '6px', sm: '16px' } }}>
                {employee.name}
              </TableCell>
              <TableCell align="center" sx={{ fontSize: { xs: '0.8rem', sm: '1rem' }, padding: { xs: '6px', sm: '16px' } }}>{employee.email}</TableCell> 
              <TableCell align="right" sx={{ fontSize: { xs: '0.8rem', sm: '1rem' }, padding: { xs: '6px', sm: '16px' }}}>{employee.salary}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EmployeesTable;
