import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Ticket, Clock, CheckCircle2, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Wallet = () => {
  const { user, useVoucher } = useAuth();
  const activeVouchers = user?.vouchers.filter(v => !v.used) || [];
  const usedVouchers = user?.vouchers.filter(v => v.used) || [];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center">
        <h1 className="text-2xl font-semibold mb-2">Member Wallet</h1>
        <p className="text-sm text-brand-silver font-light">
          Manage your active rewards and digital passes.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-xs font-bold text-brand-silver uppercase tracking-widest mb-4 px-1">Active Vouchers ({activeVouchers.length})</h3>
          {activeVouchers.length > 0 ? (
            <div className="space-y-4">
              {activeVouchers.map((voucher) => (
                <div 
                  key={voucher.id} 
                  className="bg-brand-charcoal p-5 rounded-2xl shadow-neumorphic-out border-l-4 border-brand-silver relative overflow-hidden group"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-10 h-10 bg-brand-charcoal rounded-xl shadow-neumorphic-in flex items-center justify-center">
                      <Ticket className="w-5 h-5 text-brand-silver" />
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-brand-silver uppercase tracking-tighter">Valid until</p>
                      <p className="text-xs font-medium">{voucher.expiry}</p>
                    </div>
                  </div>
                  
                  <h4 className="text-lg font-medium mb-1">{voucher.title}</h4>
                  <p className="text-[10px] text-brand-silver font-light tracking-widest mb-6">CODE: {voucher.code}</p>
                  
                  <Button 
                    onClick={() => useVoucher(voucher.id)}
                    className="w-full bg-brand-charcoal text-brand-white border border-brand-white/5 shadow-neumorphic-out hover:shadow-neumorphic-in py-5 rounded-xl transition-all"
                  >
                    Redeem at Counter
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-brand-charcoal py-10 rounded-2xl shadow-neumorphic-in text-center px-6">
              <Ticket className="w-10 h-10 text-brand-silver/20 mx-auto mb-3" />
              <p className="text-sm text-brand-silver font-light">No active vouchers. Redeem points for rewards to see them here.</p>
            </div>
          )}
        </div>

        {usedVouchers.length > 0 && (
          <div>
            <h3 className="text-xs font-bold text-brand-silver uppercase tracking-widest mb-4 px-1">Past Rewards</h3>
            <div className="space-y-3 opacity-50 grayscale">
              {usedVouchers.slice(0, 3).map((voucher) => (
                <div key={voucher.id} className="flex items-center p-4 bg-brand-charcoal rounded-xl shadow-neumorphic-in border border-brand-white/5">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center mr-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  </div>
                  <div className="flex-grow">
                    <p className="text-sm font-medium">{voucher.title}</p>
                    <p className="text-[10px] text-brand-silver font-light">Redeemed recently</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wallet;