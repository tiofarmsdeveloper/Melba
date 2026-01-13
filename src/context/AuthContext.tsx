import React, { createContext, useState, useContext, ReactNode } from 'react';
import { users as initialUsers, User, Voucher } from '@/data/mockData';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  user: User | null;
  users: User[];
  login: (username: string, password: string) => boolean;
  logout: () => void;
  addCredits: (amount: number) => void;
  adminAddCredits: (userId: number, amount: number, reason: string) => void;
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
      const { password: _, ...userToStore } = foundUser;
      setUser(userToStore as User);
      if (foundUser.role === 'admin') {
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
      const newTransaction = {
        id: Math.random(),
        description: amount > 0 ? 'Credits Added' : 'Credits Removed',
        date: new Date().toISOString().split('T')[0],
        amount: amount
      };

      const updatedUser = { 
        ...user, 
        credits: user.credits + amount,
        transactions: [newTransaction, ...(user.transactions || [])]
      };
      
      setUser(updatedUser);
      setUsers(prevUsers => prevUsers.map(u => u.id === user.id ? updatedUser : u));
    }
  };

  const adminAddCredits = (userId: number, amount: number, reason: string) => {
    setUsers(prevUsers => prevUsers.map(u => {
      if (u.id === userId) {
        const newTransaction = {
          id: Math.random(),
          description: reason,
          date: new Date().toISOString().split('T')[0],
          amount: amount
        };
        const updated = {
          ...u,
          credits: u.credits + amount,
          transactions: [newTransaction, ...(u.transactions || [])]
        };
        // If the current logged in user is the one being updated, update the session user too
        if (user?.id === userId) {
          setUser(updated);
        }
        return updated;
      }
      return u;
    }));
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
    <AuthContext.Provider value={{ user, users, login, logout, addCredits, adminAddCredits, redeemReward, updateUsername, useVoucher }}>
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