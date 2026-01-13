import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const UserProtectedRoute = () => {
  const { user } = useAuth();

  if (!user || user.role !== 'user') {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default UserProtectedRoute;