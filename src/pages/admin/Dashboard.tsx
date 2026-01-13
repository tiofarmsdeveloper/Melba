import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';

const AdminDashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="p-4 text-brand-white">
      <h1 className="text-2xl">Welcome, {user?.name}</h1>
      <p>This is the admin dashboard.</p>
      <Button onClick={logout} className="mt-4">Logout</Button>
    </div>
  );
};

export default AdminDashboard;