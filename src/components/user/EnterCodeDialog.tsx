import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/context/AuthContext';
import { promoCodes } from '@/data/mockData';
import { showSuccess, showError } from '@/utils/toast';

interface EnterCodeDialogProps {
  children: React.ReactNode;
}

const EnterCodeDialog: React.FC<EnterCodeDialogProps> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [code, setCode] = useState('');
  const { addCredits } = useAuth();

  const handleRedeem = () => {
    const promo = promoCodes.find(p => p.code.toLowerCase() === code.toLowerCase());
    if (promo && !promo.used) {
      addCredits(promo.credits);
      promo.used = true; // In a real app, this state would be in a DB
      showSuccess(`Successfully added ${promo.credits} credits!`);
      setOpen(false);
      setCode('');
    } else if (promo && promo.used) {
      showError('This code has already been used.');
    } else {
      showError('Invalid code. Please try again.');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="bg-brand-charcoal border-brand-silver/20 text-brand-white">
        <DialogHeader>
          <DialogTitle>Enter Code</DialogTitle>
          <DialogDescription>
            Enter a code you received to add points to your account.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <Input
            placeholder="e.g. MELBA100"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="bg-brand-charcoal text-brand-white placeholder-brand-silver border-none rounded-xl shadow-neumorphic-in focus:outline-none focus:ring-2 focus:ring-brand-silver/50"
          />
        </div>
        <DialogFooter>
          <Button onClick={handleRedeem} className="w-full bg-brand-silver text-brand-charcoal font-bold py-3 rounded-xl shadow-md hover:brightness-95 active:brightness-90 transition-all duration-200">
            Redeem Points
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EnterCodeDialog;