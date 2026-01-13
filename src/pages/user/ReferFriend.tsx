import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Copy, Share2, Users } from 'lucide-react';
import { showSuccess } from '@/utils/toast';

const ReferFriend = () => {
  const { user } = useAuth();
  const referralCode = user?.identifier.split('-')[0] + "FRIEND";

  const handleCopy = () => {
    navigator.clipboard.writeText(referralCode);
    showSuccess("Referral code copied to clipboard!");
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center">
        <div className="w-20 h-20 bg-brand-charcoal rounded-full flex items-center justify-center shadow-neumorphic-out mx-auto mb-4">
          <Users className="w-10 h-10 text-brand-silver" />
        </div>
        <h1 className="text-2xl font-semibold mb-2">Invite Friends</h1>
        <p className="text-sm text-brand-silver font-light max-w-xs mx-auto">
          Share your love for Melba. For every friend who joins, you both get 250 credits.
        </p>
      </div>

      <div className="bg-brand-charcoal p-6 rounded-2xl shadow-neumorphic-out text-center">
        <p className="text-[10px] text-brand-silver font-light tracking-[0.2em] uppercase mb-3">Your Referral Code</p>
        <div className="bg-brand-charcoal py-4 px-6 rounded-xl shadow-neumorphic-in mb-6 border border-brand-white/5">
          <span className="text-xl font-bold tracking-widest">{referralCode}</span>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <Button 
            onClick={handleCopy}
            className="bg-brand-charcoal text-brand-silver shadow-neumorphic-out hover:bg-brand-charcoal hover:text-brand-white flex items-center justify-center gap-2 py-6 rounded-xl border-none"
          >
            <Copy className="w-4 h-4" /> Copy
          </Button>
          <Button 
            className="bg-brand-silver text-brand-charcoal font-bold shadow-md flex items-center justify-center gap-2 py-6 rounded-xl hover:brightness-95"
          >
            <Share2 className="w-4 h-4" /> Share
          </Button>
        </div>
      </div>

      <div className="pt-4">
        <h3 className="text-sm font-medium mb-4">How it works</h3>
        <div className="space-y-4">
          {[
            { title: "Send Invite", desc: "Share your unique code with your inner circle." },
            { title: "They Join", desc: "Your friend signs up using your invitation link." },
            { title: "Get Rewarded", desc: "You both receive 250 credits once they are approved." }
          ].map((step, i) => (
            <div key={i} className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-brand-charcoal shadow-neumorphic-in flex items-center justify-center shrink-0 text-xs font-bold">
                {i + 1}
              </div>
              <div>
                <p className="text-sm font-medium">{step.title}</p>
                <p className="text-xs text-brand-silver font-light">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReferFriend;