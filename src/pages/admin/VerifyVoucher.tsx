import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScanLine, CheckCircle2, XCircle } from 'lucide-react';
import { showSuccess, showError } from '@/utils/toast';
import { cn } from '@/lib/utils';

const VerifyVoucher = () => {
  const { adminUseVoucher } = useAuth();
  const [code, setCode] = useState('');
  const [result, setResult] = useState<{ status: 'success' | 'error' | null, message: string }>({ status: null, message: '' });

  const handleVerify = () => {
    if (!code) return;

    const response = adminUseVoucher(code);
    
    if (response.success) {
      setResult({ status: 'success', message: response.message });
      showSuccess('Voucher verified!');
      setCode('');
    } else {
      setResult({ status: 'error', message: response.message });
      showError('Invalid or used code');
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-lg mx-auto">
      <div className="text-center">
        <div className="w-16 h-16 bg-brand-charcoal rounded-2xl shadow-neumorphic-out mx-auto mb-4 flex items-center justify-center">
          <ScanLine className="w-8 h-8 text-brand-silver" />
        </div>
        <h1 className="text-xl font-semibold">Redemption Terminal</h1>
        <p className="text-xs text-brand-silver font-light mt-1">Enter the unique voucher code presented by the member.</p>
      </div>

      <div className="bg-brand-charcoal p-6 rounded-3xl shadow-neumorphic-out space-y-6">
        <div className="space-y-2">
          <label className="text-[10px] text-brand-silver uppercase tracking-widest px-1">Voucher Code</label>
          <Input 
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="MB-A1B2C3D4"
            className="bg-brand-charcoal text-brand-white border-none rounded-xl h-14 shadow-neumorphic-in px-6 text-lg font-bold tracking-widest placeholder:font-normal placeholder:tracking-normal"
          />
        </div>
        
        <Button 
          onClick={handleVerify}
          className="w-full bg-brand-silver text-brand-charcoal font-bold py-7 rounded-2xl shadow-md hover:brightness-95 active:scale-[0.98] transition-all text-base"
        >
          Redeem Perk
        </Button>
      </div>

      {result.status && (
        <div className={cn(
          "p-6 rounded-3xl shadow-neumorphic-in animate-in slide-in-from-top-4 duration-300 flex items-start gap-4",
          result.status === 'success' ? "border border-green-500/20" : "border border-red-500/20"
        )}>
          {result.status === 'success' ? (
            <CheckCircle2 className="w-6 h-6 text-green-400 shrink-0 mt-0.5" />
          ) : (
            <XCircle className="w-6 h-6 text-red-500 shrink-0 mt-0.5" />
          )}
          <div>
            <p className={cn(
              "text-sm font-semibold",
              result.status === 'success' ? "text-green-400" : "text-red-500"
            )}>
              {result.status === 'success' ? 'Redemption Confirmed' : 'Verification Failed'}
            </p>
            <p className="text-xs text-brand-silver mt-1 leading-relaxed">{result.message}</p>
          </div>
        </div>
      )}

      <div className="pt-8 text-center">
        <p className="text-[10px] text-brand-silver/20 uppercase tracking-[0.3em]">Staff Only • Secure Redemption</p>
      </div>
    </div>
  );
};

export default VerifyVoucher;