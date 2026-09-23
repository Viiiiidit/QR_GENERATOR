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
