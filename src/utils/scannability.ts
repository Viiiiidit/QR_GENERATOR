import type { QRSettings } from '../types';

export interface ScannabilityWarning {
  id: 'contrast' | 'ecc-risky' | 'margin';
  title: string;
  issue: string;
  suggestion: string;
}

/**
 * Converts 3 or 6 hex digits to [r, g, b].
 */
export function hexToRgb(hex: string): [number, number, number] | null {
  let clean = hex.replace(/^#/, '').trim();
  if (clean.length === 3) {
    clean = clean
      .split('')
      .map((c) => c + c)
      .join('');
  }
  if (clean.length !== 6) {
    return null;
  }
  const num = parseInt(clean, 16);
  if (isNaN(num)) {
    return null;
  }
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

/**
 * Calculates relative luminance following WCAG 2.1 specs.
 */
export function getRelativeLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Computes contrast ratio between two hex colors (1:1 to 21:1).
 */
export function getContrastRatio(hex1: string, hex2: string): number {
  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);
  if (!rgb1 || !rgb2) {
    return 21;
  }
  const l1 = getRelativeLuminance(...rgb1);
  const l2 = getRelativeLuminance(...rgb2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Analyzes QR settings for potential scannability hazards.
 */
export function checkScannabilityWarnings(settings: QRSettings): ScannabilityWarning[] {
  const warnings: ScannabilityWarning[] = [];

  // 1. Contrast ratio check (don't hardcode colors)
  let minContrast = getContrastRatio(settings.fgColor, settings.bgColor);
  if (settings.gradient?.colorStops && settings.gradient.colorStops.length > 0) {
    const gradientRatios = settings.gradient.colorStops.map((stop) =>
      getContrastRatio(stop.color, settings.bgColor)
    );
    minContrast = Math.min(...gradientRatios);
  }

  const isLowContrast = minContrast < 3.5;
  if (isLowContrast) {
    warnings.push({
      id: 'contrast',
      title: 'Low Color Contrast',
      issue: `Contrast ratio is only ${minContrast.toFixed(1)}:1 (recommended ≥ 4.5:1). Optical sensors and phone cameras may struggle to distinguish dots from the background.`,
      suggestion: 'Increase contrast by choosing a darker foreground or lighter background.',
    });
  }

  // 2. Margin below ~10px
  const isTightMargin = settings.margin < 10;
  if (isTightMargin) {
    warnings.push({
      id: 'margin',
      title: 'Insufficient Quiet Zone (Margin)',
      issue: `Quiet zone is ${settings.margin}px (recommended ≥ 10px). Many standard QR scanners require empty border space to detect positional markers.`,
      suggestion: 'Increase margin slider to at least 10px.',
    });
  }

  // 3. Error correction level set to L combined with other risky settings
  if (settings.errorCorrectionLevel === 'L') {
    const riskyFactors: string[] = [];
    if (isTightMargin) {
      riskyFactors.push('tight margin (< 10px)');
    }
    if (minContrast < 4.5) {
      riskyFactors.push('sub-optimal contrast (< 4.5:1)');
    }
    if (settings.size < 200) {
      riskyFactors.push('small size (< 200px)');
    }

    if (riskyFactors.length > 0) {
      warnings.push({
        id: 'ecc-risky',
        title: 'Risky Error Correction Level',
        issue: `Error correction is set to Low (L, ~7% data recovery) combined with ${riskyFactors.join(' and ')}. Glare or minor physical wear could prevent scanning.`,
        suggestion: "Switch Error Correction to 'M' (Medium, ~15%) or 'H' (High, ~30%).",
      });
    }
  }

  return warnings;
}
