import React from 'react';
import { Header, FormPanel, PreviewPanel } from './components';

export const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-800">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Responsive two-panel layout:
            - Desktop: Form on the left (~40%), Preview on the right (~60%)
            - Mobile: Stacked vertically with Preview above Form via flex ordering
        */}
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          <FormPanel />
          <PreviewPanel />
        </div>
      </main>

      <footer className="border-t border-slate-200/60 py-4 bg-white/50 text-center text-xs text-slate-400">
        <p>QR Code Generator &bull; Minimal Studio</p>
      </footer>
    </div>
  );
};

export default App;
