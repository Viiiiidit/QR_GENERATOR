import type {
  CornerDotType,
  CornerSquareType,
  DotType,
  ErrorCorrectionLevel,
  Gradient,
} from 'qr-code-styling';

export type QRType = 'url' | 'text' | 'email' | 'phone' | 'wifi';

export type WifiEncryption = 'WPA' | 'WEP' | 'nopass';

export interface EmailData {
  to: string;
  subject: string;
  body: string;
}

export interface WifiData {
  ssid: string;
  password: string;
  encryption: WifiEncryption;
}

export interface FormState {
  type: QRType;
  url: string;
  text: string;
  email: EmailData;
  phone: string;
  wifi: WifiData;
}

export interface QRSettings {
  size: number;
  fgColor: string;
  bgColor: string;
  errorCorrectionLevel: ErrorCorrectionLevel;
  margin: number;
  dotType: DotType;
  cornerSquareType: CornerSquareType;
  cornerDotType: CornerDotType;
  gradient?: Gradient | null;
}

export interface QRPreset {
  id: string;
  label: string;
  description: string;
  fgColor: string;
  bgColor: string;
  dotType: DotType;
  cornerSquareType: CornerSquareType;
  cornerDotType: CornerDotType;
  gradient?: Gradient | null;
  swatch: {
    bg: string;
    fg: string;
    isGradient?: boolean;
    gradientCss?: string;
  };
}
