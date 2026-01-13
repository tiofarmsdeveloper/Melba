import React from 'react';
import { tiers } from '@/data/mockData';
import { Trophy, Diamond, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const tierInfo = {
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

const Tiers = () => {
  return (
    <div className="text-brand-white">
      <h1 className="text-3xl font-semibold mb-6">Membership Tiers</h1>
      <div className="space-y-4">
        {Object.values(tiers).map((tier) => {
          const { icon: Icon, className, cardBorder } = tierInfo[tier.name as keyof typeof tierInfo];
          return (
            <div key={tier.name} className={cn("p-4 bg-brand-charcoal rounded-lg shadow-neumorphic-out border", cardBorder)}>
              <div className="flex items-center mb-3">
                <Icon className={cn("w-7 h-7 mr-3", className)} />
                <h2 className={cn("text-2xl font-bold", className)}>{tier.name}</h2>
              </div>
              <ul className="space-y-2">
                {tier.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="w-4 h-4 mr-2 mt-1 text-green-400 flex-shrink-0" />
                    <span className="text-brand-silver text-sm">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Tiers;