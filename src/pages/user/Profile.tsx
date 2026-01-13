import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';

const Profile = () => {
  const { user, logout } = useAuth();

  return (
    <div className="text-brand-white">
      <h1 className="text-2xl font-semibold">Profile</h1>
      <div className="mt-8 space-y-4">
        <p className="text-sm">Name: {user?.name}</p>
        <p className="text-sm">Tier: {user?.tier}</p>
        <Button 
          onClick={logout} 
          className="w-full bg-brand-charcoal text-brand-silver font-semibold py-3 rounded-xl shadow-neumorphic-out active:shadow-neumorphic-out-pressed transition-all duration-200 hover:bg-brand-charcoal hover:text-brand-white"
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Profile;