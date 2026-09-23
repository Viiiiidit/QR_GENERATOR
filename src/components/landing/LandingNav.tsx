import React, { useState } from 'react';
import { QrCode, ArrowRight, Menu, X } from 'lucide-react';

interface LandingNavProps {
  onStartGenerating: () => void;
}

export const LandingNav: React.FC<LandingNavProps> = ({ onStartGenerating }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-teal-950/40 bg-[#090d11]/85 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Logo / Wordmark */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500/20 to-emerald-500/10 border border-teal-500/30 flex items-center justify-center text-teal-300 shadow-[0_0_15px_rgba(20,184,166,0.15)]">
            <QrCode className="w-5 h-5 stroke-[2]" />
          </div>
          <div>
            <span className="text-lg font-bold tracking-tight text-slate-100 flex items-center gap-1.5 font-sans">
              QR Studio
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
            </span>
            <p className="text-[10px] text-slate-400 font-medium tracking-wide uppercase">
              Precision Generator
            </p>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <button
            type="button"
            onClick={() => scrollToSection('features')}
            className="hover:text-teal-300 transition-colors cursor-pointer"
          >
            Features
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('how-it-works')}
            className="hover:text-teal-300 transition-colors cursor-pointer"
          >
            How it works
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('faq')}
            className="hover:text-teal-300 transition-colors cursor-pointer"
          >
            FAQ
          </button>
        </nav>

        {/* Right CTA Button */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            type="button"
            onClick={onStartGenerating}
            className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold bg-teal-500/10 hover:bg-teal-500/20 text-teal-300 border border-teal-500/30 hover:border-teal-500/50 shadow-[0_0_15px_rgba(20,184,166,0.1)] hover:shadow-[0_0_20px_rgba(20,184,166,0.2)] transition-all cursor-pointer"
          >
            <span>Get Started</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Mobile menu toggle */}
        <div className="md:hidden flex items-center gap-2">
          <button
            type="button"
            onClick={onStartGenerating}
            className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-teal-500/20 text-teal-300 border border-teal-500/30"
          >
            Open App
          </button>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="p-2 text-slate-400 hover:text-slate-200"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-teal-950/60 bg-[#090d11]/95 px-4 pt-3 pb-5 space-y-3">
          <button
            type="button"
            onClick={() => scrollToSection('features')}
            className="block w-full text-left py-2 text-sm font-medium text-slate-300 hover:text-teal-300"
          >
            Features
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('how-it-works')}
            className="block w-full text-left py-2 text-sm font-medium text-slate-300 hover:text-teal-300"
          >
            How it works
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('faq')}
            className="block w-full text-left py-2 text-sm font-medium text-slate-300 hover:text-teal-300"
          >
            FAQ
          </button>
          <button
            type="button"
            onClick={onStartGenerating}
            className="w-full mt-2 py-2.5 rounded-full text-center text-xs font-semibold bg-gradient-to-r from-teal-400 to-emerald-400 text-slate-950 shadow-md"
          >
            Start Generating Now
          </button>
        </div>
      )}
    </header>
  );
};
