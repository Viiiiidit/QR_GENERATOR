import type { FormState } from '../types';

/**
 * Normalizes a URL by ensuring it has http:// or https:// protocol.
 */
export function normalizeUrl(url: string): string {
  const trimmed = url.trim();
  if (!trimmed) {
    return '';
  }
  if (!/^https?:\/\//i.test(trimmed)) {
    return `https://${trimmed}`;
  }
  return trimmed;
}

/**
 * Validates whether the given string is a valid URL format.
 * Accepts with or without protocol (e.g. "example.com" or "https://example.com").
 */
export function isValidUrl(url: string): boolean {
  const trimmed = url.trim();
  if (!trimmed) {
    return false;
  }
  const normalized = normalizeUrl(trimmed);
  try {
    const parsed = new URL(normalized);
    return (
      (parsed.protocol === 'http:' || parsed.protocol === 'https:') &&
      Boolean(parsed.hostname) &&
      (parsed.hostname === 'localhost' || parsed.hostname.includes('.')) &&
      !parsed.hostname.startsWith('.') &&
      !parsed.hostname.endsWith('.')
    );
  } catch {
    return false;
  }
}

/**
 * Validates whether the given string is a valid email address.
 */
export function isValidEmail(email: string): boolean {
  const trimmed = email.trim();
  if (!trimmed) {
    return false;
  }
  // Standard RFC-compatible email pattern
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  return emailRegex.test(trimmed);
}

/**
 * Validates a phone number with reasonable international tolerance.
 * Accepts optional leading +, digits, spaces, parentheses, hyphens, and dots.
 * Must contain between 7 and 15 digits (ITU-T E.164 recommendation).
 */
export function isValidPhone(phone: string): boolean {
  const trimmed = phone.trim();
  if (!trimmed) {
    return false;
  }
  // Disallow invalid characters
  if (!/^[+]?[\d\s().-]{7,25}$/.test(trimmed)) {
    return false;
  }
  const digits = trimmed.replace(/\D/g, '');
  return digits.length >= 7 && digits.length <= 15;
}

/**
 * Validates Wi-Fi SSID (required, non-empty).
 */
export function isValidWifiSsid(ssid: string): boolean {
  return ssid.trim().length > 0;
}

/**
 * Validates Plain Text (required, non-empty).
 */
export function isValidText(text: string): boolean {
  return text.trim().length > 0;
}

export interface FormValidationResult {
  isValid: boolean;
  error?: string;
}

/**
 * Checks validity for the active QR type.
 */
export function validateActiveType(formState: FormState): FormValidationResult {
  switch (formState.type) {
    case 'url': {
      if (!formState.url.trim()) {
        return { isValid: false, error: 'Website URL is required' };
      }
      if (!isValidUrl(formState.url)) {
        return { isValid: false, error: 'Please enter a valid URL (e.g. example.com or https://...)' };
      }
      return { isValid: true };
    }
    case 'email': {
      if (!formState.email.to.trim()) {
        return { isValid: false, error: 'Recipient email address is required' };
      }
      if (!isValidEmail(formState.email.to)) {
        return { isValid: false, error: 'Please enter a valid email address (e.g. name@domain.com)' };
      }
      return { isValid: true };
    }
    case 'phone': {
      if (!formState.phone.trim()) {
        return { isValid: false, error: 'Phone number is required' };
      }
      if (!isValidPhone(formState.phone)) {
        return { isValid: false, error: 'Please enter a valid phone number (at least 7 digits, e.g. +1 555-123-4567)' };
      }
      return { isValid: true };
    }
    case 'wifi': {
      if (!isValidWifiSsid(formState.wifi.ssid)) {
        return { isValid: false, error: 'Network SSID is required' };
      }
      return { isValid: true };
    }
    case 'text': {
      if (!isValidText(formState.text)) {
        return { isValid: false, error: 'Text content is required' };
      }
      return { isValid: true };
    }
    default:
      return { isValid: false, error: 'Unknown QR type' };
  }
}
