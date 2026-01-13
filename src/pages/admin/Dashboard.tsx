import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { 
  Users, 
  Coins, 
  TrendingUp, 
  Search, 
  Plus, 
  Minus,
  ExternalLink,
  MoreVertical
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
    showSuccess(`Successfully updated credits for member.`);
    setSelectedUserId(null);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-brand-charcoal p-6 rounded-2xl shadow-neumorphic-out border border-brand-white/5">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 bg-brand-charcoal rounded-xl shadow-neumorphic-in flex items-center justify-center">
              <Users className="w-6 h-6 text-brand-silver" />
            </div>
            <span className="text-xs font-bold text-green-400 bg-green-400/10 px-2 py-1 rounded">+12%</span>
          </div>
          <p className="text-xs text-brand-silver uppercase tracking-widest font-light">Total Members</p>
          <p className="text-3xl font-bold mt-1">{totalUsers}</p>
        </div>

        <div className="bg-brand-charcoal p-6 rounded-2xl shadow-neumorphic-out border border-brand-white/5">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 bg-brand-charcoal rounded-xl shadow-neumorphic-in flex items-center justify-center">
              <Coins className="w-6 h-6 text-brand-silver" />
            </div>
          </div>
          <p className="text-xs text-brand-silver uppercase tracking-widest font-light">Circulating Credits</p>
          <p className="text-3xl font-bold mt-1">{totalCredits.toLocaleString()}</p>
        </div>

        <div className="bg-brand-charcoal p-6 rounded-2xl shadow-neumorphic-out border border-brand-white/5">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 bg-brand-charcoal rounded-xl shadow-neumorphic-in flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-brand-silver" />
            </div>
          </div>
          <p className="text-xs text-brand-silver uppercase tracking-widest font-light">Daily Redemptions</p>
          <p className="text-3xl font-bold mt-1">24</p>
        </div>
      </div>

      {/* Member Management */}
      <div className="bg-brand-charcoal rounded-2xl shadow-neumorphic-out border border-brand-white/5 overflow-hidden">
        <div className="p-6 border-b border-brand-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-medium">Member Directory</h3>
            <p className="text-xs text-brand-silver font-light">Search and manage member accounts and balances.</p>
          </div>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-silver" />
            <Input 
              placeholder="Search by name or ID..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-brand-charcoal border-none shadow-neumorphic-in focus:ring-1 focus:ring-brand-silver/20 h-10 rounded-xl"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-[10px] text-brand-silver uppercase tracking-[0.2em] border-b border-brand-white/5">
                <th className="px-6 py-4 font-semibold">Member</th>
                <th className="px-6 py-4 font-semibold">Identifier</th>
                <th className="px-6 py-4 font-semibold">Tier</th>
                <th className="px-6 py-4 font-semibold text-right">Balance</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-white/5">
              {filteredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-brand-white/[0.02] transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-brand-charcoal shadow-neumorphic-in flex items-center justify-center border border-brand-white/5 overflow-hidden">
                        <img src={u.avatar} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{u.name}</p>
                        <p className="text-[10px] text-brand-silver font-light">@{u.username}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <code className="text-[10px] bg-brand-charcoal px-2 py-1 rounded shadow-neumorphic-in text-brand-silver">
                      {u.identifier}
                    </code>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] px-2 py-1 rounded-full border ${
                      u.tier === 'Black Circle' ? 'border-brand-white text-brand-white' : 
                      u.tier === 'Privé' ? 'border-brand-silver text-brand-silver' : 'border-brand-silver/30 text-brand-silver/50'
                    }`}>
                      {u.tier}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-sm font-bold">{u.credits.toLocaleString()} pts</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="h-8 w-8 p-0 rounded-lg hover:bg-brand-white/5"
                        onClick={() => setSelectedUserId(u.id)}
                      >
                        <Plus className="w-4 h-4 text-green-400" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="h-8 w-8 p-0 rounded-lg hover:bg-brand-white/5"
                      >
                        <ExternalLink className="w-4 h-4 text-brand-silver" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Update Credits Dialog */}
      <Dialog open={selectedUserId !== null} onOpenChange={(open) => !open && setSelectedUserId(null)}>
        <DialogContent className="bg-brand-charcoal border-brand-white/10 text-brand-white rounded-3xl">
          <DialogHeader>
            <DialogTitle>Adjust Member Credits</DialogTitle>
            <DialogDescription className="text-brand-silver">
              Manually add or remove credits from this member's account.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-brand-silver">Amount</label>
              <Input 
                type="number" 
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="bg-brand-charcoal border-none shadow-neumorphic-in text-brand-white"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-brand-silver">Reason / Description</label>
              <Input 
                placeholder="e.g. Counter Purchase Reward" 
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="bg-brand-charcoal border-none shadow-neumorphic-in text-brand-white"
              />
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button 
              variant="outline" 
              className="border-none shadow-neumorphic-out hover:shadow-neumorphic-in bg-transparent"
              onClick={() => setSelectedUserId(null)}
            >
              Cancel
            </Button>
            <Button 
              className="bg-brand-silver text-brand-charcoal font-bold shadow-md hover:brightness-95"
              onClick={() => selectedUserId && handleUpdateCredits(selectedUserId, parseInt(amount))}
            >
              Apply Credits
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;