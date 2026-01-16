import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog';
import { 
  TrendingUp, 
  Users, 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  BarChart3, 
  ArrowUpRight,
  Target
} from 'lucide-react';

interface WhyLoyaltyDialogProps {
  children: React.ReactNode;
}

const WhyLoyaltyDialog: React.FC<WhyLoyaltyDialogProps> = ({ children }) => {
  const metrics = [
    { label: "Visit Frequency", value: "+42%", desc: "Increase in monthly visits from Black Circle members." },
    { label: "Acquisition Cost", value: "-30%", desc: "Lower CAC via integrated peer-to-peer referrals." },
    { label: "Avg. Spend", value: "+18%", desc: "Higher AOV triggered by tier-climbing psychology." }
  ];

  const points = [
    {
      icon: Sparkles,
      title: "Controlled Exclusivity",
      desc: "Transforms the brand into a 'Veblen Good' where higher status increases desirability. The invite-only model ensures 100% pre-vetted customer quality."
    },
    {
      icon: TrendingUp,
      title: "Behavioral Hikes",
      desc: "Strategic milestones at 2,500 and 5,000 points create 'sunk cost' value, making it 5x more likely for members to choose Melba over competitors."
    },
    {
      icon: Users,
      title: "The 3.5x Referral Engine",
      desc: "Invited guests convert at a 3.5x higher rate than public leads. Every existing member becomes a high-performance salesperson for the estate."
    },
    {
      icon: Target,
      title: "Dynamic Inventory Optimization",
      desc: "Credit velocity tracking allows for 98% precision in predicting peak demand, reducing artisanal waste and optimizing labor costs."
    }
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="bg-brand-charcoal/95 backdrop-blur-3xl border-brand-silver/10 text-brand-white max-w-lg rounded-3xl p-8 shadow-2xl overflow-y-auto max-h-[90vh] no-scrollbar">
        <DialogHeader className="text-left mb-6">
          <div className="w-12 h-12 bg-brand-charcoal rounded-2xl shadow-neumorphic-out flex items-center justify-center mb-4">
            <BarChart3 className="w-6 h-6 text-brand-silver" />
          </div>
          <DialogTitle className="text-2xl font-semibold tracking-tight">Melba Growth Strategy</DialogTitle>
          <DialogDescription className="text-brand-silver font-light leading-relaxed">
            A data-driven analysis of how the loyalty ecosystem scales luxury operations and maximizes LTV (Lifetime Value).
          </DialogDescription>
        </DialogHeader>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {metrics.map((m, i) => (
            <div key={i} className="bg-brand-charcoal p-3 rounded-2xl shadow-neumorphic-in border border-brand-white/5">
              <p className="text-[18px] font-bold text-brand-white flex items-center gap-1">
                {m.value} <ArrowUpRight className="w-3 h-3 text-green-400" />
              </p>
              <p className="text-[9px] text-brand-silver uppercase tracking-tighter font-bold mb-1">{m.label}</p>
              <p className="text-[8px] text-brand-silver/50 leading-tight">{m.desc}</p>
            </div>
          ))}
        </div>

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

        <div className="mt-8 pt-6 border-t border-brand-white/5">
          <div className="bg-brand-charcoal p-4 rounded-2xl shadow-neumorphic-out border border-brand-white/5">
             <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] text-brand-silver uppercase tracking-widest font-bold">Projected Revenue Impact</span>
                <span className="text-[10px] text-green-400 font-bold">YEAR 1</span>
             </div>
             <div className="h-2 w-full bg-brand-charcoal rounded-full shadow-neumorphic-in overflow-hidden p-[1px]">
                <div className="h-full w-[78%] bg-brand-silver rounded-full shadow-[0_0_10px_rgba(192,192,192,0.5)]" />
             </div>
             <p className="text-[10px] text-brand-silver/50 mt-2 text-center">
               Est. <span className="text-brand-white font-bold">+24% Net Growth</span> through member-driven network effects.
             </p>
          </div>
          
          <p className="text-[10px] text-brand-silver/20 uppercase tracking-[0.4em] mt-6 text-center italic">Luxury • Scalability • Data</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WhyLoyaltyDialog;