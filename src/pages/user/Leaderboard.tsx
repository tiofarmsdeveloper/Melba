import React from 'react';
import { users } from '@/data/mockData';
import { Crown, User } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';

const Leaderboard = () => {
  const { user: currentUser } = useAuth();
  
  const sortedUsers = [...users]
    .filter(u => u.role === 'user')
    .sort((a, b) => b.credits - a.credits);

  return (
    <div className="text-brand-white animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="mb-6">
        <h1 className="text-lg font-light">Global Rankings</h1>
        <p className="text-xs text-brand-silver font-light mt-1">See how you stack up against the elite.</p>
      </div>

      <div className="space-y-4">
        {sortedUsers.map((user, index) => {
          const isMe = user.id === currentUser?.id;
          const rank = index + 1;
          
          return (
            <div 
              key={user.id} 
              className={cn(
                "flex items-center p-4 rounded-2xl transition-all duration-300",
                isMe ? "bg-brand-charcoal shadow-neumorphic-out ring-1 ring-brand-silver/10 scale-[1.02]" : "bg-brand-charcoal shadow-neumorphic-out opacity-90"
              )}
            >
              {/* Rank / Icon */}
              <div className="w-10 flex flex-col items-center justify-center mr-4">
                {rank === 1 ? (
                  <Crown className="w-6 h-6 text-yellow-500 drop-shadow-[0_0_8px_rgba(234,179,8,0.4)]" />
                ) : (
                  <span className={cn("text-lg font-bold", rank <= 3 ? "text-brand-white" : "text-brand-silver/50")}>
                    {rank}
                  </span>
                )}
              </div>

              {/* Avatar Container */}
              <div className="relative mr-4">
                <div className="w-12 h-12 rounded-full bg-brand-charcoal shadow-neumorphic-in flex items-center justify-center overflow-hidden border border-brand-white/5">
                  {user.avatar ? (
                    <img 
                      src={user.avatar} 
                      alt={user.leaderboardUsername} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Fallback if image fails to load
                        (e.target as HTMLImageElement).style.display = 'none';
                        (e.target as HTMLImageElement).parentElement?.classList.add('p-2');
                      }}
                    />
                  ) : (
                    <User className="w-6 h-6 text-brand-silver/50" />
                  )}
                </div>
                {isMe && (
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-brand-charcoal" />
                )}
              </div>

              {/* User Info */}
              <div className="flex-grow">
                <p className={cn("text-sm font-semibold", isMe ? "text-brand-white" : "text-brand-silver")}>
                  {user.leaderboardUsername}
                </p>
                <p className="text-[10px] text-brand-silver/50 uppercase tracking-widest">{user.tier}</p>
              </div>

              {/* Credits */}
              <div className="text-right">
                <p className="text-sm font-bold text-brand-white">{user.credits.toLocaleString()}</p>
                <p className="text-[10px] text-brand-silver/50 uppercase tracking-tighter">pts</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Leaderboard;