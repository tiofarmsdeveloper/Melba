import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { showError } from '@/utils/toast';
import WhyLoyaltyDialog from '@/components/user/WhyLoyaltyDialog';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!login(username, password)) {
      showError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-brand-charcoal p-4 relative">
      {/* Information Trigger (Top Right) */}
      <div className="absolute top-6 right-6 z-50">
        <WhyLoyaltyDialog>
          <button className="w-10 h-10 bg-brand-charcoal rounded-full flex items-center justify-center shadow-neumorphic-out active:shadow-neumorphic-in transition-all duration-200 group">
            <span className="text-brand-silver font-serif font-bold text-xl select-none group-hover:text-brand-white transition-colors">I</span>
          </button>
        </WhyLoyaltyDialog>
      </div>

      <div className="w-full max-w-sm bg-brand-charcoal rounded-2xl p-8 shadow-neumorphic-out">
        <div className="flex justify-center mb-6">
          <div className="w-10 h-10 bg-brand-charcoal rounded-full flex items-center justify-center shadow-neumorphic-out">
            <span className="font-sans text-xl font-bold text-brand-white">M</span>
          </div>
        </div>
        <div className="text-center mb-8">
          <h1 className="text-2xl font-medium text-brand-white">
            Welcome to <span className="font-cursive">Melba</span>
          </h1>
          <p className="text-xs text-brand-silver tracking-widest font-light mt-1">INVITE-ONLY MEMBERSHIP PROGRAMME</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="username" className="text-xs text-brand-silver font-light tracking-wider">USERNAME</Label>
            <Input
              id="username"
              type="text"
              placeholder="Enter your access ID"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-brand-charcoal text-brand-white placeholder-brand-silver border-none rounded-xl h-12 shadow-neumorphic-in focus:outline-none focus:ring-2 focus:ring-brand-silver/50 transition-all duration-300"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password"  className="text-xs text-brand-silver font-light tracking-wider">PASSWORD</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your secure key"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-brand-charcoal text-brand-white placeholder-brand-silver border-none rounded-xl h-12 shadow-neumorphic-in focus:outline-none focus:ring-2 focus:ring-brand-silver/50 transition-all duration-300"
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-brand-silver text-brand-charcoal font-bold py-6 rounded-xl shadow-md hover:brightness-95 active:brightness-90 transition-all duration-200"
          >
            ENTER THE LOUNGE
          </Button>
        </form>
        <p className="text-center text-xs text-brand-silver/50 mt-8 font-light">By entering, you agree to the House Rules.</p>
      </div>
    </div>
  );
};

export default Login;