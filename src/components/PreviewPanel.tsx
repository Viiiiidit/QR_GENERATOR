import React from 'react';
import { Eye, QrCode as QrCodeIcon, Loader2 } from 'lucide-react';
import { useQRCode } from '../hooks';
import type { QRType } from '../types';

interface PreviewPanelProps {
  qrData: string;
  type: QRType;
}

const TYPE_LABELS: Record<QRType, string> = {
  url: 'Website Link',
  text: 'Plain Text',
  email: 'Email Action',
  phone: 'Phone Call',
  wifi: 'Wi-Fi Network',
};

export const PreviewPanel: React.FC<PreviewPanelProps> = ({ qrData, type }) => {
  const { containerRef, hasData, debouncedData, isDebouncing } = useQRCode({
    data: qrData,
    debounceMs: 300,
  });

  return (
    <section
      aria-label="Live Preview"
      className="order-1 lg:order-2 w-full lg:w-[60%] flex flex-col"
    >
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs sm:shadow-sm p-6 sm:p-8 flex flex-col min-h-[460px] transition-shadow hover:shadow-md">
        {/* Panel Header */}
        <div className="flex items-center justify-between pb-5 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Eye className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-slate-900">Live Preview</h2>
              <p className="text-xs text-slate-500">Real-time QR code rendering</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isDebouncing && hasData && (
              <span className="flex items-center gap-1 text-[11px] text-slate-400 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-150">
                <Loader2 className="w-3 h-3 animate-spin" />
                <span>Updating...</span>
              </span>
            )}
            <span className="text-xs font-medium text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md">
              {TYPE_LABELS[type]}
            </span>
          </div>
        </div>

        {/* Preview Area */}
        <div className="flex-1 flex flex-col items-center justify-center py-8">
          {hasData ? (
            <div className="flex flex-col items-center animate-in fade-in duration-200">
              {/* QR Container */}
              <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm flex items-center justify-center">
                <div
                  ref={containerRef}
                  id="qr-code-canvas-container"
                  className="flex items-center justify-center [&>svg]:block [&>canvas]:block"
                />
              </div>

              {/* Payload Hint */}
              <div className="mt-4 max-w-sm text-center">
                <p className="text-xs text-slate-400 font-mono truncate px-2" title={debouncedData}>
                  {debouncedData}
                </p>
                <p className="text-[11px] text-slate-400 mt-1">
                  Point your phone camera to scan and test
                </p>
              </div>
            </div>
          ) : (
            /* Neutral Placeholder when input is empty */
            <div
              id="qr-preview-empty-placeholder"
              className="w-full max-w-md text-center px-6 py-14 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/70 flex flex-col items-center justify-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mb-3">
                <QrCodeIcon className="w-7 h-7 stroke-[1.5]" />
              </div>
              <h3 className="text-sm font-semibold text-slate-700">Preview goes here</h3>
              <p className="text-xs text-slate-400 max-w-xs mt-1 leading-relaxed">
                Fill in the details in the form to generate and preview your live QR code.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PreviewPanel;
