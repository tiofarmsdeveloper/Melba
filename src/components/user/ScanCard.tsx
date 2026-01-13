import React from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { QrCode, ChevronRight } from 'lucide-react';
import QRCode from 'qrcode.react';

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
      <DialogContent className="bg-brand-charcoal border-brand-silver/20 text-brand-white max-w-xs rounded-2xl">
        <div className="flex flex-col items-center text-center py-8">
          <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
            <QrCode className="w-7 h-7 text-white" />
          </div>
          <h2 className="text-xl font-semibold">Scan Card</h2>
          <p className="text-sm text-brand-silver mt-1 mb-6">
            Show this QR code to staff to collect your reward
          </p>
          <div className="bg-white p-4 rounded-lg">
            <QRCode value={identifier} size={192} fgColor="#232323" />
          </div>
          <div className="mt-6">
            <p className="text-xs text-brand-silver font-light tracking-wider">IDENTIFIER</p>
            <p className="text-lg font-semibold tracking-widest mt-1">{identifier}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ScanCard;