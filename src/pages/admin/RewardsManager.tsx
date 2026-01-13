import React, { useState } from 'react';
import { rewards as initialRewards } from '@/data/mockData';
import { Gift, Plus, Edit2, Trash2, Zap } from 'lucide-react';
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

const RewardsManager = () => {
  const [rewards, setRewards] = useState(initialRewards);
  const [isAddOpen, setIsAddOpen] = useState(false);

  const handleDelete = (id: number) => {
    setRewards(prev => prev.filter(r => r.id !== id));
    showSuccess('Reward removed from catalogue');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <div className="flex justify-between items-center px-1">
        <div>
          <h1 className="text-xl font-semibold">Reward Catalogue</h1>
          <p className="text-xs text-brand-silver font-light">Configure perks available for credit redemption.</p>
        </div>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button className="bg-brand-silver text-brand-charcoal font-bold rounded-xl shadow-neumorphic-out hover:brightness-95 h-10 px-4">
              <Plus className="w-4 h-4 mr-2" /> New Perk
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-brand-charcoal border-brand-white/10 text-brand-white rounded-3xl">
            <DialogHeader>
              <DialogTitle>Add New Reward</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <Input placeholder="Title (e.g. Free Dessert)" className="bg-brand-charcoal shadow-neumorphic-in border-none" />
              <Input placeholder="Cost in Credits (e.g. 500)" type="number" className="bg-brand-charcoal shadow-neumorphic-in border-none" />
              <textarea 
                className="w-full h-24 bg-brand-charcoal shadow-neumorphic-in border-none rounded-xl p-3 text-sm focus:outline-none" 
                placeholder="Description of the perk..."
              />
            </div>
            <DialogFooter>
              <Button 
                onClick={() => { setIsAddOpen(false); showSuccess('New reward added'); }}
                className="w-full bg-brand-silver text-brand-charcoal font-bold py-6 rounded-xl"
              >
                Publish Perk
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {rewards.map((reward) => (
          <div key={reward.id} className="bg-brand-charcoal p-5 rounded-3xl shadow-neumorphic-out border border-brand-white/5 group">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 bg-brand-charcoal rounded-2xl shadow-neumorphic-in flex items-center justify-center text-brand-silver">
                <Zap className="w-6 h-6" />
              </div>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg shadow-neumorphic-out text-brand-silver">
                  <Edit2 className="w-3.5 h-3.5" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => handleDelete(reward.id)}
                  className="h-8 w-8 rounded-lg shadow-neumorphic-out text-red-400"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
            
            <h3 className="font-medium text-brand-white">{reward.title}</h3>
            <p className="text-xs text-brand-silver font-light mt-1 mb-4 line-clamp-2">{reward.description}</p>
            
            <div className="flex justify-between items-center pt-4 border-t border-brand-white/5">
              <span className="text-[10px] uppercase tracking-widest text-brand-silver">Point Cost</span>
              <span className="text-sm font-bold text-brand-white">{reward.cost} pts</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RewardsManager;