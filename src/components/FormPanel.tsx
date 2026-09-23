import React, { useState } from 'react';
import {
  Link as LinkIcon,
  FileText,
  Mail,
  Phone,
  Wifi,
  Eye,
  EyeOff,
  Sliders,
  Lock,
} from 'lucide-react';
import type { FormState, QRType, WifiEncryption } from '../types';

interface FormPanelProps {
  formState: FormState;
  onChange: (updater: (prev: FormState) => FormState) => void;
}

const QR_TYPES: { id: QRType; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'url', label: 'URL', icon: LinkIcon },
  { id: 'text', label: 'Plain Text', icon: FileText },
  { id: 'email', label: 'Email', icon: Mail },
  { id: 'phone', label: 'Phone Number', icon: Phone },
  { id: 'wifi', label: 'Wi-Fi', icon: Wifi },
];

export const FormPanel: React.FC<FormPanelProps> = ({ formState, onChange }) => {
  const [showWifiPassword, setShowWifiPassword] = useState(false);

  const handleTypeChange = (type: QRType) => {
    onChange((prev) => ({ ...prev, type }));
  };

  const handleFieldChange = <K extends keyof FormState>(field: K, value: FormState[K]) => {
    onChange((prev) => ({ ...prev, [field]: value }));
  };

  const handleEmailChange = (field: keyof FormState['email'], value: string) => {
    onChange((prev) => ({
      ...prev,
      email: {
        ...prev.email,
        [field]: value,
      },
    }));
  };

  const handleWifiChange = (field: keyof FormState['wifi'], value: string | WifiEncryption) => {
    onChange((prev) => ({
      ...prev,
      wifi: {
        ...prev.wifi,
        [field]: value,
      },
    }));
  };

  return (
    <section
      aria-label="Configuration Form"
      className="order-2 lg:order-1 w-full lg:w-[40%] flex flex-col"
    >
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs sm:shadow-sm p-6 sm:p-8 flex flex-col min-h-[460px] transition-shadow hover:shadow-md">
        {/* Panel Header */}
        <div className="flex items-center gap-3 pb-5 border-b border-slate-100">
          <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center">
            <Sliders className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-slate-900">QR Details</h2>
            <p className="text-xs text-slate-500">Select type and provide the payload</p>
          </div>
        </div>

        {/* QR Type Selector Tabs */}
        <div className="mt-6">
          <label className="block text-xs font-semibold text-slate-600 mb-2 uppercase tracking-wider">
            QR Code Type
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2" role="tablist" aria-label="QR Type Selector">
            {QR_TYPES.map(({ id, label, icon: Icon }) => {
              const isActive = formState.type === id;
              return (
                <button
                  key={id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  id={`tab-${id}`}
                  onClick={() => handleTypeChange(id)}
                  className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-150 border ${
                    isActive
                      ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Form Fields */}
        <div className="mt-6 pt-6 border-t border-slate-100 flex-1">
          {formState.type === 'url' && (
            <div className="space-y-4">
              <div>
                <label htmlFor="qr-url-input" className="block text-xs font-medium text-slate-700 mb-1.5">
                  Website URL <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <input
                    id="qr-url-input"
                    type="url"
                    value={formState.url}
                    onChange={(e) => handleFieldChange('url', e.target.value)}
                    placeholder="https://example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900 transition-all placeholder:text-slate-400 shadow-2xs"
                  />
                </div>
                <p className="mt-1.5 text-xs text-slate-400">
                  Include <code>https://</code> for best scanning compatibility.
                </p>
              </div>
            </div>
          )}

          {formState.type === 'text' && (
            <div className="space-y-4">
              <div>
                <label htmlFor="qr-text-input" className="block text-xs font-medium text-slate-700 mb-1.5">
                  Plain Text Content <span className="text-rose-500">*</span>
                </label>
                <input
                  id="qr-text-input"
                  type="text"
                  value={formState.text}
                  onChange={(e) => handleFieldChange('text', e.target.value)}
                  placeholder="Enter any text, code, or message..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900 transition-all placeholder:text-slate-400 shadow-2xs"
                />
                <p className="mt-1.5 text-xs text-slate-400">
                  Characters will be directly encoded as-is into the QR code.
                </p>
              </div>
            </div>
          )}

          {formState.type === 'email' && (
            <div className="space-y-4">
              <div>
                <label htmlFor="qr-email-to" className="block text-xs font-medium text-slate-700 mb-1.5">
                  Recipient Email (&quot;To&quot;) <span className="text-rose-500">*</span>
                </label>
                <input
                  id="qr-email-to"
                  type="email"
                  value={formState.email.to}
                  onChange={(e) => handleEmailChange('to', e.target.value)}
                  placeholder="alex@example.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900 transition-all placeholder:text-slate-400 shadow-2xs"
                />
              </div>

              <div>
                <label htmlFor="qr-email-subject" className="block text-xs font-medium text-slate-700 mb-1.5">
                  Subject <span className="text-xs text-slate-400 font-normal">(Optional)</span>
                </label>
                <input
                  id="qr-email-subject"
                  type="text"
                  value={formState.email.subject}
                  onChange={(e) => handleEmailChange('subject', e.target.value)}
                  placeholder="Inquiry / Feedback"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900 transition-all placeholder:text-slate-400 shadow-2xs"
                />
              </div>

              <div>
                <label htmlFor="qr-email-body" className="block text-xs font-medium text-slate-700 mb-1.5">
                  Body Message <span className="text-xs text-slate-400 font-normal">(Optional)</span>
                </label>
                <textarea
                  id="qr-email-body"
                  rows={3}
                  value={formState.email.body}
                  onChange={(e) => handleEmailChange('body', e.target.value)}
                  placeholder="Write your email pre-fill message..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900 transition-all placeholder:text-slate-400 shadow-2xs resize-none"
                />
              </div>
            </div>
          )}

          {formState.type === 'phone' && (
            <div className="space-y-4">
              <div>
                <label htmlFor="qr-phone-input" className="block text-xs font-medium text-slate-700 mb-1.5">
                  Phone Number <span className="text-rose-500">*</span>
                </label>
                <input
                  id="qr-phone-input"
                  type="tel"
                  value={formState.phone}
                  onChange={(e) => handleFieldChange('phone', e.target.value)}
                  placeholder="+1 (555) 234-5678"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900 transition-all placeholder:text-slate-400 shadow-2xs"
                />
                <p className="mt-1.5 text-xs text-slate-400">
                  Include country code (e.g. <code>+1</code>) for international scanning.
                </p>
              </div>
            </div>
          )}

          {formState.type === 'wifi' && (
            <div className="space-y-4">
              <div>
                <label htmlFor="qr-wifi-ssid" className="block text-xs font-medium text-slate-700 mb-1.5">
                  Network SSID <span className="text-rose-500">*</span>
                </label>
                <input
                  id="qr-wifi-ssid"
                  type="text"
                  value={formState.wifi.ssid}
                  onChange={(e) => handleWifiChange('ssid', e.target.value)}
                  placeholder="e.g. Office_Guest_WiFi"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900 transition-all placeholder:text-slate-400 shadow-2xs"
                />
              </div>

              <div>
                <label htmlFor="qr-wifi-encryption" className="block text-xs font-medium text-slate-700 mb-1.5">
                  Encryption Type
                </label>
                <select
                  id="qr-wifi-encryption"
                  value={formState.wifi.encryption}
                  onChange={(e) => handleWifiChange('encryption', e.target.value as WifiEncryption)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900 transition-all shadow-2xs"
                >
                  <option value="WPA">WPA / WPA2 / WPA3</option>
                  <option value="WEP">WEP</option>
                  <option value="nopass">None (Open Network)</option>
                </select>
              </div>

              {formState.wifi.encryption !== 'nopass' && (
                <div>
                  <label htmlFor="qr-wifi-password" className="block text-xs font-medium text-slate-700 mb-1.5">
                    Password <span className="text-xs text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      id="qr-wifi-password"
                      type={showWifiPassword ? 'text' : 'password'}
                      value={formState.wifi.password}
                      onChange={(e) => handleWifiChange('password', e.target.value)}
                      placeholder="Network security key"
                      className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900 transition-all placeholder:text-slate-400 shadow-2xs"
                    />
                    <button
                      type="button"
                      id="toggle-wifi-password"
                      aria-label={showWifiPassword ? 'Hide password' : 'Show password'}
                      onClick={() => setShowWifiPassword(!showWifiPassword)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-700 transition-colors"
                    >
                      {showWifiPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FormPanel;
