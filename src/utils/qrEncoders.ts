import type { EmailData, FormState, WifiData } from '../types';
import { normalizeUrl } from './validation';

/**
 * Converts a URL string to QR-encodable format (normalized with protocol).
 */
export function encodeUrl(url: string): string {
  const trimmed = url.trim();
  if (!trimmed) {
    return '';
  }
  return normalizeUrl(trimmed);
}

/**
 * Converts plain text to QR-encodable format (passed through as-is).
 */
export function encodeText(text: string): string {
  return text;
}

/**
 * Converts email fields to standard mailto format:
 * mailto:address?subject=...&body=...
 */
export function encodeEmail(email: EmailData): string {
  const to = email.to.trim();
  if (!to) {
    return '';
  }

  const queryParams: string[] = [];
  if (email.subject) {
    queryParams.push(`subject=${encodeURIComponent(email.subject)}`);
  }
  if (email.body) {
    queryParams.push(`body=${encodeURIComponent(email.body)}`);
  }

  const queryString = queryParams.length > 0 ? `?${queryParams.join('&')}` : '';
  return `mailto:${to}${queryString}`;
}

/**
 * Converts phone number to standard tel format:
 * tel:number
 */
export function encodePhone(phone: string): string {
  const trimmed = phone.trim();
  if (!trimmed) {
    return '';
  }
  return `tel:${trimmed}`;
}

/**
 * Converts Wi-Fi credentials to standard format:
 * WIFI:T:<enc>;S:<ssid>;P:<password>;;
 */
export function encodeWifi(wifi: WifiData): string {
  const ssid = wifi.ssid.trim();
  if (!ssid) {
    return '';
  }
  const enc = wifi.encryption || 'WPA';
  const password = wifi.password || '';
  return `WIFI:T:${enc};S:${ssid};P:${password};;`;
}

/**
 * Generates the QR payload string from the active form state.
 * Returns an empty string if essential fields for the active type are missing.
 */
export function getQRDataString(formState: FormState): string {
  switch (formState.type) {
    case 'url':
      return encodeUrl(formState.url);
    case 'text':
      return encodeText(formState.text);
    case 'email':
      return encodeEmail(formState.email);
    case 'phone':
      return encodePhone(formState.phone);
    case 'wifi':
      return encodeWifi(formState.wifi);
    default:
      return '';
  }
}
