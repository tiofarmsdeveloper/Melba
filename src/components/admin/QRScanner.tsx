import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScanLine, Keyboard } from 'lucide-react';

interface QRScannerProps {
  onScanSuccess: (decodedText: string) => void;
  onScanError?: (error: string) => void;
}

const QRScanner: React.FC<QRScannerProps> = ({ onScanSuccess, onScanError }) => {
  const [manualCode, setManualCode] = useState('');

  const handleManualSubmit = () => {
    if (manualCode.trim()) {
      onScanSuccess(manualCode.trim());
      setManualCode('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleManualSubmit();
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto overflow-hidden rounded-3xl shadow-neumorphic-in bg-brand-charcoal p-6 border border-brand-white/5 space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-brand-charcoal rounded-2xl shadow-neumorphic-out mx-auto mb-4 flex items-center justify-center">
          <Keyboard className="w-8 h-8 text-brand-silver" />
        </div>
        <h3 className="text-sm font-medium text-brand-white mb-2">Manual Entry</h3>
        <p className="text-xs text-brand-silver font-light">Enter the member's ID code manually</p>
      </div>

      <div className="space-y-4">
        <Input
          value={manualCode}
          onChange={(e) => setManualCode(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="210-843-775-807"
          className="bg-brand-charcoal text-brand-white border-none rounded-xl h-12 shadow-neumorphic-in px-4 text-center font-mono tracking-wider"
        />
        
        <Button 
          onClick={handleManualSubmit}
          disabled={!manualCode.trim()}
          className="w-full bg-brand-silver text-brand-charcoal font-bold py-3 rounded-xl shadow-md hover:brightness-95 active:scale-[0.98] transition-all"
        >
          <ScanLine className="w-4 h-4 mr-2" />
          Lookup Member
        </Button>
      </div>

      <div className="text-center">
        <p className="text-[10px] text-brand-silver/50 uppercase tracking-widest">Staff Terminal</p>
      </div>
    </div>
  );
};

export default QRScanner;