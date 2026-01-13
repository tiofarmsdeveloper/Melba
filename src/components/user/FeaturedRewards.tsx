import React from 'react';
import { Link } from 'react-router-dom';
import { rewards } from '@/data/mockData';
import { ChevronRight, Zap } from 'lucide-react';

const FeaturedRewards = () => {
  const featured = rewards.slice(0, 3);

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center px-1">
        <h3 className="text-base font-semibold text-brand-white">Curated for You</h3>
        <Link to="/rewards" className="text-[10px] text-brand-silver uppercase tracking-widest flex items-center gap-1 hover:text-brand-white transition-colors">
          View All <ChevronRight className="w-3 h-3" />
        </Link>
      </div>
      
      <div className="flex gap-4 overflow-x-auto pb-4 -mx-1 px-1 no-scrollbar">
        {featured.map((reward) => (
          <Link 
            key={reward.id} 
            to="/rewards"
            className="flex-shrink-0 w-48 bg-brand-charcoal p-4 rounded-2xl shadow-neumorphic-out active:scale-[0.98] transition-transform"
          >
            <div className="w-10 h-10 bg-brand-charcoal rounded-lg flex items-center justify-center shadow-neumorphic-in mb-3">
              <Zap className="w-5 h-5 text-brand-silver" />
            </div>
            <h4 className="text-sm font-medium text-brand-white truncate">{reward.title}</h4>
            <p className="text-xs text-brand-silver font-bold mt-1">{reward.cost} pts</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FeaturedRewards;