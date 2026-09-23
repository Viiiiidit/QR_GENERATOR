import React, { useMemo, useState } from 'react';
import { Header, FormPanel, PreviewPanel } from './components';
import { useQRSettings } from './hooks';
import type { FormState } from './types';
import { getQRDataString } from './utils';

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
  const [formState, setFormState] = useState<FormState>(INITIAL_FORM_STATE);

  // Customization and Presets state hook
  const { settings, activePresetId, updateSetting, applyPreset } = useQRSettings();

  // Compute the current QR payload based on the active type and fields
  const qrData = useMemo(() => {
    return getQRDataString(formState);
  }, [formState]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-800">
      <Header />

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
          <PreviewPanel qrData={qrData} type={formState.type} settings={settings} />
        </div>
      </main>

      <footer className="border-t border-slate-200/60 py-4 bg-white/50 text-center text-xs text-slate-400">
        <p>QR Code Generator &bull; Minimal Studio</p>
      </footer>
    </div>
  );
};

export default App;
