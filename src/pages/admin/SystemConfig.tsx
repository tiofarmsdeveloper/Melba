import React, { useState } from 'react';
import { tiers as initialTiers } from '@/data/mockData';
import { Settings, Save, ShieldCheck, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { showSuccess } from '@/utils/toast';

const SystemConfig = () => {
  const [configTiers, setConfigTiers] = useState(initialTiers);

  const handleSave = () => {
    showSuccess('Tier configurations updated system-wide.');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-20">
      <div className="px-1">
        <h1 className="text-xl font-semibold">House Configuration</h1>
        <p className="text-xs text-brand-silver font-light">Manage the core rules of the Melba loyalty ecosystem.</p>
      </div>

      <div className="bg-brand-charcoal p-6 rounded-3xl shadow-neumorphic-out border border-brand-white/5 space-y-6">
        <h3 className="text-sm font-medium flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-brand-silver" /> Membership Tier Logic
        </h3>
        
        <div className="space-y-6">
          {(Object.keys(configTiers) as Array<keyof typeof configTiers>).map((t) => (
            <div key={t} className="space-y-3">
              <div className="flex justify-between items-center px-1">
                <span className="text-xs font-bold uppercase tracking-widest text-brand-silver">{t}</span>
                <span className="text-[10px] text-brand-silver/50">Min. Points Required</span>
              </div>
              <div className="relative group">
                <Input 
                  type="number"
                  defaultValue={configTiers[t].threshold}
                  className="bg-brand-charcoal shadow-neumorphic-in border-none h-12 pr-12 font-bold"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-brand-silver/30">PTS</span>
              </div>
            </div>
          ))}
        </div>

        <Button 
          onClick={handleSave}
          className="w-full bg-brand-silver text-brand-charcoal font-bold py-6 rounded-xl shadow-md hover:brightness-95 active:scale-[0.98] transition-all"
        >
          Save System Rules
        </Button>
      </div>

      <div className="bg-brand-charcoal p-6 rounded-3xl shadow-neumorphic-in border border-brand-white/5">
        <h3 className="text-sm font-medium mb-4">Platform Settings</h3>
        <div className="space-y-4">
          {[
            { label: 'Referral Bonus', val: '250', unit: 'PTS' },
            { label: 'Welcome Bonus', val: '200', unit: 'PTS' },
            { label: 'Max Redeem per Day', val: '5', unit: 'QT' }
          ].map((s, i) => (
            <div key={i} className="flex justify-between items-center py-3 border-b border-brand-white/5 last:border-none">
              <span className="text-xs text-brand-silver">{s.label}</span>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold">{s.val}</span>
                <span className="text-[8px] font-bold text-brand-silver/50">{s.unit}</span>
                <ChevronRight className="w-3 h-3 text-brand-silver/20" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SystemConfig;