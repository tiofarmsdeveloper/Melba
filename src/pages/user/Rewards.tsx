import React from 'react';
import { rewards } from '@/data/mockData';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { showSuccess, showError } from '@/utils/toast';
import { Gift, Lock } from 'lucide-react';

const Rewards = () => {
  const { user, redeemReward } = useAuth();

  const handleRedeem = (reward: typeof rewards[0]) => {
    if (!user) return;

    if (user.credits < reward.cost) {
      showError(`You need ${reward.cost - user.credits} more credits to unlock this.`);
      return;
    }

    // In a real app, you might want a confirmation dialog here
    const success = redeemReward(reward.cost, reward.title);
    if (success) {
      showSuccess(`Redeemed: ${reward.title}`);
    } else {
      showError("Transaction failed. Please try again.");
    }
  };

  return (
    <div className="text-brand-white pb-20">
      <div className="mb-6">
        <h1 className="text-lg font-light">Rewards</h1>
        <p className="text-xs text-brand-silver font-light mt-1">
          Redeem your hard-earned credits for exclusive perks.
        </p>
        <div className="mt-4 inline-block px-4 py-2 bg-brand-charcoal rounded-full shadow-neumorphic-in">
          <span className="text-xs text-brand-silver mr-2">Your Balance:</span>
          <span className="font-bold text-brand-white">{user?.credits.toLocaleString()}</span>
        </div>
      </div>

      <div className="grid gap-4">
        {rewards.map((reward) => {
          const canAfford = (user?.credits || 0) >= reward.cost;
          
          return (
            <div 
              key={reward.id} 
              className={`relative bg-brand-charcoal rounded-2xl p-4 shadow-neumorphic-out transition-all duration-300 ${!canAfford ? 'opacity-75' : ''}`}
            >
              <div className="flex justify-between items-start mb-3">
                <div className="bg-brand-charcoal w-10 h-10 rounded-full flex items-center justify-center shadow-neumorphic-in">
                  <Gift className={`w-5 h-5 ${canAfford ? 'text-brand-white' : 'text-brand-silver/50'}`} />
                </div>
                <span className={`text-sm font-bold px-3 py-1 rounded-full shadow-neumorphic-in ${canAfford ? 'text-green-400' : 'text-brand-silver'}`}>
                  {reward.cost} pts
                </span>
              </div>
              
              <h3 className="text-base font-medium mb-1">{reward.title}</h3>
              <p className="text-xs text-brand-silver font-light mb-4 min-h-[2.5em]">
                {reward.description}
              </p>

              <Button 
                onClick={() => handleRedeem(reward)}
                disabled={!canAfford}
                className={`w-full text-xs font-semibold py-2 h-auto rounded-xl transition-all duration-200 
                  ${canAfford 
                    ? 'bg-brand-silver text-brand-charcoal shadow-md hover:brightness-95 active:scale-[0.98]' 
                    : 'bg-transparent border border-brand-charcoal shadow-neumorphic-out text-brand-silver/50 cursor-not-allowed'
                  }`}
              >
                {canAfford ? 'Redeem Reward' : (
                  <span className="flex items-center justify-center gap-2">
                    <Lock className="w-3 h-3" /> Locked
                  </span>
                )}
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Rewards;