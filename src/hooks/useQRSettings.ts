import { useState, useCallback } from 'react';
import type { QRPreset, QRSettings } from '../types';
import { DEFAULT_QR_SETTINGS, QR_PRESETS } from '../utils';

export interface UseQRSettingsReturn {
  settings: QRSettings;
  activePresetId: string | null;
  updateSetting: <K extends keyof QRSettings>(key: K, value: QRSettings[K]) => void;
  applyPreset: (preset: QRPreset) => void;
  resetSettings: () => void;
}

export function useQRSettings(
  initialSettings: QRSettings = DEFAULT_QR_SETTINGS,
  initialPresetId: string | null = 'rounded'
): UseQRSettingsReturn {
  const [settings, setSettings] = useState<QRSettings>(() => {
    // If an initial preset is provided, apply its styling
    if (initialPresetId) {
      const preset = QR_PRESETS.find((p) => p.id === initialPresetId);
      if (preset) {
        return {
          ...initialSettings,
          fgColor: preset.fgColor,
          bgColor: preset.bgColor,
          dotType: preset.dotType,
          cornerSquareType: preset.cornerSquareType,
          cornerDotType: preset.cornerDotType,
          gradient: preset.gradient ?? null,
        };
      }
    }
    return initialSettings;
  });

  const [activePresetId, setActivePresetId] = useState<string | null>(initialPresetId);

  const updateSetting = useCallback(
    <K extends keyof QRSettings>(key: K, value: QRSettings[K]) => {
      setSettings((prev) => {
        const next = { ...prev, [key]: value };
        // If the user manually changes fgColor, remove any preset gradient so the solid color takes effect
        if (key === 'fgColor') {
          next.gradient = null;
        }
        return next;
      });
      setActivePresetId(null);
    },
    []
  );

  const applyPreset = useCallback((preset: QRPreset) => {
    setSettings((prev) => ({
      ...prev,
      fgColor: preset.fgColor,
      bgColor: preset.bgColor,
      dotType: preset.dotType,
      cornerSquareType: preset.cornerSquareType,
      cornerDotType: preset.cornerDotType,
      gradient: preset.gradient ?? null,
    }));
    setActivePresetId(preset.id);
  }, []);

  const resetSettings = useCallback(() => {
    setSettings(DEFAULT_QR_SETTINGS);
    setActivePresetId(null);
  }, []);

  return {
    settings,
    activePresetId,
    updateSetting,
    applyPreset,
    resetSettings,
  };
}
