import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Star, Award, User as UserIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { to: '/', icon: Home, label: 'Home' },
  { to: '/tiers', icon: Star, label: 'Tiers' },
  { to: '/rewards', icon: Award, label: 'Rewards' },
  { to: '/profile', icon: UserIcon, label: 'Profile' },
];

const BottomNav = () => {
  const baseClasses = "flex flex-col items-center justify-center w-full h-full text-brand-silver transition-colors duration-300";
  const activeClasses = "text-brand-white";

  return (
    <nav className="sticky bottom-0 left-0 right-0 h-20 bg-brand-charcoal shadow-neumorphic-out">
      <div className="flex justify-around h-full">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => cn(baseClasses, isActive && activeClasses)}
            end={item.to === '/'}
          >
            <item.icon className="w-6 h-6 mb-1" />
            <span className="text-xs font-light">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;