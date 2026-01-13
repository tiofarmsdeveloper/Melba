import React from 'react';
import { useAuth } from '@/context/AuthContext';
import MembershipCard from '../../components/user/MembershipCard';

const Dashboard = () => {
  const { user } = useAuth();

  if (!user) {
    return null; // Or a loading spinner
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-light text-brand-white">Welcome back,</h1>
        <h2 className="text-4xl font-semibold text-brand-white">{user.name.split(' ')[0]}</h2>
      </div>
      <MembershipCard user={user} />
    </div>
  );
};

export default Dashboard;