import React, { useState, useEffect } from 'react';
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
  BarChart3, 
  ArrowUpRight,
  RefreshCcw,
  ZapOff,
  Download,
  Share,
  PlusSquare,
  Smartphone
} from 'lucide-react';
import { BarChart, Bar, XAxis, ResponsiveContainer, Cell, Tooltip } from 'recharts';
import { Button } from '@/components/ui/button';

interface WhyLoyaltyDialogProps {
  children: React.ReactNode;
}

const WhyLoyaltyDialog: React.FC<WhyLoyaltyDialogProps> = ({ children }) => {
  const [platform, setPlatform] = useState<'ios' | 'android' | 'other'>('other');
  const [showInstructions, setShowInstructions] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    const ua = window.navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(ua)) setPlatform('ios');
    else if (/android/.test(ua)) setPlatform('android');

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  const handleDownloadClick = async () => {
    if (platform === 'android' && deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
      }
    } else {
      // For iOS or if prompt isn't available, show instructions
      setShowInstructions(true);
    }
  };

  const metrics = [
    { label: "Visit Frequency", value: "+42%", desc: "Increase in monthly visits from Black Circle members." },
    { label: "Acquisition Cost", value: "-30%", desc: "Lower CAC via integrated peer-to-peer referrals." },
    { label: "Avg. Spend", value: "+18%", desc: "Higher AOV triggered by tier-climbing psychology." }
  ];

  const lifecycleData = [
    { name: 'Q1', value: 30 },
    { name: 'Q2', value: 55 },
    { name: 'Q3', value: 85 },
    { name: 'Q4', value: 100 },
  ];

  const points = [
    {
      icon: RefreshCcw,
      title: "The Viral Loop (Hikes)",
      desc: "Our 'Refer-to-Earn' system isn't just a bonus; it's a 3.5x multiplier. One high-value member effectively acquires 3.5 new 'pre-qualified' leads."
    },
    {
      icon: ZapOff,
      title: "Churn Prevention Strategy",
      desc: "Automated 'Re-engagement Perks' at the 21-day mark, reducing member attrition by 65%."
    },
    {
      icon: TrendingUp,
      title: "LTV Expansion",
      desc: "Strategic milestones at 2,500 and 5,000 points create 'sunk cost' value, locking in member loyalty."
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
            A mathematical model for luxury brand scaling and automated customer acquisition.
          </DialogDescription>
        </DialogHeader>

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

        <div className="mb-8 p-6 bg-brand-charcoal/50 rounded-2xl shadow-neumorphic-in border border-brand-white/5">
          <h4 className="text-[10px] uppercase tracking-[0.2em] text-brand-silver font-bold mb-6">Member Lifecycle Efficiency</h4>
          <div className="h-32 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={lifecycleData}>
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#c0c0c0', fontSize: 10, fontWeight: 'bold'}}
                  dy={10}
                />
                <Tooltip 
                  cursor={{fill: 'rgba(255,255,255,0.05)'}}
                  contentStyle={{backgroundColor: '#232323', border: '1px solid rgba(192,192,192,0.1)', borderRadius: '8px'}}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={40}>
                  {lifecycleData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 3 ? '#ffffff' : '#c0c0c0'} fillOpacity={0.2 + (index * 0.25)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-6 mb-8">
          {points.map((point, i) => (
            <div key={i} className="flex gap-4 group">
              <div className="w-10 h-10 rounded-xl bg-brand-charcoal shadow-neumorphic-in flex items-center justify-center shrink-0">
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
          <div className="bg-brand-charcoal p-6 rounded-3xl shadow-neumorphic-out border border-brand-white/5">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 bg-brand-charcoal rounded-xl shadow-neumorphic-in flex items-center justify-center">
                <Smartphone className="w-5 h-5 text-brand-white" />
              </div>
              <div>
                <h4 className="text-sm font-bold">Native Experience</h4>
                <p className="text-[10px] text-brand-silver font-light uppercase tracking-widest">Install Melba App</p>
              </div>
            </div>

            {showInstructions ? (
              <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                {platform === 'ios' ? (
                  <div className="bg-brand-charcoal/50 rounded-2xl p-4 border border-brand-white/5">
                    <p className="text-[10px] text-brand-silver text-center mb-4">TO INSTALL ON IPHONE:</p>
                    <div className="flex justify-around items-center">
                      <div className="flex flex-col items-center gap-1 text-center">
                        <div className="w-8 h-8 rounded-lg bg-brand-charcoal shadow-neumorphic-in flex items-center justify-center">
                          <Share className="w-4 h-4 text-blue-400" />
                        </div>
                        <span className="text-[8px] text-brand-silver uppercase leading-tight">1. Tap<br/>Share</span>
                      </div>
                      <div className="w-4 h-[1px] bg-brand-white/10" />
                      <div className="flex flex-col items-center gap-1 text-center">
                        <div className="w-8 h-8 rounded-lg bg-brand-charcoal shadow-neumorphic-in flex items-center justify-center">
                          <PlusSquare className="w-4 h-4" />
                        </div>
                        <span className="text-[8px] text-brand-silver uppercase leading-tight">2. Add to<br/>Home Screen</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-brand-charcoal/50 rounded-2xl p-4 border border-brand-white/5 text-center">
                    <p className="text-[10px] text-brand-silver uppercase mb-2">Android Installation</p>
                    <p className="text-xs text-brand-white font-light">Tap the browser menu (⋮) and select <span className="font-bold">"Install App"</span> or "Add to Home Screen".</p>
                  </div>
                )}
                <Button 
                  onClick={() => setShowInstructions(false)}
                  variant="ghost" 
                  className="w-full text-[10px] text-brand-silver uppercase tracking-widest"
                >
                  Back
                </Button>
              </div>
            ) : (
              <Button 
                onClick={handleDownloadClick}
                className="w-full bg-brand-silver text-brand-charcoal font-bold py-6 rounded-2xl shadow-md hover:brightness-95 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                {platform === 'android' && deferredPrompt ? 'Install Now' : 'Download Melba App'}
              </Button>
            )}
            
            <p className="text-[10px] text-brand-silver/30 mt-4 text-center italic">
              *Requires a modern mobile browser. No App Store visit required.
            </p>
          </div>
          
          <p className="text-[10px] text-brand-silver/20 uppercase tracking-[0.4em] mt-8 text-center italic">Luxury • Scalability • Data</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WhyLoyaltyDialog;