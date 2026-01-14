import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Bell, Info, Gift, Award, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const Inbox = () => {
  const { user, markNotificationRead } = useAuth();
  const notifications = user?.notifications || [];

  const getIcon = (type: string) => {
    switch (type) {
      case 'reward': return <Gift className="w-5 h-5 text-brand-silver" />;
      case 'tier': return <Award className="w-5 h-5 text-brand-white" />;
      default: return <Info className="w-5 h-5 text-brand-silver/50" />;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center">
        <h1 className="text-2xl font-semibold mb-2">Member Inbox</h1>
        <p className="text-sm text-brand-silver font-light">Stay updated with exclusive offers and tier status.</p>
      </div>

      <div className="space-y-4">
        {notifications.length > 0 ? (
          notifications.map((n) => (
            <div 
              key={n.id} 
              onClick={() => markNotificationRead(n.id)}
              className={cn(
                "p-5 rounded-2xl shadow-neumorphic-out transition-all duration-300 relative overflow-hidden group border border-transparent",
                !n.read ? "bg-brand-charcoal ring-1 ring-brand-silver/20" : "bg-brand-charcoal opacity-70"
              )}
            >
              {!n.read && (
                <div className="absolute top-0 right-0 w-8 h-8 flex items-center justify-center">
                  <div className="w-2 h-2 bg-brand-white rounded-full shadow-[0_0_8px_#f0f0f0]" />
                </div>
              )}
              
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-brand-charcoal shadow-neumorphic-in flex items-center justify-center shrink-0">
                  {getIcon(n.type)}
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className={cn("text-sm font-semibold", !n.read ? "text-brand-white" : "text-brand-silver")}>{n.title}</h4>
                    <span className="text-[9px] text-brand-silver/50 uppercase">{n.date}</span>
                  </div>
                  <p className="text-xs text-brand-silver leading-relaxed font-light">{n.message}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-brand-charcoal py-16 rounded-3xl shadow-neumorphic-in text-center px-10">
            <Bell className="w-12 h-12 text-brand-silver/10 mx-auto mb-4" />
            <p className="text-sm text-brand-silver font-light">Your inbox is empty. We'll alert you when something special happens.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Inbox;