import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button, Stack, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import axios from 'axios';
import { AddEmployeeModalProps, FormData  } from './type';
import { SelectChangeEvent } from '@mui/material/Select';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const AddEmployeeModal: React.FC<AddEmployeeModalProps> = ({ open, handleClose, refreshEmployees }) => { 
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        address: '',
        salary: '',
        category:'',
        image: '',
      });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSelectChange = (event: SelectChangeEvent) => {
        const name = event.target.name as keyof FormData;
        const value = event.target.value;
        setFormData(prevState => ({ ...prevState, [name]: value }));
      };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/employees/addEmployee`, formData);
      handleClose();
      refreshEmployees(); 
    } catch (error) {
      console.error("Failed to add new employee:", error);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} component="form" onSubmit={handleSubmit} noValidate>
        <Typography id="modal-modal-title" variant="h6" component="h2" textAlign="center" mb={2}>
          Add New Employee
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
          <Button type="submit" variant="contained" color="primary">Submit</Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default AddEmployeeModal;
