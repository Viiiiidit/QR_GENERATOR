// Type definitions for QR Code Generator
export type QRErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';

export interface QRConfig {
  value: string;
  size: number;
  fgColor: string;
  bgColor: string;
  level: QRErrorCorrectionLevel;
  includeMargin: boolean;
}
