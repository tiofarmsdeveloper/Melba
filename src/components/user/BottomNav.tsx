import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Star, Award, UserPlus, Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { to: '/', icon: Home, label: 'Home' },
  { to: '/tiers', icon: Star, label: 'Tiers' },
  { to: '/rewards', icon: Award, label: 'Rewards' },
  { to: '/leaderboard', icon: Trophy, label: 'Ranks' },
  { to: '/refer', icon: UserPlus, label: 'Refer' },
];

const BottomNav = () => {
  const baseClasses = "flex flex-col items-center justify-center w-full h-full text-brand-silver transition-all duration-300";
  const activeClasses = "text-brand-white scale-110";

  return (
    <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-md h-16 bg-brand-charcoal/80 backdrop-blur-sm rounded-full shadow-neumorphic-out z-50">
      <div className="flex justify-around h-full px-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => cn(baseClasses, isActive && activeClasses)}
            end={item.to === '/'}
          >
            <item.icon className="w-5 h-5 mb-1" />
            <span className="text-[10px] font-light">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;