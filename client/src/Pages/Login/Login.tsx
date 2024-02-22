import React, { useState } from 'react';
import { Button, TextField, Typography, Paper, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { LoginFormValues } from './type'; // Ensure this type is defined
import { loginUser } from '../../api/userApi';
import { useTheme } from '@mui/material/styles';
import { useUserContext } from '../../contexts/UserContext';


export const Login = () => {
  const { setUser } = useUserContext();
  const theme = useTheme();
  const navigate = useNavigate();
  const [values, setValues] = useState<LoginFormValues>({
    email: '',
    password: ''
  });
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const userInfo = await loginUser(values); 
      console.log('Login successful');
      setUser({ email: userInfo.email, role: userInfo.role });
      console.log('Logged in user info:', { email: userInfo.email, role: userInfo.role });
      navigate('/dashboard'); 
    } catch (err) {
      console.error('Login failed:', err);
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
          Login Page
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
            autoComplete="current-password"
            value={values.password}
            onChange={(e) => setValues({ ...values, password: e.target.value })}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Submit
          </Button>
        </Box>
        <Link to="/register" style={{ textDecoration: 'none', color: theme.palette.primary.main }}>
          Don't have an account yet? Register
        </Link>
      </Paper>
    </Box>
  );
};
