import React, { useState } from 'react'
import { Button, TextField, Box, Typography, MenuItem } from '@mui/material'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'


export const Register = () => {
    const navigate = useNavigate(); 
    const [values, setValues] = useState({
    email: '',
    password: '',
    role: '' 
  })

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    console.log(values)
    axios.post('http://localhost:8080/api/users/register', values)
    .then(result => {
        console.log(result)
        navigate('/login');
    })
    .catch(err => {
        console.error(err)
    })
}

  return (
    <Box sx={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundImage: 'url(../../assets/employeems.jpeg)',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
      <Box sx={{
        width: 400,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <Typography component="h1" variant="h5">
          Registration Page
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1, width: '100%' }} onSubmit={handleSubmit}>
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
            onChange={(e) => setValues({ ...values, role: e.target.value })}
            fullWidth
            variant="outlined"
            margin="normal"
          >
            {['admin', 'viewer', 'employee'].map((role) => (
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
        <Link to="/login" style={{ marginTop: '20px', textDecoration: 'none', color: '#1976d2' }}>Already have an account? Login</Link>
      </Box>
    </Box>
  )
}
