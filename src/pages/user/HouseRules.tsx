import React from 'react';
import { Shield, VolumeX, Eye, UserCheck, Heart } from 'lucide-react';

const HouseRules = () => {
  const rules = [
    {
      icon: Shield,
      title: "Integrity of Membership",
      desc: "Membership is non-transferable. Your ID and vouchers are for your personal use within the Melba community."
    },
    {
      icon: VolumeX,
      title: "The Melba Atmosphere",
      desc: "We prioritize curated tranquility. Please keep mobile devices on silent and avoid flash photography."
    },
    {
      icon: Eye,
      title: "Privacy First",
      desc: "Respect the privacy of fellow members. Capturing other guests in photos or videos is strictly prohibited."
    },
    {
      icon: UserCheck,
      title: "Guest Policy",
      desc: "Members may bring guests based on their tier privileges. Guests must adhere to all House Rules."
    },
    {
      icon: Heart,
      title: "Respect the Craft",
      desc: "Our chefs and staff are artisans. Please treat our team and the estate with the utmost respect."
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="text-center">
        <h1 className="text-3xl font-cursive mb-2">The House Rules</h1>
        <p className="text-xs text-brand-silver font-light tracking-widest uppercase">Etiqutte & Community Standards</p>
      </div>

      <div className="space-y-4">
        {rules.map((rule, i) => (
          <div key={i} className="bg-brand-charcoal p-6 rounded-3xl shadow-neumorphic-out border border-brand-white/5">
            <div className="w-10 h-10 bg-brand-charcoal rounded-xl shadow-neumorphic-in flex items-center justify-center mb-4">
              <rule.icon className="w-5 h-5 text-brand-silver" />
            </div>
            <h3 className="text-sm font-semibold mb-2">{rule.title}</h3>
            <p className="text-xs text-brand-silver leading-relaxed font-light">{rule.desc}</p>
          </div>
        ))}
      </div>

      <div className="p-8 bg-brand-charcoal rounded-3xl shadow-neumorphic-in text-center border border-brand-white/5">
        <p className="text-xs text-brand-silver italic leading-relaxed">
          "Membership is a privilege, not a right. The House reserves the right to revoke access for any breach of these standards."
        </p>
      </div>
    </div>
  );
};

export default HouseRules;