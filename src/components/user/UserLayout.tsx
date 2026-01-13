import React from 'react';
import { Outlet } from 'react-router-dom';
import BottomNav from './BottomNav';

const UserLayout = () => {
  return (
    <div className="flex flex-col h-full w-full max-w-md mx-auto bg-brand-charcoal">
      <main className="flex-grow p-4 overflow-y-auto">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
};

export default UserLayout;