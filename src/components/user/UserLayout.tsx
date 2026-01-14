import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { User, Wallet, Bell } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import BottomNav from './BottomNav';

const UserLayout = () => {
  const { user } = useAuth();
  const unreadCount = user?.notifications.filter(n => !n.read).length || 0;

  return (
    <div className="flex flex-col h-full w-full max-w-md mx-auto bg-brand-charcoal text-brand-white relative">
      <header className="flex items-center justify-between p-6 pb-2">
        <Link to="/" className="font-cursive text-2xl">Melba</Link>
        <div className="flex gap-4">
          <Link 
            to="/inbox" 
            className="w-10 h-10 bg-brand-charcoal rounded-full flex items-center justify-center shadow-neumorphic-out active:shadow-neumorphic-in transition-all duration-200 relative"
          >
            <Bell className="w-5 h-5 text-brand-silver" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-brand-white text-brand-charcoal text-[10px] font-bold rounded-full flex items-center justify-center shadow-md">
                {unreadCount}
              </span>
            )}
          </Link>
          <Link 
            to="/wallet" 
            className="w-10 h-10 bg-brand-charcoal rounded-full flex items-center justify-center shadow-neumorphic-out active:shadow-neumorphic-in transition-all duration-200"
          >
            <Wallet className="w-5 h-5 text-brand-silver" />
          </Link>
          <Link 
            to="/profile" 
            className="w-10 h-10 bg-brand-charcoal rounded-full flex items-center justify-center shadow-neumorphic-out active:shadow-neumorphic-in transition-all duration-200"
          >
            <User className="w-5 h-5 text-brand-silver" />
          </Link>
        </div>
      </header>

      <main className="flex-grow p-4 overflow-y-auto pb-32">
        <Outlet />
      </main>
      
      <BottomNav />
    </div>
  );
};

export default UserLayout;