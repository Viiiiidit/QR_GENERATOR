import React, { useMemo, useState, useEffect, useCallback } from 'react';
import { Header, FormPanel, PreviewPanel, RecentQRCodes, LandingPage } from './components';
import { useQRSettings, useRecentQRCodes } from './hooks';
import type { FormState, QRSettings } from './types';
import { getQRDataString, validateActiveType } from './utils';

type Route = 'home' | 'generator';

const INITIAL_FORM_STATE: FormState = {
  type: 'url',
  url: '',
  text: '',
  email: {
    to: '',
    subject: '',
    body: '',
  },
  phone: '',
  wifi: {
    ssid: '',
    password: '',
    encryption: 'WPA',
  },
};

export const App: React.FC = () => {
  // Navigation route: 'home' (Landing Page) or 'generator' (QR Tool)
  const [route, setRoute] = useState<Route>(() => {
    if (typeof window !== 'undefined' && window.location.hash === '#generator') {
      return 'generator';
    }
    return 'home';
  });

  const navigateTo = useCallback((target: Route) => {
    setRoute(target);
    if (typeof window !== 'undefined') {
      window.location.hash = target === 'generator' ? '#generator' : '#home';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  // Sync route with browser hash changes (back/forward button support)
  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === '#generator') {
        setRoute('generator');
      } else if (window.location.hash === '#home' || !window.location.hash) {
        setRoute('home');
      }
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const [formState, setFormState] = useState<FormState>(INITIAL_FORM_STATE);

  // Customization and Presets state hook
  const {
    settings,
    activePresetId,
    updateSetting,
    applyPreset,
    restoreSettings,
  } = useQRSettings();

  // Recent QR codes persistence hook
  const { recentCodes, addRecentCode, clearRecentCodes } = useRecentQRCodes();

  // Validate active type inputs
  const validation = useMemo(() => {
    return validateActiveType(formState);
  }, [formState]);

  // Compute the current QR payload based on the active type and fields
  const qrData = useMemo(() => {
    return getQRDataString(formState);
  }, [formState]);

  // Restore configuration from recent codes
  const handleRestoreConfiguration = (
    savedFormState: FormState,
    savedSettings: QRSettings
  ) => {
    setFormState(savedFormState);
    restoreSettings(savedSettings);
  };

  // If on Home route, show the full Landing Page
  if (route === 'home') {
    return <LandingPage onStartGenerating={() => navigateTo('generator')} />;
  }

  // If on Generator route, show the QR Generator Studio
  return (
    <div className="min-h-screen bg-[#090d11] bg-gradient-to-b from-[#090d11] via-[#0b1318] to-[#090d11] flex flex-col text-slate-100 font-sans selection:bg-teal-500/30 selection:text-teal-200">
      <Header onNavigateHome={() => navigateTo('home')} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Responsive two-panel layout:
            - Desktop: Form on the left (~40%), Preview on the right (~60%)
            - Mobile: Stacked vertically with Preview above Form via flex ordering
        */}
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          <FormPanel
            formState={formState}
            onChange={setFormState}
            settings={settings}
            activePresetId={activePresetId}
            onUpdateSetting={updateSetting}
            onApplyPreset={applyPreset}
          />
          <PreviewPanel
            qrData={qrData}
            type={formState.type}
            settings={settings}
            isValid={validation.isValid}
            onDownloadSuccess={() => addRecentCode(formState, settings)}
          />
        </div>

        {/* Recent QR Codes section */}
        <RecentQRCodes
          recentCodes={recentCodes}
          onSelect={handleRestoreConfiguration}
          onClear={clearRecentCodes}
        />
      </main>

      <footer className="border-t border-teal-950/60 py-5 bg-[#070b0e] text-center text-xs text-slate-400">
        <p>QR Studio &bull; Precision Vector Generator &bull; 100% Client-Side</p>
      </footer>
    </div>
  );
};

export default App;
