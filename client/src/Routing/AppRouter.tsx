import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../Theme/Theme'; 
import {Login} from '../Pages/Login/Login';
import {Register} from '../Pages/Register/Register';
import { Dashboard } from '../Pages/Dashboard/Dashboard';
import { ManageEmployees } from '../Pages/ManageEmployees/ManageEmployees';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

const AppRouter = () => (
  <ThemeProvider theme={theme}>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/manage-employees" element={<ManageEmployees />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </ThemeProvider>
);

export default AppRouter;
