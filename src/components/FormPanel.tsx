import React from 'react';
import { Sliders } from 'lucide-react';

export const FormPanel: React.FC = () => {
  return (
    <section
      aria-label="Configuration Form"
      className="order-2 lg:order-1 w-full lg:w-[40%] flex flex-col"
    >
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs sm:shadow-sm p-6 sm:p-8 transition-shadow hover:shadow-md flex flex-col min-h-[420px]">
        <div className="flex items-center gap-3 pb-5 border-b border-slate-100">
          <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center">
            <Sliders className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-slate-900">QR Details</h2>
            <p className="text-xs text-slate-500">Configure content, colors, and styling</p>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center py-12">
          <div className="w-full text-center px-6 py-12 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/60">
            <p className="text-sm font-medium text-slate-500">Form goes here</p>
          </div>
        </div>
      </div>
    </section>
  );
};
