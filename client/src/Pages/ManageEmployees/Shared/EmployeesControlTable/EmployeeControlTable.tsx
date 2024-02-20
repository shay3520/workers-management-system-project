import React, { useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import axios from 'axios';
import {Modal, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, IconButton, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Employee, FetchError } from './type';
import AddEmployeeModal from './Shared/AddEmployeeModal/AddEmployeeModal';
import EditEmployeeModal from './Shared/EditEmployeeModal/EditEmployeeModal';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const fetchEmployees = async (): Promise<Employee[]> => {
  const { data } = await axios.get<Employee[]>(`${BASE_URL}/employees/table2`);
  return data;
};

  
const EmployeeControlTable = () => {
  const queryClient = useQueryClient(); 
  const { data: employees, isLoading, isError, error } = useQuery<Employee[], FetchError>('employeesControl', fetchEmployees);
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);
  const refreshEmployees = () => queryClient.invalidateQueries('employeesControl');

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState<Employee | null>(null);

  const handleOpenEditModal = (employee: Employee) => {
    setCurrentEmployee(employee); 
    setEditModalOpen(true);
  };
  
  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setCurrentEmployee(null); 
  };
 
  const handleDeleteClick = async (employeeId: Employee["_id"]) => {
    console.log("Deleting employee with ID:", employeeId);
    try {
      await axios.delete(`${BASE_URL}/employees/${employeeId}`);
      queryClient.invalidateQueries('employeesControl'); 
    } catch (error) {
      console.error("Failed to delete employee:", error);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error?.message}</div>;


  return (
    <Box sx={{ maxWidth: '80%', mx: 'auto', mt: 4 }}>
      <Typography variant="h4" sx={{ textAlign: 'center', mb: 4, fontSize: '2.5rem' }}>
        Employee Management Table
      </Typography>
      
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <Button variant="contained" color="primary" sx={{ mb: 2, alignSelf: 'flex-start' }} onClick={handleOpenModal}>
          Create New Employee
        </Button>
        <AddEmployeeModal open={modalOpen} handleClose={handleCloseModal} refreshEmployees={refreshEmployees} />
        
        <TableContainer component={Paper}>
          <Table aria-label="employee control table">
            <TableHead>
              <TableRow>
                <TableCell align="left"  sx={{ width: '20%' }}>Name</TableCell>
                <TableCell align="left"  sx={{ width: '20%' }}>Email</TableCell> 
                <TableCell align="left"  sx={{ width: '20%' }}>Address</TableCell>
                <TableCell align="left"  sx={{ width: '20%' }}>Salary ($)</TableCell>
                <TableCell align="left"  sx={{ width: '10%' }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employees?.map((employee) => (
                <TableRow key={employee._id}>
                  <TableCell align="left">{employee.name}</TableCell>
                  <TableCell align="left">{employee.email}</TableCell>
                  <TableCell align="left">{employee.address}</TableCell>
                  <TableCell align="left">{employee.salary}</TableCell> 
                  <TableCell align="left">
                    <IconButton aria-label="edit" onClick={() => handleOpenEditModal(employee)} >
                      <EditIcon />
                    </IconButton>
                    <IconButton aria-label="delete" onClick={() => handleDeleteClick(employee._id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <EditEmployeeModal 
    open={editModalOpen} 
    handleClose={handleCloseEditModal} 
    refreshEmployees={refreshEmployees} 
    employee={currentEmployee} 
  />
    </Box>
  );
};

export default EmployeeControlTable;
