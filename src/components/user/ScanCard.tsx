import React from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { QrCode, ChevronRight } from 'lucide-react';
import { QRCodeSVG as QRCode } from 'qrcode.react';

interface ScanCardProps {
  identifier: string;
}

const ScanCard: React.FC<ScanCardProps> = ({ identifier }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="w-full flex items-center p-3 bg-brand-charcoal rounded-lg shadow-neumorphic-out transition-transform active:scale-[0.98]">
          <div className="w-9 h-9 bg-brand-charcoal rounded-lg flex items-center justify-center shadow-neumorphic-in mr-3">
            <QrCode className="w-5 h-5 text-brand-silver" />
          </div>
          <div className="flex-grow text-left">
            <p className="font-medium text-sm text-brand-white">Scan Card</p>
            <p className="text-xs text-brand-silver">Show this QR code to staff</p>
          </div>
          <ChevronRight className="w-5 h-5 text-brand-silver/50" />
        </button>
      </DialogTrigger>
      <DialogContent className="bg-brand-charcoal/90 backdrop-blur-xl border-brand-silver/10 text-brand-white max-w-[320px] rounded-3xl p-0 overflow-hidden shadow-2xl">
        <div className="flex flex-col items-center text-center py-10 px-6">
          <div className="w-16 h-16 bg-brand-charcoal rounded-2xl flex items-center justify-center mb-6 shadow-neumorphic-out border border-brand-silver/5">
            <QrCode className="w-8 h-8 text-brand-silver" />
          </div>
          
          <h2 className="text-xl font-medium tracking-tight mb-2">Scan Card</h2>
          <p className="text-xs text-brand-silver font-light mb-8 max-w-[200px] leading-relaxed">
            Show this QR code to staff to collect your reward
          </p>
          
          <div className="p-6 rounded-2xl shadow-neumorphic-in mb-8 bg-brand-charcoal">
            <QRCode 
              value={identifier} 
              size={180} 
              fgColor="#f0f0f0" 
              bgColor="transparent"
              level="M"
            />
          </div>
          
          <div className="w-full pt-6 border-t border-brand-silver/5">
            <p className="text-[10px] text-brand-silver font-light tracking-[0.2em] uppercase mb-1">Identifier</p>
            <p className="text-sm font-medium tracking-[0.1em] text-brand-white/90">{identifier}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ScanCard;