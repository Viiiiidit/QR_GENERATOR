import React from 'react';
import { QrCode, ArrowLeft } from 'lucide-react';

interface HeaderProps {
  onNavigateHome?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigateHome }) => {
  return (
    <header className="sticky top-0 z-30 border-b border-teal-950/40 bg-[#090d11]/85 backdrop-blur-md shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {onNavigateHome && (
            <button
              type="button"
              id="header-nav-home-btn"
              onClick={onNavigateHome}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-slate-300 hover:text-teal-300 bg-[#0e161c] hover:bg-[#131f26] border border-teal-950 hover:border-teal-700/50 transition-all cursor-pointer mr-1"
              title="Return to Home Landing Page"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Home</span>
            </button>
          )}

          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500/20 to-emerald-500/10 border border-teal-500/30 text-teal-300 shadow-[0_0_15px_rgba(20,184,166,0.15)]">
            <QrCode className="w-5 h-5 stroke-[2]" />
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-bold tracking-tight text-slate-100 leading-tight">
              QR Studio
            </h1>
            <p className="text-xs text-slate-400 font-medium hidden sm:block">
              Create, customize, and download production vector codes
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-950/60 text-emerald-400 border border-emerald-800/40">
            Studio Active
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
