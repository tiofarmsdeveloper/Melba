import React from 'react';
import { rewards } from '@/data/mockData';
import RewardCard from '@/components/user/RewardCard';

const Rewards = () => {
  return (
    <div className="text-brand-white">
      <h1 className="text-3xl font-semibold mb-6">Rewards</h1>
      <div className="space-y-4">
        {rewards.map((reward) => (
          <RewardCard key={reward.id} reward={reward} />
        ))}
      </div>
    </div>
  );
};

export default Rewards;