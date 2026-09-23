import React, { useMemo, useState } from 'react';
import {
  Eye,
  QrCode as QrCodeIcon,
  Loader2,
  Download,
  FileCode,
  AlertTriangle,
} from 'lucide-react';
import { useQRCode } from '../hooks';
import type { QRSettings, QRType } from '../types';
import { buildQRCodeOptions, checkScannabilityWarnings } from '../utils';

interface PreviewPanelProps {
  qrData: string;
  type: QRType;
  settings: QRSettings;
  isValid: boolean;
  onDownloadSuccess?: () => void;
}

const TYPE_LABELS: Record<QRType, string> = {
  url: 'Website Link',
  text: 'Plain Text',
  email: 'Email Action',
  phone: 'Phone Call',
  wifi: 'Wi-Fi Network',
};

export const PreviewPanel: React.FC<PreviewPanelProps> = ({
  qrData,
  type,
  settings,
  isValid,
  onDownloadSuccess,
}) => {
  const [downloading, setDownloading] = useState<'png' | 'svg' | null>(null);

  // Build QR options from current customization settings immediately
  const qrOptions = useMemo(() => {
    return buildQRCodeOptions(settings);
  }, [settings]);

  // Compute non-blocking scannability risk warnings (contrast, margin, ECC)
  const scannabilityWarnings = useMemo(() => {
    return checkScannabilityWarnings(settings);
  }, [settings]);

  const { containerRef, qrCodeRef, hasData, debouncedData, isDebouncing } = useQRCode({
    data: qrData,
    debounceMs: 300,
    qrOptions,
  });

  const handleDownload = async (extension: 'png' | 'svg') => {
    if (!qrCodeRef.current || !hasData || !isValid) return;

    try {
      setDownloading(extension);
      const timestamp = Date.now();
      const filename = `qr-code-${type}-${timestamp}`;
      await qrCodeRef.current.download({
        name: filename,
        extension,
      });
      onDownloadSuccess?.();
    } catch (err) {
      console.error('Failed to download QR code:', err);
    } finally {
      setDownloading(null);
    }
  };

  const isDownloadDisabled = !hasData || !isValid || downloading !== null;

  return (
    <section
      aria-label="Live Preview"
      className="order-1 lg:order-2 w-full lg:w-[60%] flex flex-col"
    >
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs sm:shadow-sm p-6 sm:p-7 flex flex-col min-h-[460px] transition-shadow hover:shadow-md">
        {/* Panel Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Eye className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-slate-900">Live Preview</h2>
              <p className="text-xs text-slate-500">Real-time QR code rendering &amp; download</p>
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
        <div className="flex-1 flex flex-col items-center justify-center py-5">
          {/* Non-blocking Scannability Warning Banner */}
          {scannabilityWarnings.length > 0 && (
            <div
              id="scannability-warning-banner"
              role="status"
              className="w-full mb-5 p-3.5 sm:p-4 rounded-xl bg-amber-50/90 border border-amber-200/90 text-amber-900 shadow-2xs animate-in fade-in duration-200"
            >
              <div className="flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-xs font-semibold text-amber-950">
                      Scannability Advisory ({scannabilityWarnings.length} warning{scannabilityWarnings.length > 1 ? 's' : ''})
                    </h4>
                    <span className="text-[10px] font-medium text-amber-700 bg-amber-100/70 px-2 py-0.5 rounded">
                      Advisory only
                    </span>
                  </div>

                  <div className="space-y-2 pt-1 border-t border-amber-200/50">
                    {scannabilityWarnings.map((warning) => (
                      <div key={warning.id} className="text-xs space-y-0.5">
                        <p className="font-semibold text-amber-900 text-[11px]">{warning.title}</p>
                        <p className="text-amber-800 text-[11px] leading-relaxed">{warning.issue}</p>
                        <p className="text-[11px] font-medium text-amber-900 bg-amber-100/60 rounded px-2 py-0.5 inline-block mt-0.5">
                          💡 Suggestion: {warning.suggestion}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {hasData ? (
            <div className="flex flex-col items-center w-full animate-in fade-in duration-200">
              {/* QR Container Frame with scroll fallback for large sizes */}
              <div className="w-full flex items-center justify-center overflow-x-auto p-4">
                <div
                  className="p-3 bg-white rounded-2xl border border-slate-200/90 shadow-xs flex items-center justify-center transition-all"
                  style={{ backgroundColor: settings.bgColor }}
                >
                  <div
                    ref={containerRef}
                    id="qr-code-canvas-container"
                    className="flex items-center justify-center [&>svg]:block [&>canvas]:block"
                  />
                </div>
              </div>

              {/* Payload Hint */}
              <div className="mt-3 max-w-sm text-center">
                <p className="text-xs text-slate-400 font-mono truncate px-2" title={debouncedData}>
                  {debouncedData}
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Point phone camera to scan and test
                </p>
              </div>

              {/* Validation Status message if input is invalid */}
              {!isValid && (
                <p className="mt-3 text-xs text-rose-500 font-medium text-center">
                  ⚠️ Complete the required field in the form to enable download
                </p>
              )}

              {/* Download Buttons Row */}
              <div className="mt-5 flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-sm">
                <button
                  type="button"
                  id="btn-download-png"
                  disabled={isDownloadDisabled}
                  onClick={() => handleDownload('png')}
                  className={`flex-1 w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-medium text-xs transition-all ${
                    isDownloadDisabled
                      ? 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
                      : 'bg-slate-900 text-white hover:bg-slate-800 shadow-xs active:scale-[0.98]'
                  }`}
                >
                  {downloading === 'png' ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Download className="w-4 h-4" />
                  )}
                  <span>Download PNG</span>
                </button>

                <button
                  type="button"
                  id="btn-download-svg"
                  disabled={isDownloadDisabled}
                  onClick={() => handleDownload('svg')}
                  className={`flex-1 w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-medium text-xs transition-all ${
                    isDownloadDisabled
                      ? 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
                      : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 hover:text-slate-900 shadow-2xs active:scale-[0.98]'
                  }`}
                >
                  {downloading === 'svg' ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <FileCode className="w-4 h-4" />
                  )}
                  <span>Download SVG</span>
                </button>
              </div>
            </div>
          ) : (
            /* Neutral Placeholder when input is empty */
            <div className="flex flex-col items-center w-full">
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

              {/* Disabled Download Buttons */}
              <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-sm">
                <button
                  type="button"
                  id="btn-download-png"
                  disabled
                  className="flex-1 w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-medium text-xs bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed"
                >
                  <Download className="w-4 h-4" />
                  <span>Download PNG</span>
                </button>

                <button
                  type="button"
                  id="btn-download-svg"
                  disabled
                  className="flex-1 w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-medium text-xs bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed"
                >
                  <FileCode className="w-4 h-4" />
                  <span>Download SVG</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PreviewPanel;
