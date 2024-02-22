import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, TextField, Button, Stack, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { FormData, AddEmployeeModalProps, Employee } from '../AddEmployeeModal/type';
import { SelectChangeEvent } from '@mui/material/Select';
import { updateEmployee } from '../../../../../../api/employeeApi';

const BoxStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

interface EditEmployeeModalProps extends AddEmployeeModalProps {
  employee: Employee | null;
}

const EditEmployeeModal: React.FC<EditEmployeeModalProps> = ({ open, handleClose, refreshEmployees, employee }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    address: '',
    salary: '',
    category: '',
    image: '',
  });

  useEffect(() => {
    if (employee && open) {
      setFormData({
        name: employee.name,
        email: employee.email,
        address: employee.address,
        salary: employee.salary.toString(),
        category: employee.category,
        image: employee.image || '',
      });
    }
  }, [employee, open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<{ name?: string; value: unknown }>) => {
    const name = e.target.name as keyof typeof formData;
    const value = e.target.value as string;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };
  const handleSelectChange = (event: SelectChangeEvent) => {
    const name = event.target.name as keyof typeof formData;
    const value = event.target.value;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };
  

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    if (employee?._id) {
      try {
        await updateEmployee(employee._id, formData);
        handleClose();
        refreshEmployees(); 
      } catch (error) {
        console.error("Failed to update employee:", error);
      }
    } else {
      console.error("No employee ID provided, cannot update.");
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="edit-employee-modal-title"
      aria-describedby="edit-employee-modal-description"
    >
      <Box sx={BoxStyle} component="form" onSubmit={handleSubmit} noValidate>
        <Typography id="edit-employee-modal-title" variant="h6" component="h2" textAlign="center" mb={2}>
          Edit Employee
        </Typography>
        <Stack spacing={2}>
          <TextField
            required
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            required
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            required
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
          <TextField
            required
            label="Salary"
            name="salary"
            type="number"
            value={formData.salary}
            onChange={handleChange}
          />
          <FormControl fullWidth required>
            <InputLabel id="category-label">Category</InputLabel>
                <Select
                labelId="category-label"
                name="category"
                value={formData.category}
                onChange={handleSelectChange}
                displayEmpty
                >
                <MenuItem value="" disabled></MenuItem>
                <MenuItem value="Development">Development</MenuItem>
                <MenuItem value="IT">IT</MenuItem>
                <MenuItem value="Designing">Designing</MenuItem>
                <MenuItem value="Management">Management</MenuItem>
                </Select>
            </FormControl>
          <TextField
            label="Image URL"
            name="image"
            value={formData.image}
            onChange={handleChange}
          />
          <Button type="submit" variant="contained" color="primary">Save Changes</Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default EditEmployeeModal;
