import React from 'react';
import { tiers } from '@/data/mockData';
import { useAuth } from '@/context/AuthContext';
import { Check, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';

const Tiers = () => {
  const { user } = useAuth();
  const tierKeys = Object.keys(tiers) as Array<keyof typeof tiers>;
  
  // Simple logic to determine order. In a real app, this might be based on points thresholds.
  const currentTierIndex = tierKeys.indexOf(user?.tier || 'Member');

  return (
    <div className="text-brand-white pb-20">
      <div className="mb-8">
        <h1 className="text-lg font-light">Membership Tiers</h1>
        <p className="text-xs text-brand-silver font-light mt-1">
          Unlock exclusive benefits as you ascend.
        </p>
      </div>

      <div className="space-y-8 relative before:absolute before:left-[19px] before:top-4 before:bottom-4 before:w-[2px] before:bg-brand-charcoal before:shadow-neumorphic-in">
        {tierKeys.map((tierKey, index) => {
          const isCurrent = user?.tier === tierKey;
          const isUnlocked = index <= currentTierIndex;
          const isNext = index === currentTierIndex + 1;

          return (
            <div key={tierKey} className="relative pl-12">
              {/* Timeline Node */}
              <div className={cn(
                "absolute left-0 top-0 w-10 h-10 rounded-full flex items-center justify-center border-4 border-brand-charcoal transition-all duration-500 z-10",
                isCurrent ? "bg-brand-silver shadow-neumorphic-out scale-110" : 
                isUnlocked ? "bg-brand-charcoal shadow-neumorphic-out" : "bg-brand-charcoal shadow-neumorphic-in opacity-50"
              )}>
                {isUnlocked ? (
                  <Check className={cn("w-4 h-4", isCurrent ? "text-brand-charcoal" : "text-brand-silver")} />
                ) : (
                  <Circle className="w-4 h-4 text-brand-silver/30" />
                )}
              </div>

              {/* Card Content */}
              <div className={cn(
                "p-5 rounded-2xl bg-brand-charcoal transition-all duration-300",
                isCurrent ? "shadow-neumorphic-out ring-1 ring-brand-silver/10" : 
                isUnlocked ? "shadow-neumorphic-out opacity-80" : "shadow-neumorphic-in opacity-50 grayscale"
              )}>
                <div className="flex justify-between items-center mb-3">
                  <h3 className={cn("font-cursive text-xl", isCurrent ? "text-brand-white" : "text-brand-silver")}>
                    {tierKey}
                  </h3>
                  {isCurrent && (
                    <span className="text-[10px] uppercase tracking-widest bg-brand-silver text-brand-charcoal px-2 py-1 rounded-full font-bold">
                      Current
                    </span>
                  )}
                  {isNext && (
                    <span className="text-[10px] uppercase tracking-widest text-brand-silver/50">
                      Next Goal
                    </span>
                  )}
                </div>

                <ul className="space-y-2">
                  {tiers[tierKey].benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start text-xs text-brand-silver font-light">
                      <span className="mr-2 mt-1 w-1 h-1 bg-brand-silver rounded-full shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Tiers;