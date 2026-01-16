import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Eye, TrendingUp, Users, Sparkles, ShieldCheck, Zap } from 'lucide-react';

interface WhyLoyaltyDialogProps {
  children: React.ReactNode;
}

const WhyLoyaltyDialog: React.FC<WhyLoyaltyDialogProps> = ({ children }) => {
  const points = [
    {
      icon: Sparkles,
      title: "Psychology of Exclusivity",
      desc: "By using an invite-only model, Melba transforms a meal into a status symbol, driving organic 'FOMO' and high-value customer acquisition."
    },
    {
      icon: TrendingUp,
      title: "Increased Frequency (Hikes)",
      desc: "Tier-based rewards (Privé, Black Circle) create a 'gamified' progression that encourages members to visit 30% more frequently to reach the next status."
    },
    {
      icon: Users,
      title: "Network Effect",
      desc: "The integrated referral system turns every member into a brand ambassador, ensuring new customers are pre-vetted by the existing community."
    },
    {
      icon: ShieldCheck,
      title: "Data-Driven Precision",
      desc: "The admin portal provides real-time 'Credit Velocity' and session metrics, allowing the estate to optimize staffing and inventory based on member behavior."
    }
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="bg-brand-charcoal/95 backdrop-blur-2xl border-brand-silver/10 text-brand-white max-w-lg rounded-3xl p-8 shadow-2xl overflow-y-auto max-h-[90vh]">
        <DialogHeader className="text-left mb-6">
          <div className="w-12 h-12 bg-brand-charcoal rounded-2xl shadow-neumorphic-out flex items-center justify-center mb-4">
            <Zap className="w-6 h-6 text-brand-silver" />
          </div>
          <DialogTitle className="text-2xl font-semibold tracking-tight">The Melba Ecosystem</DialogTitle>
          <DialogDescription className="text-brand-silver font-light leading-relaxed">
            Strategic impact analysis for luxury brand scalability and member retention.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {points.map((point, i) => (
            <div key={i} className="flex gap-4 group">
              <div className="w-10 h-10 rounded-xl bg-brand-charcoal shadow-neumorphic-in flex items-center justify-center shrink-0 group-hover:shadow-neumorphic-out transition-all duration-300">
                <point.icon className="w-5 h-5 text-brand-silver" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-brand-white mb-1">{point.title}</h4>
                <p className="text-xs text-brand-silver leading-relaxed font-light">{point.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-brand-white/5 text-center">
          <p className="text-[10px] text-brand-silver/30 uppercase tracking-[0.4em] mb-2 italic">Luxury • Loyalty • Legacy</p>
          <div className="inline-block px-4 py-2 bg-brand-charcoal rounded-full shadow-neumorphic-in">
             <span className="text-[10px] text-green-400 font-bold">+24% AVG REVENUE PER USER</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WhyLoyaltyDialog;