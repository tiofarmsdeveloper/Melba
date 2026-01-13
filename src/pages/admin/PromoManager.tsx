import React, { useState } from 'react';
import { promoCodes as initialPromos } from '@/data/mockData';
import { Ticket, Plus, Trash2, Hash, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from '@/components/ui/dialog';
import { showSuccess } from '@/utils/toast';

const PromoManager = () => {
  const [promos, setPromos] = useState(initialPromos);
  const [isAddOpen, setIsAddOpen] = useState(false);

  const handleDelete = (code: string) => {
    setPromos(prev => prev.filter(p => p.code !== code));
    showSuccess('Promo code deactivated');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-700 pb-20">
      <div className="flex justify-between items-center px-1">
        <div>
          <h1 className="text-xl font-semibold">Promo Codes</h1>
          <p className="text-xs text-brand-silver font-light">Create unique codes for members to claim credits.</p>
        </div>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button className="bg-brand-silver text-brand-charcoal font-bold rounded-xl shadow-neumorphic-out hover:brightness-95 h-10 px-4">
              <Plus className="w-4 h-4 mr-2" /> New Code
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-brand-charcoal border-brand-white/10 text-brand-white rounded-3xl mx-4 max-w-[calc(100%-2rem)]">
            <DialogHeader>
              <DialogTitle>Generate Promo Code</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-brand-silver">Unique Code</label>
                <Input placeholder="e.g. SUMMER24" className="bg-brand-charcoal shadow-neumorphic-in border-none h-12 font-bold tracking-widest" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-brand-silver">Credit Value</label>
                <Input type="number" placeholder="e.g. 250" className="bg-brand-charcoal shadow-neumorphic-in border-none h-12" />
              </div>
            </div>
            <DialogFooter>
              <Button 
                onClick={() => { setIsAddOpen(false); showSuccess('Promo code live'); }}
                className="w-full bg-brand-silver text-brand-charcoal font-bold py-6 rounded-xl"
              >
                Activate Code
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {promos.map((promo) => (
          <div key={promo.code} className="bg-brand-charcoal p-4 rounded-2xl shadow-neumorphic-out border border-brand-white/5 flex items-center justify-between group">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-brand-charcoal rounded-xl shadow-neumorphic-in flex items-center justify-center">
                <Hash className="w-5 h-5 text-brand-silver" />
              </div>
              <div>
                <h3 className="font-bold tracking-widest text-brand-white">{promo.code}</h3>
                <p className="text-xs text-brand-silver font-light">Worth <span className="text-brand-white font-bold">{promo.credits}</span> pts</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="text-right mr-2 hidden sm:block">
                <p className="text-[10px] text-brand-silver uppercase tracking-tighter">Status</p>
                <p className="text-[10px] font-bold text-green-400">ACTIVE</p>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => handleDelete(promo.code)}
                className="w-10 h-10 rounded-xl shadow-neumorphic-out active:shadow-neumorphic-in text-red-400 hover:text-red-300"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-brand-charcoal/50 p-6 rounded-3xl shadow-neumorphic-in border border-brand-white/5 mt-8">
        <div className="flex items-center gap-3 mb-2">
          <Zap className="w-4 h-4 text-brand-silver" />
          <h4 className="text-sm font-medium">Quick Tip</h4>
        </div>
        <p className="text-xs text-brand-silver font-light leading-relaxed">
          Codes are case-insensitive. You can distribute these via email or physical cards. Once a member redeems a code, it is linked to their account history.
        </p>
      </div>
    </div>
  );
};

export default PromoManager;