import React from 'react'
import SideNav from '../../components/SideNav/SideNav'
import DashboardCard from './Shared/DashboardCard/DashboardCard'
import { useFetchTotalEmployees, useFetchTotalSalary } from '../../api/employeeApi';
import { useFetchTotalAdmins } from '../../api/userApi';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import EmployeesTable from './Shared/EmployeesTable/EmployeesTable';
export const Dashboard = () => {
  const { data: totalAdmins, isLoading: isLoadingAdmins } = useFetchTotalAdmins();
  const { data: totalEmployees, isLoading: isLoadingEmployees } = useFetchTotalEmployees();
  const { data: totalSalary, isLoading: isLoadingSalary } = useFetchTotalSalary();

  return (
    <Box sx={{ display: 'flex',overflowY: 'auto'}}>
      <SideNav />
      <Box sx={{ flexGrow: 1, p: 3, marginLeft: { sm: '240px', xs: 0 }, paddingLeft: {xs: '0', sm: '20px'},boxSizing: 'border-box'}}> 
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
