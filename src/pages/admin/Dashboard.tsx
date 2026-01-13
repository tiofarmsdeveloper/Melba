import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { 
  Users, 
  Coins, 
  TrendingUp, 
  Search, 
  Plus, 
  ExternalLink
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { showSuccess } from '@/utils/toast';
import { cn } from '@/lib/utils';

const AdminDashboard = () => {
  const { users, adminAddCredits } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [amount, setAmount] = useState('100');
  const [reason, setReason] = useState('Visit Reward');

  const filteredUsers = users.filter(u => 
    u.role === 'user' && 
    (u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
     u.identifier.includes(searchTerm))
  );

  const totalCredits = users.reduce((acc, curr) => acc + curr.credits, 0);
  const totalUsers = users.filter(u => u.role === 'user').length;

  const handleUpdateCredits = (userId: number, amt: number) => {
    adminAddCredits(userId, amt, reason);
    showSuccess(`Points awarded to member.`);
    setSelectedUserId(null);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-10">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Members', val: totalUsers, icon: Users, color: 'text-brand-silver' },
          { label: 'Circulation', val: totalCredits.toLocaleString(), icon: Coins, color: 'text-brand-silver' },
          { label: 'Daily Activity', val: 24, icon: TrendingUp, color: 'text-green-400' }
        ].map((stat, i) => (
          <div key={i} className="bg-brand-charcoal p-5 rounded-3xl shadow-neumorphic-out border border-brand-white/5">
            <div className="flex justify-between items-start mb-3">
              <div className="w-10 h-10 bg-brand-charcoal rounded-xl shadow-neumorphic-in flex items-center justify-center">
                <stat.icon className={cn("w-5 h-5", stat.color)} />
              </div>
            </div>
            <p className="text-[10px] text-brand-silver uppercase tracking-[0.2em] font-light">{stat.label}</p>
            <p className="text-2xl font-bold mt-0.5">{stat.val}</p>
          </div>
        ))}
      </div>

      {/* Directory Search */}
      <div className="bg-brand-charcoal p-1 rounded-3xl shadow-neumorphic-in">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-silver" />
          <Input 
            placeholder="Search member name or ID..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12 bg-transparent border-none h-14 text-sm focus-visible:ring-0 placeholder:text-brand-silver/50"
          />
        </div>
      </div>

      {/* Member List */}
      <div className="space-y-4">
        <h3 className="text-[10px] uppercase tracking-[0.3em] text-brand-silver/50 px-2">Member Directory</h3>
        {filteredUsers.map((u) => (
          <div key={u.id} className="bg-brand-charcoal p-4 rounded-3xl shadow-neumorphic-out border border-brand-white/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-brand-charcoal shadow-neumorphic-in p-1 border border-brand-white/5 overflow-hidden">
                <img src={u.avatar} alt="" className="w-full h-full object-cover rounded-full" />
              </div>
              <div>
                <p className="text-sm font-semibold">{u.name}</p>
                <div className="flex items-center gap-2">
                   <span className="text-[9px] text-brand-silver uppercase tracking-tighter">{u.tier}</span>
                   <span className="w-1 h-1 bg-brand-silver/30 rounded-full" />
                   <span className="text-[9px] font-bold text-brand-white">{u.credits} pts</span>
                </div>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button 
                onClick={() => setSelectedUserId(u.id)}
                className="w-9 h-9 p-0 rounded-xl bg-brand-charcoal shadow-neumorphic-out active:shadow-neumorphic-in text-brand-silver border-none"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={selectedUserId !== null} onOpenChange={(open) => !open && setSelectedUserId(null)}>
        <DialogContent className="bg-brand-charcoal border-brand-white/10 text-brand-white rounded-3xl mx-4 max-w-[calc(100%-2rem)]">
          <DialogHeader>
            <DialogTitle>Adjust Balance</DialogTitle>
            <DialogDescription className="text-brand-silver text-xs">Award or deduct credits manually.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="bg-brand-charcoal shadow-neumorphic-in border-none h-12" />
            <Input placeholder="Reason (e.g. Visit Bonus)" value={reason} onChange={(e) => setReason(e.target.value)} className="bg-brand-charcoal shadow-neumorphic-in border-none h-12" />
          </div>
          <DialogFooter>
            <Button className="w-full bg-brand-silver text-brand-charcoal font-bold py-6 rounded-xl" onClick={() => selectedUserId && handleUpdateCredits(selectedUserId, parseInt(amount))}>
              Update Balance
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;