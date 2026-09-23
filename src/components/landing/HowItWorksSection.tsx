import React from 'react';
import { Type, Palette, ArrowDownToLine, ArrowRight } from 'lucide-react';

interface HowItWorksSectionProps {
  onStartGenerating: () => void;
}

export const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({ onStartGenerating }) => {
  const steps = [
    {
      num: '01',
      icon: Type,
      title: 'Select Destination',
      description:
        'Choose from Website URLs with auto-protocol normalization, Wi-Fi access with secure encryption, pre-filled Emails, Phone calls, or Plain Text.',
    },
    {
      num: '02',
      icon: Palette,
      title: 'Style & Contrast Audit',
      description:
        'Select curated style presets (Ocean, Sunset, Minimal) or tweak module rounding, quiet zones, and color palettes with live WCAG contrast ratio scoring.',
    },
    {
      num: '03',
      icon: ArrowDownToLine,
      title: 'Download Vector Assets',
      description:
        'Export crisp, infinite-resolution SVGs for commercial print runs or pixel-matched PNGs for web and mobile touchpoints in a single click.',
    },
  ];

  return (
    <section id="how-it-works" className="py-24 sm:py-32 bg-[#080d11] relative border-t border-teal-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <span className="text-xs font-semibold text-teal-400 uppercase tracking-wider">
            Effortless Workflow
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-100 mt-2">
            Three intuitive steps to perfection.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-400 leading-relaxed">
            Engineered for high velocity without sacrificing typography or optical rigor.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="relative rounded-3xl bg-[#0c1318]/90 border border-teal-950/60 p-8 flex flex-col justify-between hover:border-teal-500/30 transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="font-mono text-2xl font-bold text-teal-500/40 group-hover:text-teal-400 transition-colors">
                      {step.num}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-500/20 text-teal-300 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-100 mb-2">{step.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-14 text-center">
          <button
            type="button"
            onClick={onStartGenerating}
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-xs font-semibold bg-teal-500/15 text-teal-300 border border-teal-500/30 hover:bg-teal-500/25 transition-all cursor-pointer"
          >
            <span>Try the Generator Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};
