import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import MembershipCard from '../../components/user/MembershipCard';
import ScanCard from '../../components/user/ScanCard';
import TransactionHistory from '../../components/user/TransactionHistory';
import QuickActions from '../../components/user/QuickActions';
import WelcomeCarousel from '../../components/user/WelcomeCarousel';
import TierProgress from '../../components/user/TierProgress';
import FeaturedRewards from '../../components/user/FeaturedRewards';

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
      
      <div className={`space-y-8 transition-opacity duration-1000 ${showSplash ? 'opacity-0' : 'opacity-100'}`}>
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-lg font-light text-brand-white">Welcome back,</h1>
            <h2 className="text-xl font-semibold text-brand-white">{user.name.split(' ')[0]}</h2>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-brand-silver font-light tracking-widest uppercase">ID Status</p>
            <p className="text-xs font-bold text-green-400">ACTIVE</p>
          </div>
        </div>

        <MembershipCard user={user} />
        
        <TierProgress user={user} />

        <ScanCard identifier={user.identifier} />
        
        <FeaturedRewards />

        <TransactionHistory transactions={user.transactions || []} />
        
        <QuickActions />

        <div className="pt-8 pb-4 text-center">
          <p className="text-[10px] text-brand-silver/20 uppercase tracking-[0.3em]">The Melba House • Private Estate</p>
        </div>
      </div>
    </>
  );
};

export default Dashboard;