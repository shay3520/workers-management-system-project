import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../Theme/Theme'; 
import { Login } from '../Pages/Login/Login';
import { Register } from '../Pages/Register/Register';
import { Dashboard } from '../Pages/Dashboard/Dashboard';
import { ManageEmployees } from '../Pages/ManageEmployees/ManageEmployees';
import { QueryClient, QueryClientProvider } from 'react-query';
import { UserProvider } from '../contexts/UserContext';
import {ProtectedRoute} from './ProtectedRoute'; 
import { EmployeePage } from '../Pages/ManageEmployees/Shared/EmployeesControlTable/Shared/EmployeePage/EmployeePage';

const queryClient = new QueryClient();

const AppRouter = () => (
  <UserProvider>
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/manage-employees" element={<ProtectedRoute><ManageEmployees /></ProtectedRoute>} />
            <Route path="/employee/:id" element={<ProtectedRoute><EmployeePage /></ProtectedRoute>} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  </UserProvider>
);

export default AppRouter;
