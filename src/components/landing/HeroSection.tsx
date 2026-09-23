import React from 'react';
import { Sparkles, ArrowRight, ChevronDown, ShieldCheck, Cpu, Download } from 'lucide-react';

interface HeroSectionProps {
  onStartGenerating: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onStartGenerating }) => {
  const scrollToFeatures = () => {
    const el = document.getElementById('features');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[92vh] flex flex-col items-center justify-between overflow-hidden bg-[#090d11]">
      {/* Full-bleed atmospheric background layer */}
      <div className="absolute inset-0 pointer-events-none select-none z-0">
        {/* Deep atmospheric photographic backdrop with misty alpine peaks */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-25 mix-blend-luminosity scale-105"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=2000&q=80")',
          }}
        />

        {/* Multi-stage moody gradient overlays (deep teal-to-black) */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#090d11]/80 via-[#090d11]/90 to-[#090d11]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_-10%,rgba(13,148,136,0.22),rgba(9,13,17,0))]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_40%,rgba(6,78,59,0.18),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_60%,rgba(15,118,110,0.14),transparent_50%)]" />

        {/* Subtle SVG noise / grain texture overlay */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.035] mix-blend-overlay pointer-events-none">
          <filter id="noiseFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-28 pb-16 text-center flex flex-col items-center my-auto">
        {/* Eyebrow Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-950/60 border border-teal-500/25 text-teal-300 text-xs font-medium mb-8 backdrop-blur-sm shadow-[0_0_20px_rgba(20,184,166,0.15)] animate-in fade-in duration-500">
          <Sparkles className="w-3.5 h-3.5 text-teal-400" />
          <span>Next-Generation Vector QR Design</span>
        </div>

        {/* Centered Large 2-Line Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-slate-100 max-w-4xl mx-auto leading-[1.12] sm:leading-[1.14]">
          Identity in every pixel.
          <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-teal-200 via-emerald-300 to-teal-400">
            From destination to scan, crafted beautifully.
          </span>
        </h1>

        {/* Subheadline in muted gray */}
        <p className="mt-6 text-base sm:text-xl text-slate-400 max-w-2xl mx-auto font-normal leading-relaxed">
          Create bespoke QR codes tailored with curated palettes, granular quiet zones, and real-time optical contrast auditing. Built for print, digital campaigns, and discerning brands.
        </p>

        {/* CTA Actions */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          {/* Primary Pill-Shaped CTA Button */}
          <button
            type="button"
            id="hero-cta-btn"
            onClick={onStartGenerating}
            className="w-full sm:w-auto group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full text-base font-semibold bg-gradient-to-r from-teal-400 to-emerald-400 text-slate-950 shadow-[0_0_35px_rgba(45,212,191,0.35)] hover:shadow-[0_0_45px_rgba(45,212,191,0.55)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <span>Start Generating</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform stroke-[2.5]" />
          </button>

          {/* Secondary Action */}
          <button
            type="button"
            onClick={scrollToFeatures}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full text-sm font-medium text-slate-300 hover:text-slate-100 bg-[#0f171d]/80 hover:bg-[#142028] border border-teal-950/70 hover:border-teal-700/40 transition-all cursor-pointer backdrop-blur-sm"
          >
            <span>Explore Capabilities</span>
          </button>
        </div>

        {/* Value Proof Badges */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-teal-400" />
            <span>WCAG 2.1 Contrast Audited</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Download className="w-4 h-4 text-emerald-400" />
            <span>Pixel-Perfect SVG &amp; PNG</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Cpu className="w-4 h-4 text-teal-300" />
            <span>100% Client-Side &amp; Private</span>
          </div>
        </div>
      </div>

      {/* Scroll to explore indicator at the bottom with bounce animation */}
      <div className="relative z-10 pb-8 flex flex-col items-center">
        <button
          type="button"
          onClick={scrollToFeatures}
          className="group flex flex-col items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-teal-300 transition-colors cursor-pointer focus:outline-none"
          aria-label="Scroll down to explore features"
        >
          <span className="tracking-wide">Scroll to explore</span>
          <div className="w-8 h-8 rounded-full border border-teal-900/50 bg-[#0d1419]/70 flex items-center justify-center animate-bounce shadow-xs group-hover:border-teal-500/50">
            <ChevronDown className="w-4 h-4 text-teal-400" />
          </div>
        </button>
      </div>
    </section>
  );
};
