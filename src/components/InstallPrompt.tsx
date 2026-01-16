import React, { useState, useEffect } from 'react';
import { X, Download, Share, PlusSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

const InstallPrompt = () => {
  const isMobile = useIsMobile();
  const [showPrompt, setShowPrompt] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [platform, setPlatform] = useState<'ios' | 'android' | 'other'>('other');

  useEffect(() => {
    // Detect platform
    const ua = window.navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(ua)) {
      setPlatform('ios');
    } else if (/android/.test(ua)) {
      setPlatform('android');
    }

    // Check if already installed
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches 
      || (window.navigator as any).standalone 
      || document.referrer.includes('android-app://');

    if (isStandalone) return;

    // Listen for Android install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      // Only show after a short delay so it's not jarring
      setTimeout(() => setShowPrompt(true), 3000);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // For iOS, we show it manually since there's no event
    if (/iphone|ipad|ipod/.test(ua) && !isStandalone) {
      const hasDismissed = localStorage.getItem('melba_install_dismissed');
      if (!hasDismissed) {
        setTimeout(() => setShowPrompt(true), 4000);
      }
    }

    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setShowPrompt(false);
      }
      setDeferredPrompt(null);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem('melba_install_dismissed', 'true');
  };

  if (!isMobile || !showPrompt) return null;

  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 w-[calc(100%-2.5rem)] max-w-sm z-[100] animate-in slide-in-from-bottom-8 duration-700">
      <div className="bg-brand-charcoal/95 backdrop-blur-xl rounded-3xl p-5 shadow-2xl border border-brand-white/10 relative overflow-hidden">
        {/* Close Button */}
        <button 
          onClick={handleDismiss}
          className="absolute top-3 right-3 p-1 text-brand-silver/50 hover:text-brand-white"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-brand-charcoal rounded-2xl shadow-neumorphic-out flex items-center justify-center shrink-0 border border-brand-white/5">
            <span className="font-bold text-lg">M</span>
          </div>
          <div className="flex-grow">
            <h4 className="text-sm font-bold text-brand-white">Install Melba</h4>
            <p className="text-[10px] text-brand-silver font-light leading-tight mt-0.5">
              Add to your home screen for a seamless private lounge experience.
            </p>
          </div>
        </div>

        <div className="mt-5">
          {platform === 'ios' ? (
            <div className="bg-brand-charcoal/50 rounded-2xl p-3 border border-brand-white/5 space-y-3">
              <p className="text-[10px] text-brand-silver text-center">
                To install on iOS:
              </p>
              <div className="flex justify-around items-center">
                <div className="flex flex-col items-center gap-1">
                  <div className="w-8 h-8 rounded-lg bg-brand-charcoal shadow-neumorphic-in flex items-center justify-center">
                    <Share className="w-4 h-4 text-blue-400" />
                  </div>
                  <span className="text-[8px] text-brand-silver uppercase">1. Tap Share</span>
                </div>
                <div className="w-4 h-[1px] bg-brand-white/10" />
                <div className="flex flex-col items-center gap-1">
                  <div className="w-8 h-8 rounded-lg bg-brand-charcoal shadow-neumorphic-in flex items-center justify-center">
                    <PlusSquare className="w-4 h-4" />
                  </div>
                  <span className="text-[8px] text-brand-silver uppercase">2. Add to Home</span>
                </div>
              </div>
            </div>
          ) : (
            <Button 
              onClick={handleInstall}
              className="w-full bg-brand-silver text-brand-charcoal font-bold py-5 rounded-2xl shadow-md flex items-center justify-center gap-2 hover:brightness-95 active:scale-[0.98] transition-all"
            >
              <Download className="w-4 h-4" />
              Install Now
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default InstallPrompt;