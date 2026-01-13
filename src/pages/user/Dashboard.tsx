import React from 'react';
import { useAuth } from '@/context/AuthContext';
import MembershipCard from '../../components/user/MembershipCard';
import ScanCard from '../../components/user/ScanCard';
import TransactionHistory from '../../components/user/TransactionHistory';
import QuickActions from '../../components/user/QuickActions';

const Dashboard = () => {
  const { user } = useAuth();

  if (!user) {
    return null; // Or a loading spinner
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-lg font-light text-brand-white">Welcome back,</h1>
        <h2 className="text-xl font-semibold text-brand-white">{user.name.split(' ')[0]}</h2>
      </div>
      <MembershipCard user={user} />
      <ScanCard identifier={user.identifier} />
      <TransactionHistory transactions={user.transactions || []} />
      <QuickActions />
    </div>
  );
};

export default Dashboard;