import React, { useEffect, useRef } from 'react';
import { Html5QrcodeScanner } from 'html5-qr-code';

interface QRScannerProps {
  onScanSuccess: (decodedText: string) => void;
  onScanError?: (error: string) => void;
}

const QRScanner: React.FC<QRScannerProps> = ({ onScanSuccess, onScanError }) => {
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);

  useEffect(() => {
    scannerRef.current = new Html5QrcodeScanner(
      "qr-reader",
      { fps: 10, qrbox: { width: 250, height: 250 } },
      /* verbose= */ false
    );

    scannerRef.current.render(
      (decodedText) => {
        onScanSuccess(decodedText);
        // We stop the scanner after a successful scan to prevent multiple triggers
        if (scannerRef.current) {
          scannerRef.current.clear().catch(err => console.error("Failed to clear scanner", err));
        }
      },
      (error) => {
        if (onScanError) onScanError(error);
      }
    );

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch(err => console.error("Failed to clear scanner on unmount", err));
      }
    };
  }, [onScanSuccess, onScanError]);

  return (
    <div className="w-full max-w-sm mx-auto overflow-hidden rounded-3xl shadow-neumorphic-in bg-brand-charcoal p-4 border border-brand-white/5">
      <div id="qr-reader" className="w-full"></div>
      <style>{`
        #qr-reader {
          border: none !important;
        }
        #qr-reader__scan_region {
          background: #232323 !important;
          border-radius: 1rem !important;
        }
        #qr-reader__dashboard_section_csr button {
          background-color: #c0c0c0 !important;
          color: #232323 !important;
          border: none !important;
          border-radius: 0.75rem !important;
          padding: 8px 16px !important;
          font-weight: bold !important;
          margin-top: 10px !important;
          cursor: pointer !important;
        }
        #qr-reader__status_span {
            font-size: 12px !important;
            color: #c0c0c0 !important;
        }
      `}</style>
    </div>
  );
};

export default QRScanner;