import React from 'react';
import { LandingNav } from './LandingNav';
import { HeroSection } from './HeroSection';
import { FeaturesSection } from './FeaturesSection';
import { HowItWorksSection } from './HowItWorksSection';
import { FaqSection } from './FaqSection';
import { LandingFooter } from './LandingFooter';

interface LandingPageProps {
  onStartGenerating: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStartGenerating }) => {
  return (
    <div className="min-h-screen bg-[#090d11] text-slate-100 flex flex-col font-sans selection:bg-teal-500/30 selection:text-teal-200">
      <LandingNav onStartGenerating={onStartGenerating} />
      <main className="flex-1">
        <HeroSection onStartGenerating={onStartGenerating} />
        <FeaturesSection />
        <HowItWorksSection onStartGenerating={onStartGenerating} />
        <FaqSection />
      </main>
      <LandingFooter onStartGenerating={onStartGenerating} />
    </div>
  );
};

export default LandingPage;
