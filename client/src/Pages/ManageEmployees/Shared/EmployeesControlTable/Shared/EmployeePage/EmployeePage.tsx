import React from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Card, CardContent, CardMedia, Typography, Grid } from '@mui/material';


export const EmployeePage = () => {
  const location = useLocation();
  const employee = location.state.employee; 

  
  return (
    <Box sx={{ flexGrow: 1, m: 2, display: 'flex', justifyContent: 'center' }}>
      <Box sx={{ width: '50%' }}>
        <Typography variant="h3" color="text.primary" sx={{ mb: 4, mt: 3,  textAlign: 'center' }}>
          Employee Page - {employee.name}
        </Typography>
        <Card sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center' }}>
          <CardContent sx={{ flex: '1 1 auto', marginRight: { md: 2 } }}>
            <Typography component="div" variant="h5"  color="text.secondary" sx={{ marginBottom: 2 }}>
              Details
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="subtitle1" color="text.secondary"><strong>Email:</strong> {employee.email}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" color="text.secondary"><strong>Address:</strong> {employee.address}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" color="text.secondary"><strong>Salary:</strong> ${employee.salary}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" color="text.secondary"><strong>Category:</strong> {employee.category || 'N/A'}</Typography>
              </Grid>
            </Grid>
          </CardContent>
          {employee.image && (
            <CardMedia
              component="img"
              sx={{ width: 350, margin: 2 }}
              image={employee.image}
              alt={employee.name}
            />
          )}
        </Card>
      </Box>
    </Box>
  );

};
