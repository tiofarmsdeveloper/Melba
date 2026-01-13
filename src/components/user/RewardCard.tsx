import React from 'react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';
import { showSuccess } from '@/utils/toast';

interface Reward {
  id: number;
  title: string;
  description: string;
  image: string;
}

interface RewardCardProps {
  reward: Reward;
}

const RewardCard: React.FC<RewardCardProps> = ({ reward }) => {
  const handleRedeem = () => {
    showSuccess(`"${reward.title}" reward redeemed!`);
    // In a real app, you'd handle the logic for redemption here.
  };

  return (
    <div className="bg-brand-charcoal rounded-lg shadow-neumorphic-out overflow-hidden">
      <AspectRatio ratio={16 / 9}>
        <img src={reward.image} alt={reward.title} className="object-cover w-full h-full" />
      </AspectRatio>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-brand-white">{reward.title}</h3>
        <p className="text-sm text-brand-silver mt-1 mb-4">{reward.description}</p>
        <Button 
          onClick={handleRedeem}
          className="w-full bg-brand-silver text-brand-charcoal font-bold py-2 rounded-lg shadow-md hover:brightness-95 active:brightness-90 transition-all duration-200"
        >
          Redeem
        </Button>
      </div>
    </div>
  );
};

export default RewardCard;