import React from 'react';
import { User } from '@/data/mockData';

interface MembershipCardProps {
  user: User;
}

const MembershipCard: React.FC<MembershipCardProps> = ({ user }) => {
  return (
    <div className="bg-brand-charcoal rounded-2xl p-5 shadow-neumorphic-out text-brand-white">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-xs text-brand-silver font-light">Member</p>
          <p className="text-lg font-medium tracking-wider">{user.name}</p>
        </div>
        <p className="font-cursive text-2xl text-brand-white">Melba</p>
      </div>
      <div className="mt-3 text-right">
        <p className="text-xs text-brand-silver font-light">Melba Credits</p>
        <p className="text-xl font-bold tracking-tighter">{user.credits.toLocaleString()}</p>
      </div>
      <div className="mt-2 text-left">
        <p className="text-xs text-brand-silver font-light">Tier</p>
        <p className="text-lg font-cursive">{user.tier}</p>
      </div>
    </div>
  );
};

export default MembershipCard;