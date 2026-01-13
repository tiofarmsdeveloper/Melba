import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { showSuccess } from '@/utils/toast';
import { LogOut, UserCircle } from 'lucide-react';

const Profile = () => {
  const { user, logout, updateUsername } = useAuth();
  const [nickname, setNickname] = useState(user?.leaderboardUsername || '');

  const handleSave = () => {
    updateUsername(nickname);
    showSuccess("Nickname updated successfully!");
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="text-center">
        <div className="w-24 h-24 bg-brand-charcoal rounded-full flex items-center justify-center shadow-neumorphic-out mx-auto mb-4 overflow-hidden border-4 border-brand-charcoal">
          {user?.avatar ? (
            <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <UserCircle className="w-16 h-16 text-brand-silver" />
          )}
        </div>
        <h1 className="text-xl font-semibold">{user?.name}</h1>
        <p className="text-xs text-brand-silver font-light uppercase tracking-widest mt-1">{user?.tier} Member</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <Label className="text-[10px] text-brand-silver font-light tracking-[0.2em] uppercase ml-1">Lounge Alias</Label>
          <div className="relative">
            <Input 
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="e.g. Pizza Connoisseur"
              className="bg-brand-charcoal text-brand-white border-none rounded-xl h-12 shadow-neumorphic-in focus:ring-1 focus:ring-brand-silver/20 transition-all px-4"
            />
          </div>
          <Button 
            onClick={handleSave}
            className="w-full bg-brand-silver text-brand-charcoal font-bold py-6 rounded-xl shadow-md hover:brightness-95 active:scale-[0.98] transition-all"
          >
            Update Alias
          </Button>
        </div>

        <div className="pt-4 border-t border-brand-white/5">
          <Button 
            onClick={logout}
            variant="ghost"
            className="w-full text-red-400 hover:text-red-300 hover:bg-transparent flex items-center justify-center gap-2 py-6 rounded-xl shadow-neumorphic-out active:shadow-neumorphic-in transition-all"
          >
            <LogOut className="w-4 h-4" /> Sign Out of Lounge
          </Button>
        </div>
      </div>
      
      <p className="text-center text-[10px] text-brand-silver/30 font-light mt-12">
        MEMBER SINCE JULY 2024 • ID: {user?.identifier}
      </p>
    </div>
  );
};

export default Profile;