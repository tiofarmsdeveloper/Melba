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
          <p className="text-sm text-brand-silver font-light">Member</p>
          <p className="text-2xl font-medium tracking-wider">{user.name}</p>
        </div>
        <p className="font-cursive text-4xl text-brand-white">Melba</p>
      </div>
      <div className="mt-6 text-right">
        <p className="text-sm text-brand-silver font-light">Melba Credits</p>
        <p className="text-3xl font-bold tracking-tighter">{user.credits.toLocaleString()}</p>
      </div>
      <div className="mt-4 text-left">
        <p className="text-sm text-brand-silver font-light">Tier</p>
        <p className="text-2xl font-cursive">{user.tier}</p>
      </div>
    </div>
  );
};

export default MembershipCard;