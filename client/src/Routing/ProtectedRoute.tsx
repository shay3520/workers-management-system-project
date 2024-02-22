import React, { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { useUserContext } from '../contexts/UserContext';

type ProtectedRouteProps = {
    children: ReactElement;
  };
  
  export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { user } = useUserContext();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
