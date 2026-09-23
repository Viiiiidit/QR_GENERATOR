import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Do generated QR codes ever expire or require a subscription?',
      a: 'No. QR Studio creates standard, static ISO-compliant QR codes. The encoded data is written directly into the binary pattern of the matrix, meaning they will function permanently with zero hosting or server dependencies.',
    },
    {
      q: 'When should I download SVG vs PNG?',
      a: 'Use SVG (Scalable Vector Graphics) for high-end print collateral, packaging, signage, and billboards where infinite resolution without pixelation is essential. Use PNG for digital graphics, email footers, and website embeds.',
    },
    {
      q: 'How does the scannability contrast ratio check work?',
      a: 'Our engine applies the WCAG 2.1 relative luminance algorithm to dynamically calculate the contrast ratio between your chosen foreground and background colors. If the ratio drops below 3.5:1, an advisory alert appears recommending higher contrast to guarantee camera recognition.',
    },
    {
      q: 'Is my data or Wi-Fi password sent to any remote server?',
      a: 'Never. All encoding, styling, rendering, and file generation occurs 100% locally in your web browser. Nothing leaves your device.',
    },
  ];

  return (
    <section id="faq" className="py-24 sm:py-32 bg-[#090d11] relative border-t border-teal-950/40">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-14">
          <span className="text-xs font-semibold text-teal-400 uppercase tracking-wider">
            Frequently Asked Questions
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-100 mt-2">
            Clarity on every detail.
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.q}
                className="rounded-2xl bg-[#0c1419]/90 border border-teal-950/70 overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left text-sm sm:text-base font-semibold text-slate-200 hover:text-teal-300 transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-teal-400 shrink-0 ml-4 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-400 leading-relaxed border-t border-teal-950/40 animate-in fade-in duration-200">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
