import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import MembershipCard from '../../components/user/MembershipCard';
import ScanCard from '../../components/user/ScanCard';
import TransactionHistory from '../../components/user/TransactionHistory';
import QuickActions from '../../components/user/QuickActions';
import WelcomeCarousel from '../../components/user/WelcomeCarousel';

const Dashboard = () => {
  const { user } = useAuth();
  const [showSplash, setShowSplash] = useState(false);

  useEffect(() => {
    // Show splash once per session
    const hasSeenSplash = sessionStorage.getItem('melba_splash_seen');
    if (!hasSeenSplash) {
      setShowSplash(true);
    }
  }, []);

  const handleSplashComplete = () => {
    setShowSplash(false);
    sessionStorage.setItem('melba_splash_seen', 'true');
  };

  if (!user) {
    return null;
  }

  return (
    <>
      {showSplash && <WelcomeCarousel onComplete={handleSplashComplete} />}
      
      <div className={`space-y-6 transition-opacity duration-1000 ${showSplash ? 'opacity-0' : 'opacity-100'}`}>
        <div>
          <h1 className="text-lg font-light text-brand-white">Welcome back,</h1>
          <h2 className="text-xl font-semibold text-brand-white">{user.name.split(' ')[0]}</h2>
        </div>
        <MembershipCard user={user} />
        <ScanCard identifier={user.identifier} />
        <TransactionHistory transactions={user.transactions || []} />
        <QuickActions />
      </div>
    </>
  );
};

export default Dashboard;