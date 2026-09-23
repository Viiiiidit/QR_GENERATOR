import { useState, useCallback, useEffect } from 'react';
import type { FormState, QRSettings, RecentQRCode } from '../types';

const STORAGE_KEY = 'qr_generator_recent_codes_v1';
const MAX_RECENT_ITEMS = 10;

/**
 * Safely reads and validates stored recent QR codes from localStorage.
 */
function loadRecentCodes(): RecentQRCode[] {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return [];
    }
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }

    // Filter and sanitize entries to handle potential corrupted data
    return parsed
      .filter((item): item is RecentQRCode => {
        return (
          item &&
          typeof item === 'object' &&
          typeof item.id === 'string' &&
          typeof item.label === 'string' &&
          typeof item.type === 'string' &&
          typeof item.timestamp === 'number' &&
          Boolean(item.formState) &&
          Boolean(item.settings)
        );
      })
      .slice(0, MAX_RECENT_ITEMS);
  } catch (err) {
    console.warn('Could not read recent QR codes from localStorage:', err);
    return [];
  }
}

/**
 * Safely persists recent QR codes to localStorage.
 */
function saveRecentCodes(items: RecentQRCode[]): void {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items.slice(0, MAX_RECENT_ITEMS)));
    }
  } catch (err) {
    console.warn('Could not save recent QR codes to localStorage:', err);
  }
}

/**
 * Generates a concise display label for a given configuration.
 */
export function generateRecentLabel(formState: FormState): string {
  switch (formState.type) {
    case 'url':
      return formState.url.trim() || 'Untitled Link';
    case 'email':
      return formState.email.to.trim() || 'Untitled Email';
    case 'phone':
      return formState.phone.trim() || 'Untitled Phone';
    case 'wifi':
      return formState.wifi.ssid.trim() || 'Untitled Wi-Fi';
    case 'text': {
      const text = formState.text.trim();
      if (!text) return 'Untitled Text';
      return text.length > 25 ? `${text.slice(0, 22)}...` : text;
    }
    default:
      return 'QR Code';
  }
}

export function useRecentQRCodes() {
  const [recentCodes, setRecentCodes] = useState<RecentQRCode[]>(() => loadRecentCodes());

  // Keep state synced in case storage is updated
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        setRecentCodes(loadRecentCodes());
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const addRecentCode = useCallback((formState: FormState, settings: QRSettings) => {
    const label = generateRecentLabel(formState);
    const newEntry: RecentQRCode = {
      id: `recent-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      timestamp: Date.now(),
      label,
      type: formState.type,
      formState: JSON.parse(JSON.stringify(formState)),
      settings: JSON.parse(JSON.stringify(settings)),
    };

    setRecentCodes((prev) => {
      // Remove any duplicate that has the exact same payload label and type
      const filtered = prev.filter(
        (item) => !(item.type === newEntry.type && item.label === newEntry.label)
      );
      const updated = [newEntry, ...filtered].slice(0, MAX_RECENT_ITEMS);
      saveRecentCodes(updated);
      return updated;
    });
  }, []);

  const clearRecentCodes = useCallback(() => {
    setRecentCodes([]);
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.removeItem(STORAGE_KEY);
      }
    } catch (err) {
      console.warn('Could not clear recent QR codes from localStorage:', err);
    }
  }, []);

  return {
    recentCodes,
    addRecentCode,
    clearRecentCodes,
  };
}
