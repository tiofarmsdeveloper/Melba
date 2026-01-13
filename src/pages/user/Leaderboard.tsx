import React from 'react';
import { users } from '@/data/mockData';
import { Crown } from 'lucide-react';

const Leaderboard = () => {
  const sortedUsers = [...users]
    .filter(u => u.role === 'user')
    .sort((a, b) => b.credits - a.credits);

  return (
    <div className="text-brand-white">
      <h1 className="text-2xl font-semibold mb-6">Leaderboard</h1>
      <div className="space-y-3">
        {sortedUsers.map((user, index) => (
          <div key={user.id} className="flex items-center p-3 bg-brand-charcoal rounded-lg shadow-neumorphic-out">
            <div className="w-10 text-center font-bold text-lg mr-3">
              {index === 0 ? <Crown className="w-6 h-6 text-yellow-400 mx-auto" /> : index + 1}
            </div>
            <img src={user.avatar} alt={user.leaderboardUsername} className="w-12 h-12 rounded-full mr-4" />
            <div className="flex-grow">
              <p className="font-medium text-sm text-brand-white">{user.leaderboardUsername}</p>
              <p className="text-xs text-brand-silver">{user.credits.toLocaleString()} Credits</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;