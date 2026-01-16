import React, { useEffect, useRef, useState } from 'react';
import { Html5QrcodeScanner, Html5QrcodeSupportedFormats } from 'html5-qrcode';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScanLine, Keyboard, Camera, StopCircle } from 'lucide-react';

interface QRScannerProps {
  onScanSuccess: (decodedText: string) => void;
  onScanError?: (error: string) => void;
}

const QRScanner: React.FC<QRScannerProps> = ({ onScanSuccess, onScanError }) => {
  const [manualCode, setManualCode] = useState('');
  const [isCameraActive, setIsCameraActive] = useState(false);
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);
  const scannerId = "qr-reader";

  useEffect(() => {
    if (isCameraActive) {
      // Initialize scanner when camera is activated
      scannerRef.current = new Html5QrcodeScanner(
        scannerId,
        { 
          fps: 10, 
          qrbox: { width: 250, height: 250 },
          aspectRatio: 1.0,
          formatsToSupport: [Html5QrcodeSupportedFormats.QR_CODE]
        },
        /* verbose= */ false
      );

      scannerRef.current.render(
        (decodedText) => {
          // Success callback
          onScanSuccess(decodedText);
          handleStopCamera();
        },
        (error) => {
          // Error callback (usually just "no QR code found" in current frame)
          if (onScanError) onScanError(error);
        }
      );
    }

    return () => {
      // Cleanup on unmount or when camera deactivated
      if (scannerRef.current) {
        scannerRef.current.clear().catch(err => console.error("Failed to clear scanner", err));
      }
    };
  }, [isCameraActive, onScanSuccess, onScanError]);

  const handleStartCamera = () => {
    setIsCameraActive(true);
  };

  const handleStopCamera = () => {
    setIsCameraActive(false);
    if (scannerRef.current) {
      scannerRef.current.clear().catch(err => console.error("Failed to clear scanner", err));
    }
  };

  const handleManualSubmit = () => {
    if (manualCode.trim()) {
      onScanSuccess(manualCode.trim());
      setManualCode('');
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto overflow-hidden rounded-3xl shadow-neumorphic-in bg-brand-charcoal p-6 border border-brand-white/5 space-y-6">
      {!isCameraActive ? (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="text-center">
            <div className="w-16 h-16 bg-brand-charcoal rounded-2xl shadow-neumorphic-out mx-auto mb-4 flex items-center justify-center">
              <Camera className="w-8 h-8 text-brand-silver" />
            </div>
            <h3 className="text-sm font-medium text-brand-white mb-2">Scan Member Card</h3>
            <p className="text-xs text-brand-silver font-light">Use the camera to scan the member's QR code</p>
          </div>

          <Button 
            onClick={handleStartCamera}
            className="w-full bg-brand-white text-brand-charcoal font-bold py-6 rounded-xl shadow-md hover:brightness-95 active:scale-[0.98] transition-all"
          >
            <Camera className="w-4 h-4 mr-2" />
            Open Camera
          </Button>

          <div className="relative flex items-center py-2">
            <div className="flex-grow border-t border-brand-white/5"></div>
            <span className="flex-shrink mx-4 text-[10px] text-brand-silver/30 uppercase tracking-widest font-bold">OR</span>
            <div className="flex-grow border-t border-brand-white/5"></div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <Keyboard className="w-3 h-3 text-brand-silver/50" />
              <span className="text-[10px] text-brand-silver/50 uppercase tracking-widest font-bold">Manual Entry</span>
            </div>
            <Input
              value={manualCode}
              onChange={(e) => setManualCode(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleManualSubmit()}
              placeholder="e.g. 210-843-775-807"
              className="bg-brand-charcoal text-brand-white border-none rounded-xl h-12 shadow-neumorphic-in px-4 text-center font-mono tracking-wider placeholder:font-sans placeholder:tracking-normal"
            />
            <Button 
              onClick={handleManualSubmit}
              variant="ghost"
              disabled={!manualCode.trim()}
              className="w-full text-brand-silver hover:text-brand-white hover:bg-white/5 py-3 rounded-xl transition-all"
            >
              Lookup ID
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-4 animate-in zoom-in-95 duration-300">
          <div className="relative aspect-square w-full bg-black/40 rounded-2xl overflow-hidden shadow-neumorphic-in border border-brand-white/10">
            <div id={scannerId} className="w-full h-full"></div>
            {/* Custom Overlay for scanning look */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
              <div className="w-48 h-48 border-2 border-brand-white/20 rounded-2xl relative">
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-brand-white -mt-1 -ml-1"></div>
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-brand-white -mt-1 -mr-1"></div>
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-brand-white -mb-1 -ml-1"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-brand-white -mb-1 -mr-1"></div>
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-brand-white/20 animate-pulse"></div>
              </div>
            </div>
          </div>
          
          <Button 
            onClick={handleStopCamera}
            variant="ghost"
            className="w-full text-red-400 hover:text-red-300 hover:bg-red-400/10 py-4 rounded-xl transition-all flex items-center justify-center gap-2"
          >
            <StopCircle className="w-4 h-4" />
            Cancel Scanning
          </Button>
        </div>
      )}

      <div className="text-center pt-2">
        <p className="text-[10px] text-brand-silver/50 uppercase tracking-[0.3em]">Melba House Terminal</p>
      </div>
    </div>
  );
};

export default QRScanner;