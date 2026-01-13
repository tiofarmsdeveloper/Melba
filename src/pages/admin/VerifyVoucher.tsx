import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScanLine, CheckCircle2, XCircle, Search } from 'lucide-react';
import { showSuccess, showError } from '@/utils/toast';
import { cn } from '@/lib/utils';

const VerifyVoucher = () => {
  const { users, useVoucher } = useAuth();
  const [code, setCode] = useState('');
  const [result, setResult] = useState<{ status: 'success' | 'error' | null, message: string }>({ status: null, message: '' });

  const handleVerify = () => {
    if (!code) return;

    // Find the user who has this voucher
    let foundVoucher = null;
    let foundUser = null;

    for (const u of users) {
      const v = u.vouchers?.find(v => v.code.toLowerCase() === code.toLowerCase());
      if (v) {
        foundVoucher = v;
        foundUser = u;
        break;
      }
    }

    if (!foundVoucher) {
      setResult({ status: 'error', message: 'Voucher code not found in system.' });
      showError('Invalid code');
      return;
    }

    if (foundVoucher.used) {
      setResult({ status: 'error', message: `This voucher was already used on ${foundVoucher.expiry}.` });
      showError('Already used');
      return;
    }

    // Success - mark as used
    useVoucher(foundVoucher.id);
    setResult({ 
      status: 'success', 
      message: `Verified: ${foundVoucher.title} for member ${foundUser?.name}.` 
    });
    showSuccess('Voucher verified!');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-lg mx-auto">
      <div className="text-center">
        <div className="w-16 h-16 bg-brand-charcoal rounded-2xl shadow-neumorphic-out mx-auto mb-4 flex items-center justify-center">
          <ScanLine className="w-8 h-8 text-brand-silver" />
        </div>
        <h1 className="text-xl font-semibold">Verify Redemption</h1>
        <p className="text-xs text-brand-silver font-light mt-1">Enter the member's unique voucher code to process.</p>
      </div>

      <div className="bg-brand-charcoal p-6 rounded-3xl shadow-neumorphic-out space-y-6">
        <div className="relative">
          <Input 
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="e.g. MB-A1B2C3D4"
            className="bg-brand-charcoal text-brand-white border-none rounded-xl h-14 shadow-neumorphic-in px-6 text-lg font-bold tracking-widest placeholder:font-normal placeholder:tracking-normal"
          />
        </div>
        
        <Button 
          onClick={handleVerify}
          className="w-full bg-brand-silver text-brand-charcoal font-bold py-7 rounded-2xl shadow-md hover:brightness-95 active:scale-[0.98] transition-all text-base"
        >
          Verify Voucher
        </Button>
      </div>

      {result.status && (
        <div className={cn(
          "p-6 rounded-3xl shadow-neumorphic-in animate-in slide-in-from-top-4 duration-300 flex items-start gap-4",
          result.status === 'success' ? "border border-green-500/20" : "border border-red-500/20"
        )}>
          {result.status === 'success' ? (
            <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0 mt-0.5" />
          ) : (
            <XCircle className="w-6 h-6 text-red-500 shrink-0 mt-0.5" />
          )}
          <div>
            <p className={cn(
              "text-sm font-semibold",
              result.status === 'success' ? "text-green-500" : "text-red-500"
            )}>
              {result.status === 'success' ? 'Redemption Valid' : 'Invalid Redemption'}
            </p>
            <p className="text-xs text-brand-silver mt-1 leading-relaxed">{result.message}</p>
          </div>
        </div>
      )}

      <div className="pt-8 text-center">
        <p className="text-[10px] text-brand-silver/20 uppercase tracking-[0.3em]">Staff Verification Terminal</p>
      </div>
    </div>
  );
};

export default VerifyVoucher;