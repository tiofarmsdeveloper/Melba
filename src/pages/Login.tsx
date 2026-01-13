import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { showError } from '@/utils/toast';

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
    <div className="flex flex-col items-center justify-center min-h-screen bg-brand-charcoal p-4">
      <div className="w-full max-w-xs text-center">
        <h1 className="font-cursive text-7xl text-brand-white mb-8">Melba</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="bg-brand-charcoal text-brand-white placeholder-brand-silver border-none rounded-xl shadow-neumorphic-in focus:outline-none focus:ring-2 focus:ring-brand-silver/50 transition-all duration-300"
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-brand-charcoal text-brand-white placeholder-brand-silver border-none rounded-xl shadow-neumorphic-in focus:outline-none focus:ring-2 focus:ring-brand-silver/50 transition-all duration-300"
          />
          <Button
            type="submit"
            className="w-full bg-brand-charcoal text-brand-white font-semibold py-3 rounded-xl shadow-neumorphic-out active:shadow-neumorphic-out-pressed transition-all duration-200 hover:bg-brand-charcoal"
          >
            Enter the Lounge
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;