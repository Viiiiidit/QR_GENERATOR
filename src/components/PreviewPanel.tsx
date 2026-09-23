import React from 'react';
import { Eye } from 'lucide-react';

export const PreviewPanel: React.FC = () => {
  return (
    <section
      aria-label="Live Preview"
      className="order-1 lg:order-2 w-full lg:w-[60%] flex flex-col"
    >
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs sm:shadow-sm p-6 sm:p-8 transition-shadow hover:shadow-md flex flex-col min-h-[420px]">
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
          <span className="text-xs font-medium text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">
            Auto-update
          </span>
        </div>

        <div className="flex-1 flex items-center justify-center py-12">
          <div className="w-full text-center px-6 py-16 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/60 flex flex-col items-center justify-center">
            <p className="text-base font-medium text-slate-600">Preview goes here</p>
            <p className="text-xs text-slate-400 mt-1">QR code output will be displayed here</p>
          </div>
        </div>
      </div>
    </section>
  );
};
