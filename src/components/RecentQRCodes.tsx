import React from 'react';
import {
  History,
  Trash2,
  Link as LinkIcon,
  FileText,
  Mail,
  Phone,
  Wifi,
  QrCode as QrCodeIcon,
} from 'lucide-react';
import type { FormState, QRSettings, QRType, RecentQRCode } from '../types';

interface RecentQRCodesProps {
  recentCodes: RecentQRCode[];
  onSelect: (formState: FormState, settings: QRSettings) => void;
  onClear: () => void;
}

const TYPE_ICONS: Record<QRType, React.ComponentType<{ className?: string }>> = {
  url: LinkIcon,
  text: FileText,
  email: Mail,
  phone: Phone,
  wifi: Wifi,
};

const TYPE_BADGES: Record<QRType, { label: string; colorClass: string }> = {
  url: { label: 'URL', colorClass: 'bg-blue-50 text-blue-700 border-blue-200/60' },
  text: { label: 'Text', colorClass: 'bg-slate-100 text-slate-700 border-slate-200' },
  email: { label: 'Email', colorClass: 'bg-emerald-50 text-emerald-700 border-emerald-200/60' },
  phone: { label: 'Phone', colorClass: 'bg-purple-50 text-purple-700 border-purple-200/60' },
  wifi: { label: 'Wi-Fi', colorClass: 'bg-amber-50 text-amber-700 border-amber-200/60' },
};

function formatTimestamp(ts: number): string {
  const diffSec = Math.floor((Date.now() - ts) / 1000);
  if (diffSec < 60) return 'Just now';
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHours = Math.floor(diffMin / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  return new Date(ts).toLocaleDateString([], { month: 'short', day: 'numeric' });
}

export const RecentQRCodes: React.FC<RecentQRCodesProps> = ({
  recentCodes,
  onSelect,
  onClear,
}) => {
  return (
    <section
      aria-label="Recent QR Codes"
      className="w-full mt-6 bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-6 transition-shadow hover:shadow-md"
    >
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center">
            <History className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900">Recent QR Codes</h3>
            <p className="text-xs text-slate-500">
              Saved on download &bull; Click any thumbnail to restore
            </p>
          </div>
        </div>

        {recentCodes.length > 0 && (
          <button
            type="button"
            onClick={onClear}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-rose-600 transition-colors px-2 py-1 rounded-lg hover:bg-rose-50"
            title="Clear recent history"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Clear All</span>
          </button>
        )}
      </div>

      {recentCodes.length === 0 ? (
        <div className="text-center py-8 px-4 rounded-xl border border-dashed border-slate-200 bg-slate-50/50">
          <QrCodeIcon className="w-8 h-8 text-slate-300 mx-auto mb-2" />
          <p className="text-xs font-medium text-slate-600">No saved codes yet</p>
          <p className="text-[11px] text-slate-400 max-w-sm mx-auto mt-0.5">
            When you download a QR code, its exact content and custom style will appear here for quick access.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {recentCodes.map((item) => {
            const Icon = TYPE_ICONS[item.type] || QrCodeIcon;
            const badge = TYPE_BADGES[item.type] || {
              label: item.type,
              colorClass: 'bg-slate-100 text-slate-700 border-slate-200',
            };

            return (
              <button
                key={item.id}
                type="button"
                data-recent-card="true"
                id={`recent-card-${item.id}`}
                onClick={() => onSelect(item.formState, item.settings)}
                className="group flex items-center gap-3 p-3 rounded-xl border border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/80 active:scale-[0.98] transition-all text-left shadow-2xs min-h-[56px] focus:outline-none focus:ring-2 focus:ring-slate-900 min-w-0"
              >
                {/* Visual Thumbnail Swatch */}
                <div
                  className="w-10 h-10 rounded-lg border border-slate-300/80 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform"
                  style={{ backgroundColor: item.settings.bgColor }}
                >
                  <div
                    className="w-6 h-6 rounded flex items-center justify-center"
                    style={
                      item.settings.gradient && item.settings.gradient.colorStops?.length
                        ? {
                            background: `linear-gradient(135deg, ${item.settings.gradient.colorStops[0]?.color}, ${item.settings.gradient.colorStops[item.settings.gradient.colorStops.length - 1]?.color})`,
                          }
                        : { backgroundColor: item.settings.fgColor }
                    }
                  >
                    <Icon className="w-3.5 h-3.5 text-white" />
                  </div>
                </div>

                {/* Content details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 mb-0.5">
                    <span
                      className={`text-[9px] font-semibold uppercase tracking-wider px-1.5 py-0.2 rounded border ${badge.colorClass}`}
                    >
                      {badge.label}
                    </span>
                    <span className="text-[10px] text-slate-400 shrink-0">
                      {formatTimestamp(item.timestamp)}
                    </span>
                  </div>
                  <p
                    className="text-xs font-medium text-slate-800 truncate"
                    title={item.label}
                  >
                    {item.label}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default RecentQRCodes;
