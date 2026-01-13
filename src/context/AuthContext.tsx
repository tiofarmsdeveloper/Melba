import React, { createContext, useState, useContext, ReactNode } from 'react';
import { users as initialUsers, User, Voucher } from '@/data/mockData';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  addCredits: (amount: number) => void;
  redeemReward: (cost: number, description: string) => boolean;
  updateUsername: (newNickname: string) => void;
  useVoucher: (voucherId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(initialUsers);
  const navigate = useNavigate();

  const login = (username: string, password: string): boolean => {
    const foundUser = users.find(
      (u) => u.username === username && u.password === password
    );
    if (foundUser) {
      const { password, ...userToStore } = foundUser;
      setUser(userToStore as User);
      if (userToStore.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    navigate('/login');
  };

  const addCredits = (amount: number) => {
    if (user) {
      const updatedUser = { ...user, credits: user.credits + amount };
      setUser(updatedUser);
      setUsers(prevUsers => prevUsers.map(u => u.id === user.id ? updatedUser : u));
    }
  };

  const redeemReward = (cost: number, description: string): boolean => {
    if (user && user.credits >= cost) {
      const voucherId = Math.random().toString(36).substr(2, 9).toUpperCase();
      const newVoucher: Voucher = {
        id: voucherId,
        title: description,
        code: `MB-${voucherId}`,
        expiry: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        used: false
      };

      const newTransaction = {
        id: Math.random(),
        description: `Redeemed: ${description}`,
        date: new Date().toISOString().split('T')[0],
        amount: -cost
      };

      const updatedUser = { 
        ...user, 
        credits: user.credits - cost,
        transactions: [newTransaction, ...(user.transactions || [])],
        vouchers: [newVoucher, ...(user.vouchers || [])]
      };
      
      setUser(updatedUser);
      setUsers(prevUsers => prevUsers.map(u => u.id === user.id ? updatedUser : u));
      return true;
    }
    return false;
  };

  const updateUsername = (newNickname: string) => {
    if (user) {
      const updatedUser = { ...user, leaderboardUsername: newNickname };
      setUser(updatedUser);
      setUsers(prevUsers => prevUsers.map(u => u.id === user.id ? updatedUser : u));
    }
  };

  const useVoucher = (voucherId: string) => {
    if (user) {
      const updatedUser = {
        ...user,
        vouchers: user.vouchers.map(v => v.id === voucherId ? { ...v, used: true } : v)
      };
      setUser(updatedUser);
      setUsers(prevUsers => prevUsers.map(u => u.id === user.id ? updatedUser : u));
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, addCredits, redeemReward, updateUsername, useVoucher }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};