import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { User } from 'lucide-react';
import BottomNav from './BottomNav';

const UserLayout = () => {
  return (
    <div className="flex flex-col h-full w-full max-w-md mx-auto bg-brand-charcoal text-brand-white relative">
      {/* Header */}
      <header className="flex items-center justify-between p-6 pb-2">
        <Link to="/" className="font-cursive text-2xl">Melba</Link>
        <Link 
          to="/profile" 
          className="w-10 h-10 bg-brand-charcoal rounded-full flex items-center justify-center shadow-neumorphic-out active:shadow-neumorphic-in transition-all duration-200"
        >
          <User className="w-5 h-5 text-brand-silver" />
        </Link>
      </header>

      <main className="flex-grow p-4 overflow-y-auto pb-32">
        <Outlet />
      </main>
      
      <BottomNav />
    </div>
  );
};

export default UserLayout;