import React from 'react';
import { QrCode, ArrowUp, ExternalLink } from 'lucide-react';

interface LandingFooterProps {
  onStartGenerating: () => void;
}

export const LandingFooter: React.FC<LandingFooterProps> = ({ onStartGenerating }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-teal-950/60 bg-[#070b0e] py-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-teal-500/10 border border-teal-500/20 text-teal-300 flex items-center justify-center">
            <QrCode className="w-4 h-4" />
          </div>
          <div>
            <p className="font-semibold text-slate-200 text-sm">QR Studio</p>
            <p className="text-[11px] text-slate-400">Minimal Studio &bull; Precision Vectors</p>
          </div>
        </div>

        <div className="text-center sm:text-left">
          <p className="text-slate-400 text-xs sm:text-sm flex items-center justify-center sm:justify-start gap-1.5">
            <span>Made by -</span>
            <a
              href="https://github.com/Viiiiidit"
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-400 hover:text-teal-300 font-medium transition-colors inline-flex items-center gap-1 underline underline-offset-4 decoration-teal-500/50 hover:decoration-teal-300 cursor-pointer"
            >
              <span>Vidit Srivastava</span>
              <ExternalLink className="w-3.5 h-3.5 inline-block" />
            </a>
          </p>
        </div>

        <div className="flex items-center gap-6 text-slate-400">
          <button
            type="button"
            onClick={onStartGenerating}
            className="hover:text-teal-300 transition-colors cursor-pointer"
          >
            Launch Generator
          </button>
          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-1 hover:text-teal-300 transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
