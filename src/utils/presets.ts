import type { Options } from 'qr-code-styling';
import type { QRPreset, QRSettings } from '../types';

export const DEFAULT_QR_SETTINGS: QRSettings = {
  size: 260,
  fgColor: '#000000',
  bgColor: '#ffffff',
  errorCorrectionLevel: 'M',
  margin: 10,
  dotType: 'rounded',
  cornerSquareType: 'extra-rounded',
  cornerDotType: 'dot',
  gradient: null,
};

export const QR_PRESETS: QRPreset[] = [
  {
    id: 'classic',
    label: 'Classic',
    description: 'Black & white with sharp square modules',
    fgColor: '#000000',
    bgColor: '#ffffff',
    dotType: 'square',
    cornerSquareType: 'square',
    cornerDotType: 'square',
    gradient: null,
    swatch: {
      bg: '#ffffff',
      fg: '#000000',
    },
  },
  {
    id: 'rounded',
    label: 'Rounded',
    description: 'Smooth rounded dots with soft corners',
    fgColor: '#000000',
    bgColor: '#ffffff',
    dotType: 'rounded',
    cornerSquareType: 'extra-rounded',
    cornerDotType: 'dot',
    gradient: null,
    swatch: {
      bg: '#ffffff',
      fg: '#000000',
    },
  },
  {
    id: 'ocean',
    label: 'Ocean',
    description: 'Vibrant blue gradient with clean white base',
    fgColor: '#0284c7',
    bgColor: '#ffffff',
    dotType: 'rounded',
    cornerSquareType: 'extra-rounded',
    cornerDotType: 'dot',
    gradient: {
      type: 'linear',
      rotation: 45,
      colorStops: [
        { offset: 0, color: '#0284c7' },
        { offset: 1, color: '#1d4ed8' },
      ],
    },
    swatch: {
      bg: '#ffffff',
      fg: '#0284c7',
      isGradient: true,
      gradientCss: 'linear-gradient(135deg, #0284c7 0%, #1d4ed8 100%)',
    },
  },
  {
    id: 'sunset',
    label: 'Sunset',
    description: 'Warm coral-orange gradient on dark background',
    fgColor: '#f97316',
    bgColor: '#0f172a',
    dotType: 'rounded',
    cornerSquareType: 'extra-rounded',
    cornerDotType: 'dot',
    gradient: {
      type: 'linear',
      rotation: 45,
      colorStops: [
        { offset: 0, color: '#f43f5e' },
        { offset: 1, color: '#fb923c' },
      ],
    },
    swatch: {
      bg: '#0f172a',
      fg: '#f97316',
      isGradient: true,
      gradientCss: 'linear-gradient(135deg, #f43f5e 0%, #fb923c 100%)',
    },
  },
  {
    id: 'minimal',
    label: 'Minimal',
    description: 'Subtle slate gray on cool soft canvas',
    fgColor: '#475569',
    bgColor: '#f1f5f9',
    dotType: 'classy',
    cornerSquareType: 'extra-rounded',
    cornerDotType: 'dot',
    gradient: null,
    swatch: {
      bg: '#f1f5f9',
      fg: '#475569',
    },
  },
];

export function buildQRCodeOptions(settings: QRSettings): Partial<Options> {
  const dotsOptions = settings.gradient
    ? {
        type: settings.dotType,
        gradient: settings.gradient,
        color: undefined,
      }
    : {
        type: settings.dotType,
        color: settings.fgColor,
        gradient: undefined,
      };

  const cornersSquareOptions = settings.gradient
    ? {
        type: settings.cornerSquareType,
        gradient: settings.gradient,
        color: undefined,
      }
    : {
        type: settings.cornerSquareType,
        color: settings.fgColor,
        gradient: undefined,
      };

  const cornersDotOptions = settings.gradient
    ? {
        type: settings.cornerDotType,
        gradient: settings.gradient,
        color: undefined,
      }
    : {
        type: settings.cornerDotType,
        color: settings.fgColor,
        gradient: undefined,
      };

  return {
    width: settings.size,
    height: settings.size,
    margin: settings.margin,
    dotsOptions,
    backgroundOptions: {
      color: settings.bgColor,
      gradient: undefined,
    },
    cornersSquareOptions,
    cornersDotOptions,
    qrOptions: {
      errorCorrectionLevel: settings.errorCorrectionLevel,
    },
  };
}
