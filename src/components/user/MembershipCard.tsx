import React from 'react';
import { User } from '@/data/mockData';

interface MembershipCardProps {
  user: User;
}

const MembershipCard: React.FC<MembershipCardProps> = ({ user }) => {
  return (
    <div className="bg-brand-charcoal rounded-2xl p-5 shadow-neumorphic-out text-brand-white flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-start">
          <div>
            <p className="text-xs text-brand-silver font-light">Member</p>
            <p className="text-lg font-medium tracking-wider">{user.leaderboardUsername}</p>
          </div>
          <p className="font-cursive text-2xl text-brand-white">Melba</p>
        </div>
        <div className="mt-3 text-right">
          <p className="text-xs text-brand-silver font-light">Melba Credits</p>
          <p className="text-xl font-bold tracking-tighter">{user.credits.toLocaleString()}</p>
        </div>
      </div>
      <div className="mt-4 flex justify-between items-end">
        <div>
          <p className="text-xs text-brand-silver font-light tracking-wider">IDENTIFIER</p>
          <p className="text-sm font-medium tracking-widest">{user.identifier}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-brand-silver font-light">Tier</p>
          <p className="text-lg font-cursive">{user.tier}</p>
        </div>
      </div>
    </div>
  );
};

export default MembershipCard;