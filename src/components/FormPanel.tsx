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
  Palette,
  Sparkles,
  HelpCircle,
} from 'lucide-react';
import type { ErrorCorrectionLevel } from 'qr-code-styling';
import type { FormState, QRPreset, QRSettings, QRType, WifiEncryption } from '../types';
import { QR_PRESETS } from '../utils';

interface FormPanelProps {
  formState: FormState;
  onChange: (updater: (prev: FormState) => FormState) => void;
  settings: QRSettings;
  activePresetId: string | null;
  onUpdateSetting: <K extends keyof QRSettings>(key: K, value: QRSettings[K]) => void;
  onApplyPreset: (preset: QRPreset) => void;
}

const QR_TYPES: { id: QRType; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'url', label: 'URL', icon: LinkIcon },
  { id: 'text', label: 'Plain Text', icon: FileText },
  { id: 'email', label: 'Email', icon: Mail },
  { id: 'phone', label: 'Phone Number', icon: Phone },
  { id: 'wifi', label: 'Wi-Fi', icon: Wifi },
];

export const FormPanel: React.FC<FormPanelProps> = ({
  formState,
  onChange,
  settings,
  activePresetId,
  onUpdateSetting,
  onApplyPreset,
}) => {
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
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs sm:shadow-sm p-6 sm:p-7 flex flex-col gap-7 transition-shadow hover:shadow-md">
        {/* Panel Header */}
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
          <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center">
            <Sliders className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-slate-900">QR Details</h2>
            <p className="text-xs text-slate-500">Select type, customize style, and preview</p>
          </div>
        </div>

        {/* Section 1: QR Type Selector */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-2 uppercase tracking-wider">
            1. QR Code Type
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

          {/* Dynamic Form Inputs */}
          <div className="mt-4 pt-4 border-t border-slate-100">
            {formState.type === 'url' && (
              <div className="space-y-4">
                <div>
                  <label htmlFor="qr-url-input" className="block text-xs font-medium text-slate-700 mb-1.5">
                    Website URL <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="qr-url-input"
                    type="url"
                    value={formState.url}
                    onChange={(e) => handleFieldChange('url', e.target.value)}
                    placeholder="https://example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900 transition-all placeholder:text-slate-400 shadow-2xs"
                  />
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
                    Include country code (e.g. <code>+1</code>) for international dialing.
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

        {/* Section 2: Presets Row (above Customize) */}
        <div className="pt-2 border-t border-slate-100">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                2. Style Presets
              </label>
            </div>
            <span className="text-[11px] text-slate-400">Click to apply style</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2" role="region" aria-label="Style Presets">
            {QR_PRESETS.map((preset) => {
              const isSelected = activePresetId === preset.id;
              return (
                <button
                  key={preset.id}
                  type="button"
                  id={`preset-${preset.id}`}
                  onClick={() => onApplyPreset(preset)}
                  title={preset.description}
                  className={`flex flex-col items-center gap-1.5 p-2 rounded-xl border text-center transition-all duration-150 group ${
                    isSelected
                      ? 'border-slate-900 bg-slate-900/5 ring-1.5 ring-slate-900 shadow-xs'
                      : 'border-slate-200 bg-slate-50/70 hover:bg-slate-100/80 hover:border-slate-300'
                  }`}
                >
                  {/* Visual Swatch */}
                  <div
                    className="w-8 h-8 rounded-lg border border-slate-300/80 flex items-center justify-center p-1 shadow-2xs group-hover:scale-105 transition-transform"
                    style={{ backgroundColor: preset.swatch.bg }}
                  >
                    <div
                      className="w-full h-full rounded-xs flex items-center justify-center"
                      style={
                        preset.swatch.isGradient && preset.swatch.gradientCss
                          ? { background: preset.swatch.gradientCss }
                          : { backgroundColor: preset.swatch.fg }
                      }
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-white/70" />
                    </div>
                  </div>
                  <span
                    className={`text-[11px] font-medium leading-tight truncate w-full ${
                      isSelected ? 'text-slate-900 font-semibold' : 'text-slate-600'
                    }`}
                  >
                    {preset.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 3: Customize Section */}
        <div className="pt-2 border-t border-slate-100">
          <div className="flex items-center gap-2 mb-4">
            <Palette className="w-3.5 h-3.5 text-indigo-600" />
            <h3 className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
              3. Customize
            </h3>
          </div>

          <div className="space-y-4">
            {/* Size Slider: 150 - 500px */}
            <div>
              <div className="flex items-center justify-between text-xs font-medium text-slate-700 mb-1.5">
                <label htmlFor="qr-size-slider">Size</label>
                <span className="font-mono text-xs font-semibold text-slate-900 bg-slate-100 px-2 py-0.5 rounded-md">
                  {settings.size}px
                </span>
              </div>
              <input
                id="qr-size-slider"
                type="range"
                min="150"
                max="500"
                step="10"
                value={settings.size}
                onChange={(e) => onUpdateSetting('size', Number(e.target.value))}
                className="w-full accent-slate-900 cursor-pointer h-2 bg-slate-200 rounded-lg appearance-none"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>150px</span>
                <span>500px</span>
              </div>
            </div>

            {/* Colors: Foreground & Background Color Pickers */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Foreground Color */}
              <div>
                <label htmlFor="qr-fg-color-picker" className="block text-xs font-medium text-slate-700 mb-1.5">
                  Foreground Color
                </label>
                <div className="flex items-center gap-2">
                  <input
                    id="qr-fg-color-picker"
                    type="color"
                    value={settings.fgColor}
                    onChange={(e) => onUpdateSetting('fgColor', e.target.value)}
                    className="w-9 h-9 rounded-xl border border-slate-300 p-0.5 cursor-pointer bg-white shrink-0 shadow-2xs"
                  />
                  <input
                    id="qr-fg-color-text"
                    type="text"
                    value={settings.fgColor}
                    onChange={(e) => onUpdateSetting('fgColor', e.target.value)}
                    className="w-full px-2.5 py-1.5 font-mono text-xs text-slate-800 border border-slate-300 rounded-xl bg-white focus:outline-none focus:ring-1 focus:ring-slate-900 shadow-2xs"
                  />
                </div>
              </div>

              {/* Background Color */}
              <div>
                <label htmlFor="qr-bg-color-picker" className="block text-xs font-medium text-slate-700 mb-1.5">
                  Background Color
                </label>
                <div className="flex items-center gap-2">
                  <input
                    id="qr-bg-color-picker"
                    type="color"
                    value={settings.bgColor}
                    onChange={(e) => onUpdateSetting('bgColor', e.target.value)}
                    className="w-9 h-9 rounded-xl border border-slate-300 p-0.5 cursor-pointer bg-white shrink-0 shadow-2xs"
                  />
                  <input
                    id="qr-bg-color-text"
                    type="text"
                    value={settings.bgColor}
                    onChange={(e) => onUpdateSetting('bgColor', e.target.value)}
                    className="w-full px-2.5 py-1.5 font-mono text-xs text-slate-800 border border-slate-300 rounded-xl bg-white focus:outline-none focus:ring-1 focus:ring-slate-900 shadow-2xs"
                  />
                </div>
              </div>
            </div>

            {/* Error Correction Level Dropdown with Tooltip */}
            <div>
              <div className="flex items-center justify-between text-xs font-medium text-slate-700 mb-1.5">
                <div className="flex items-center gap-1.5">
                  <label htmlFor="qr-ecc-dropdown">Error Correction Level</label>
                  {/* Tooltip trigger */}
                  <div className="relative inline-flex items-center group">
                    <button
                      type="button"
                      id="qr-ecc-info-btn"
                      aria-label="Error Correction Level Details"
                      className="text-slate-400 hover:text-slate-600 focus:outline-none"
                    >
                      <HelpCircle className="w-3.5 h-3.5" />
                    </button>
                    {/* Tooltip Popover */}
                    <div
                      role="tooltip"
                      className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 p-3 bg-slate-900 text-white text-xs rounded-xl shadow-xl pointer-events-none opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity z-50"
                    >
                      <p className="font-semibold text-slate-100 mb-1">What is Error Correction?</p>
                      <p className="text-slate-300 leading-relaxed text-[11px]">
                        Enables the QR code to be scanned even if partially damaged, dirty, or obscured. Higher levels add redundant data modules.
                      </p>
                      <div className="mt-2 space-y-1 text-[10px] text-slate-400 border-t border-slate-700/80 pt-1.5">
                        <div><strong className="text-slate-200">L (Low):</strong> ~7% damage recovery</div>
                        <div><strong className="text-slate-200">M (Medium):</strong> ~15% recovery (recommended balance)</div>
                        <div><strong className="text-slate-200">Q (Quartile):</strong> ~25% recovery (good for print)</div>
                        <div><strong className="text-slate-200">H (High):</strong> ~30% recovery (maximum durability)</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <select
                id="qr-ecc-dropdown"
                value={settings.errorCorrectionLevel}
                onChange={(e) => onUpdateSetting('errorCorrectionLevel', e.target.value as ErrorCorrectionLevel)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900 transition-all shadow-2xs"
              >
                <option value="L">L — Low (~7% recovery)</option>
                <option value="M">M — Medium (~15% recovery, recommended)</option>
                <option value="Q">Q — Quartile (~25% recovery)</option>
                <option value="H">H — High (~30% recovery, maximum protection)</option>
              </select>
            </div>

            {/* Margin Slider: 0 - 40px */}
            <div>
              <div className="flex items-center justify-between text-xs font-medium text-slate-700 mb-1.5">
                <label htmlFor="qr-margin-slider">Margin (Quiet Zone)</label>
                <span className="font-mono text-xs font-semibold text-slate-900 bg-slate-100 px-2 py-0.5 rounded-md">
                  {settings.margin}px
                </span>
              </div>
              <input
                id="qr-margin-slider"
                type="range"
                min="0"
                max="40"
                step="2"
                value={settings.margin}
                onChange={(e) => onUpdateSetting('margin', Number(e.target.value))}
                className="w-full accent-slate-900 cursor-pointer h-2 bg-slate-200 rounded-lg appearance-none"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>0px</span>
                <span>40px</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FormPanel;
