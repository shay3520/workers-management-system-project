import React from 'react'
import SideNav from '../../components/SideNav/SideNav'
import DashboardCard from './Shared/DashboardCard/DashboardCard'
import { useFetchTotalAdmins, useFetchTotalEmployees, useFetchTotalSalary } from '../../api/dataFetchApi';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import EmployeesTable from './Shared/EmployeesTable/EmployeesTable';

export const Dashboard = () => {
  const { data: totalAdmins, isLoading: isLoadingAdmins } = useFetchTotalAdmins();
  const { data: totalEmployees, isLoading: isLoadingEmployees } = useFetchTotalEmployees();
  const { data: totalSalary, isLoading: isLoadingSalary } = useFetchTotalSalary();

  return (
    <Box sx={{ display: 'flex' }}>
      <SideNav />
      <Box sx={{ flexGrow: 1, p: 3, marginLeft: { sm: '240px' } }}> 
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <DashboardCard title="Admins" data={isLoadingAdmins ? 'Loading...' : totalAdmins} />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <DashboardCard title="Employees" data={isLoadingEmployees ? 'Loading...' : totalEmployees} />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <DashboardCard title="Total Salary" data={isLoadingSalary ? 'Loading...' : `$${totalSalary}`} />
          </Grid>
        </Grid>
        <EmployeesTable />
      </Box>
    </Box>
  )
}
