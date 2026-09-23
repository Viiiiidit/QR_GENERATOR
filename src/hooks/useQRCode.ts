import { useEffect, useRef, useState } from 'react';
import QRCodeStyling, { type Options } from 'qr-code-styling';

export interface UseQRCodeOptions {
  data: string;
  debounceMs?: number;
  qrOptions?: Partial<Options>;
}

export interface UseQRCodeReturn {
  containerRef: React.RefObject<HTMLDivElement | null>;
  qrCodeRef: React.RefObject<QRCodeStyling | null>;
  hasData: boolean;
  debouncedData: string;
  isDebouncing: boolean;
}

const DEFAULT_QR_OPTIONS: Partial<Options> = {
  width: 260,
  height: 260,
  type: 'svg',
  margin: 12,
  dotsOptions: {
    color: '#0f172a',
    type: 'rounded',
  },
  backgroundOptions: {
    color: '#ffffff',
  },
  cornersSquareOptions: {
    color: '#0f172a',
    type: 'extra-rounded',
  },
  cornersDotOptions: {
    color: '#0f172a',
    type: 'dot',
  },
  qrOptions: {
    errorCorrectionLevel: 'M',
  },
};

export function useQRCode({
  data,
  debounceMs = 300,
  qrOptions,
}: UseQRCodeOptions): UseQRCodeReturn {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const qrCodeRef = useRef<QRCodeStyling | null>(null);
  const [debouncedData, setDebouncedData] = useState<string>(data);

  // Derive whether debouncing is currently pending
  const isDebouncing = data !== debouncedData;

  // Debounce data changes
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedData(data);
    }, debounceMs);

    return () => {
      clearTimeout(handler);
    };
  }, [data, debounceMs]);

  // Create or update QRCodeStyling instance
  useEffect(() => {
    const trimmedData = debouncedData.trim();

    if (!trimmedData) {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
      return;
    }

    const mergedOptions: Options = {
      ...DEFAULT_QR_OPTIONS,
      ...qrOptions,
      data: trimmedData,
    };

    if (!qrCodeRef.current) {
      qrCodeRef.current = new QRCodeStyling(mergedOptions);
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
        qrCodeRef.current.append(containerRef.current);
      }
    } else {
      qrCodeRef.current.update(mergedOptions);
      if (containerRef.current && containerRef.current.children.length === 0) {
        qrCodeRef.current.append(containerRef.current);
      }
    }
  }, [debouncedData, qrOptions]);

  const hasData = Boolean(debouncedData.trim());

  return {
    containerRef,
    qrCodeRef,
    hasData,
    debouncedData,
    isDebouncing,
  };
}
