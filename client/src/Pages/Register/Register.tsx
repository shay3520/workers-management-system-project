import React, { useState } from 'react';
import { Button, TextField, Typography, MenuItem, Paper, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { RegisterFormValues } from './type'; 
import { registerUser } from '../../api/userApi';
import { useTheme } from '@mui/material/styles';

export const Register = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [values, setValues] = useState<RegisterFormValues>({
    email: '',
    password: '',
    role: '',
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await registerUser(values);
      console.log('Registration successful');
      navigate('/login');
    } catch (err) {
      console.error('Registration failed:', err);
    }
  };

  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        backgroundImage: 'url(../../assets/employeems.jpeg)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          '& .MuiTextField-root': { mb: 2 },
          '& .MuiButton-root': { mt: 1, mb: 2 },
        }}
      >
        <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
          Registration Page
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ width: 400, maxWidth: '100%' }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={values.email}
            onChange={(e) => setValues({ ...values, email: e.target.value })}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
            value={values.password}
            onChange={(e) => setValues({ ...values, password: e.target.value })}
          />
          <TextField
            select
            label="Role"
            value={values.role}
            onChange={(e) => setValues({ ...values, role: e.target.value as RegisterFormValues['role'] })}
            fullWidth
            variant="outlined"
            margin="normal"
          >
            {['admin', 'viewer'].map((role) => (
              <MenuItem key={role} value={role}>
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </MenuItem>
            ))}
          </TextField>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Register
          </Button>
        </Box>
        <Link to="/login" style={{ textDecoration: 'none', color: theme.palette.primary.main }}>
          Already have an account? Login
        </Link>
      </Paper>
    </Box>
  );
};
