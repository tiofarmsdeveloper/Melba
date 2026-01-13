import React from 'react';
import { User, tiers } from '@/data/mockData';
import { TrendingUp } from 'lucide-react';

interface TierProgressProps {
  user: User;
}

const TierProgress: React.FC<TierProgressProps> = ({ user }) => {
  const tierKeys = Object.keys(tiers) as Array<keyof typeof tiers>;
  const currentIndex = tierKeys.indexOf(user.tier);
  const nextTier = tierKeys[currentIndex + 1];
  
  if (!nextTier) return null;

  // Mock calculation: let's say next tier is at 2500 for Privé and 5000 for Black Circle
  const thresholds = { 'Privé': 2500, 'Black Circle': 5000 };
  const target = thresholds[nextTier as keyof typeof thresholds] || 10000;
  const progress = Math.min((user.credits / target) * 100, 100);

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-end px-1">
        <div>
          <p className="text-[10px] text-brand-silver font-light tracking-widest uppercase mb-1">Status Progress</p>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-brand-silver" />
            <span className="text-sm font-medium">To {nextTier}</span>
          </div>
        </div>
        <p className="text-xs text-brand-silver font-light">
          <span className="text-brand-white font-bold">{user.credits.toLocaleString()}</span> / {target.toLocaleString()} pts
        </p>
      </div>
      
      <div className="h-2 w-full bg-brand-charcoal rounded-full shadow-neumorphic-in overflow-hidden p-[2px]">
        <div 
          className="h-full bg-brand-silver rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(192,192,192,0.3)]"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-[10px] text-brand-silver/50 font-light italic">
        Earn {(target - user.credits).toLocaleString()} more credits to unlock {nextTier} benefits.
      </p>
    </div>
  );
};

export default TierProgress;