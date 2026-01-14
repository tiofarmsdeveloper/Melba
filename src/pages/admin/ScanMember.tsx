import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import QRScanner from '@/components/admin/QRScanner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, User, Plus, RefreshCw, X } from 'lucide-react';
import { showSuccess, showError } from '@/utils/toast';
import { cn } from '@/lib/utils';

const ScanMember = () => {
  const { users, adminAddCredits } = useAuth();
  const [foundUser, setFoundUser] = useState<any>(null);
  const [amount, setAmount] = useState('100');
  const [reason, setReason] = useState('Visit Reward');
  const [isLookingUp, setIsLookingUp] = useState(true);

  const handleLookupSuccess = (identifier: string) => {
    const user = users.find(u => u.identifier === identifier);
    if (user) {
      setFoundUser(user);
      setIsLookingUp(false);
      showSuccess(`Found member: ${user.name}`);
    } else {
      showError('No member found with this ID.');
      // Reset after a delay if not found
      setTimeout(() => setIsLookingUp(true), 2000);
    }
  };

  const handleAwardPoints = () => {
    if (!foundUser) return;
    adminAddCredits(foundUser.id, parseInt(amount), reason);
    showSuccess(`${amount} points awarded to ${foundUser.name}`);
    handleReset();
  };

  const handleReset = () => {
    setFoundUser(null);
    setIsLookingUp(true);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-lg mx-auto pb-20">
      <div className="text-center">
        <div className="w-16 h-16 bg-brand-charcoal rounded-2xl shadow-neumorphic-out mx-auto mb-4 flex items-center justify-center">
          <Search className="w-8 h-8 text-brand-silver" />
        </div>
        <h1 className="text-xl font-semibold">Member Lookup</h1>
        <p className="text-xs text-brand-silver font-light mt-1">
          {isLookingUp ? 'Enter the member ID to find their account.' : 'Confirm member details and award points.'}
        </p>
      </div>

      {isLookingUp ? (
        <QRScanner onScanSuccess={handleLookupSuccess} />
      ) : foundUser ? (
        <div className="space-y-6 animate-in slide-in-from-bottom-4">
          {/* Member Card */}
          <div className="bg-brand-charcoal p-6 rounded-3xl shadow-neumorphic-out border border-brand-white/5 relative overflow-hidden">
            <Button 
              onClick={handleReset} 
              variant="ghost" 
              size="icon" 
              className="absolute top-2 right-2 text-brand-silver/50 hover:text-red-400"
            >
              <X className="w-4 h-4" />
            </Button>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-full bg-brand-charcoal shadow-neumorphic-in p-1 border border-brand-white/5 overflow-hidden">
                <img src={foundUser.avatar} alt="" className="w-full h-full object-cover rounded-full" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-brand-white">{foundUser.name}</h3>
                <p className="text-[10px] text-brand-silver uppercase tracking-widest">{foundUser.tier} Member</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="p-3 bg-brand-charcoal rounded-xl shadow-neumorphic-in">
                <p className="text-[9px] text-brand-silver uppercase mb-0.5">Current Balance</p>
                <p className="text-sm font-bold">{foundUser.credits.toLocaleString()} pts</p>
              </div>
              <div className="p-3 bg-brand-charcoal rounded-xl shadow-neumorphic-in">
                <p className="text-[9px] text-brand-silver uppercase mb-0.5">Member Since</p>
                <p className="text-sm font-bold">July 2024</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-brand-silver px-1">Amount to Award</label>
                <Input 
                  type="number" 
                  value={amount} 
                  onChange={(e) => setAmount(e.target.value)} 
                  className="bg-brand-charcoal shadow-neumorphic-in border-none h-12 text-lg font-bold"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-brand-silver px-1">Reason</label>
                <Input 
                  value={reason} 
                  onChange={(e) => setReason(e.target.value)} 
                  className="bg-brand-charcoal shadow-neumorphic-in border-none h-12"
                />
              </div>
              <Button 
                onClick={handleAwardPoints}
                className="w-full bg-brand-silver text-brand-charcoal font-bold py-7 rounded-2xl shadow-md hover:brightness-95 active:scale-[0.98] transition-all"
              >
                <Plus className="w-4 h-4 mr-2" /> Award Points
              </Button>
            </div>
          </div>
          
          <Button 
            onClick={handleReset} 
            variant="ghost" 
            className="w-full text-brand-silver hover:text-brand-white flex items-center gap-2"
          >
            <RefreshCw className="w-3 h-3" /> Lookup Another
          </Button>
        </div>
      ) : null}

      <div className="pt-8 text-center">
        <p className="text-[10px] text-brand-silver/20 uppercase tracking-[0.3em]">Staff Terminal • Member Services</p>
      </div>
    </div>
  );
};

export default ScanMember;