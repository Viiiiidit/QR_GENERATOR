import React from 'react';
import { Sliders, Eye, History, CheckCircle2, ShieldCheck, Sparkles, Download } from 'lucide-react';

export const FeaturesSection: React.FC = () => {
  return (
    <section id="features" className="py-24 sm:py-32 bg-[#090d11] relative overflow-hidden border-t border-teal-950/40">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-[radial-gradient(ellipse_at_top,rgba(13,148,136,0.1),transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header: Eyebrow + Bold 2-Line Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-950/60 border border-teal-800/40 text-teal-400 text-xs font-semibold tracking-wider uppercase mb-4">
            <Sparkles className="w-3 h-3" />
            <span>Introducing QR Studio</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-100 leading-tight">
            Design without boundaries.
            <span className="block text-slate-400 font-normal mt-1.5">
              Engineered for faultless optical performance.
            </span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-400 leading-relaxed max-w-xl mx-auto">
            Every element is carefully balanced between striking visual expression and technical compliance with global barcode standards.
          </p>
        </div>

        {/* 3-Card Grid */}
        <div id="features-card-grid" className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Card 1: Customization Panel */}
          <div data-feature-card="true" className="feature-card group rounded-3xl bg-[#0d151a]/85 border border-teal-950/60 p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:border-teal-500/40 hover:shadow-[0_0_30px_rgba(20,184,166,0.12)] hover:-translate-y-1">
            {/* Visual / Screenshot Mockup */}
            <div className="w-full h-56 rounded-2xl bg-[#090e12] border border-teal-950/80 p-4 flex flex-col justify-between overflow-hidden shadow-inner relative group-hover:border-teal-800/60 transition-colors">
              <div className="flex items-center justify-between pb-3 border-b border-teal-950/80">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-teal-500/20 text-teal-400 flex items-center justify-center">
                    <Sliders className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-semibold text-slate-200">Customization Controls</span>
                </div>
                <span className="text-[10px] text-teal-400 bg-teal-950 px-2 py-0.5 rounded border border-teal-900/50">
                  Real-time
                </span>
              </div>

              {/* Mock Sliders and Color Controls */}
              <div className="space-y-3 my-auto">
                <div>
                  <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                    <span>Dimension</span>
                    <span className="font-mono text-teal-300">320px</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-800 rounded-full relative overflow-hidden">
                    <div className="w-2/3 h-full bg-gradient-to-r from-teal-500 to-emerald-400 rounded-full" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <div className="p-2 rounded-lg bg-slate-900/90 border border-slate-800 flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-[#0284c7] shrink-0 border border-white/20" />
                    <span className="font-mono text-[10px] text-slate-300">#0284C7</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-900/90 border border-slate-800 flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-[#ffffff] shrink-0 border border-slate-700" />
                    <span className="font-mono text-[10px] text-slate-300">#FFFFFF</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                    <span>Quiet Zone</span>
                    <span className="font-mono text-teal-300">14px</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-800 rounded-full relative overflow-hidden">
                    <div className="w-1/3 h-full bg-teal-500 rounded-full" />
                  </div>
                </div>
              </div>
            </div>

            {/* Caption */}
            <div className="mt-6">
              <h3 className="text-base font-semibold text-slate-100 flex items-center gap-2">
                Granular Aesthetic Control
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-400 leading-relaxed">
                Fine-tune module geometry, margin quiet zones, error tolerance (L–H), and curated presets with zero debounce lag.
              </p>
            </div>
          </div>

          {/* Card 2: Live Preview */}
          <div data-feature-card="true" className="feature-card group rounded-3xl bg-[#0d151a]/85 border border-teal-950/60 p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:border-teal-500/40 hover:shadow-[0_0_30px_rgba(20,184,166,0.12)] hover:-translate-y-1">
            {/* Visual / Screenshot Mockup */}
            <div className="w-full h-56 rounded-2xl bg-[#090e12] border border-teal-950/80 p-4 flex flex-col items-center justify-between overflow-hidden shadow-inner relative group-hover:border-teal-800/60 transition-colors">
              <div className="w-full flex items-center justify-between pb-2 border-b border-teal-950/80">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <Eye className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-semibold text-slate-200">Live Preview &amp; Audit</span>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-950/70 border border-emerald-900/50 px-2 py-0.5 rounded">
                  <ShieldCheck className="w-3 h-3" />
                  <span>18.2:1 Ratio</span>
                </div>
              </div>

              {/* Mock QR SVG Graphic */}
              <div className="my-auto p-2 bg-white rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.08)]">
                <div className="w-20 h-20 grid grid-cols-4 gap-1 p-1 bg-white">
                  <div className="bg-slate-900 rounded-sm" />
                  <div className="bg-slate-900 rounded-sm" />
                  <div className="border-2 border-slate-900 rounded-sm p-0.5 flex items-center justify-center">
                    <div className="w-full h-full bg-slate-900" />
                  </div>
                  <div className="bg-slate-900 rounded-sm" />
                  <div className="bg-slate-900 rounded-sm" />
                  <div className="bg-teal-600 rounded-sm" />
                  <div className="bg-slate-900 rounded-sm" />
                  <div className="bg-slate-900 rounded-sm" />
                  <div className="border-2 border-slate-900 rounded-sm p-0.5 flex items-center justify-center">
                    <div className="w-full h-full bg-slate-900" />
                  </div>
                  <div className="bg-slate-900 rounded-sm" />
                  <div className="bg-teal-600 rounded-sm" />
                  <div className="bg-slate-900 rounded-sm" />
                </div>
              </div>

              {/* Mock Download Buttons */}
              <div className="w-full flex items-center gap-2 pt-2">
                <div className="flex-1 py-1 rounded-md bg-teal-500/20 text-teal-300 text-[10px] font-medium text-center border border-teal-500/30 flex items-center justify-center gap-1">
                  <Download className="w-3 h-3" /> PNG Ready
                </div>
                <div className="flex-1 py-1 rounded-md bg-slate-800 text-slate-300 text-[10px] font-medium text-center border border-slate-700">
                  SVG Vector
                </div>
              </div>
            </div>

            {/* Caption */}
            <div className="mt-6">
              <h3 className="text-base font-semibold text-slate-100 flex items-center gap-2">
                Real-Time Optical Intelligence
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-400 leading-relaxed">
                Active WCAG luminance calculation alerts you if contrast dips or margins shrink, guaranteeing seamless camera scans everywhere.
              </p>
            </div>
          </div>

          {/* Card 3: Recent Codes History */}
          <div data-feature-card="true" className="feature-card group rounded-3xl bg-[#0d151a]/85 border border-teal-950/60 p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:border-teal-500/40 hover:shadow-[0_0_30px_rgba(20,184,166,0.12)] hover:-translate-y-1">
            {/* Visual / Screenshot Mockup */}
            <div className="w-full h-56 rounded-2xl bg-[#090e12] border border-teal-950/80 p-4 flex flex-col justify-between overflow-hidden shadow-inner relative group-hover:border-teal-800/60 transition-colors">
              <div className="flex items-center justify-between pb-3 border-b border-teal-950/80">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-purple-500/20 text-purple-400 flex items-center justify-center">
                    <History className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-semibold text-slate-200">Recent Archives</span>
                </div>
                <span className="text-[10px] text-slate-400">10 Preserved</span>
              </div>

              {/* Mock History Chips */}
              <div className="space-y-2 my-auto">
                <div className="p-2 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-md bg-blue-600 flex items-center justify-center text-[10px] text-white font-bold">
                      QR
                    </div>
                    <div>
                      <p className="text-[11px] font-medium text-slate-200">github.com/org</p>
                      <span className="text-[9px] text-blue-400">Website URL</span>
                    </div>
                  </div>
                  <span className="text-[9px] text-slate-500">2m ago</span>
                </div>

                <div className="p-2 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-md bg-amber-600 flex items-center justify-center text-[10px] text-white font-bold">
                      WF
                    </div>
                    <div>
                      <p className="text-[11px] font-medium text-slate-200">Office_Guest_5G</p>
                      <span className="text-[9px] text-amber-400">Wi-Fi Network</span>
                    </div>
                  </div>
                  <span className="text-[9px] text-slate-500">1h ago</span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-[10px] text-teal-400 justify-center pt-2">
                <CheckCircle2 className="w-3 h-3" />
                <span>1-Click Full Configuration Restoration</span>
              </div>
            </div>

            {/* Caption */}
            <div className="mt-6">
              <h3 className="text-base font-semibold text-slate-100 flex items-center gap-2">
                Local-First Style Memory
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-400 leading-relaxed">
                Downloaded QR codes are automatically archived in client storage. Revisit, restore, or modify styles anytime with zero cloud lock-in.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
