import React from 'react';
import { User } from '@/data/mockData';
import { Trophy, Diamond } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MembershipCardProps {
  user: User;
}

const tierStyles = {
  Bronze: {
    icon: Trophy,
    className: 'text-yellow-700',
    cardBorder: 'border-yellow-800/50',
  },
  Silver: {
    icon: Trophy,
    className: 'text-gray-400',
    cardBorder: 'border-gray-400/50',
  },
  Gold: {
    icon: Trophy,
    className: 'text-yellow-400',
    cardBorder: 'border-yellow-400/50',
  },
  Platinum: {
    icon: Diamond,
    className: 'text-blue-400',
    cardBorder: 'border-blue-400/50',
  },
};

const MembershipCard: React.FC<MembershipCardProps> = ({ user }) => {
  const { icon: Icon, className, cardBorder } = tierStyles[user.tier];

  return (
    <div className={cn("bg-brand-charcoal rounded-2xl p-5 shadow-neumorphic-out text-brand-white border-2", cardBorder)}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-brand-silver font-light">Member</p>
          <p className="text-xl font-medium tracking-wider">{user.name}</p>
        </div>
        <p className="font-cursive text-3xl text-brand-white">Melba</p>
      </div>
      <div className="mt-4 text-right">
        <p className="text-sm text-brand-silver font-light">Melba Credits</p>
        <p className="text-2xl font-bold tracking-tighter">{user.credits.toLocaleString()}</p>
      </div>
      <div className="mt-3 text-left flex items-center gap-2">
        <Icon className={cn("w-6 h-6", className)} />
        <div>
          <p className="text-sm text-brand-silver font-light">Tier</p>
          <p className={cn("text-xl font-semibold", className)}>{user.tier}</p>
        </div>
      </div>
    </div>
  );
};

export default MembershipCard;