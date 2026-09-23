# QR Studio ⚡

> **Identity in every pixel. From destination to scan, crafted beautifully.**

An advanced, privacy-first, aesthetic QR Code generation and optical verification platform. Built with **React 19**, **TypeScript**, **Tailwind CSS v4**, and **Vite**, QR Studio pairs high-end visual design with strict ISO/IEC 18004 optical compliance, real-time WCAG luminance auditing, curated presets, and persistent configuration history.

[![React](https://img.shields.io/badge/React-19.2.8-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.3-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Code Quality](https://img.shields.io/badge/Linter-Oxlint_Passed-success)](https://oxc.rs/)
[![Tests](https://img.shields.io/badge/Automated_Tests-22%2F22_Passed-brightgreen)](./TESTING.md)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

---

## 📑 Table of Contents

- [Vision & Goals](#-vision--goals)
- [Target Roles & Use Cases](#-target-roles--use-cases)
- [Key Features](#-key-features)
- [Visual Direction & Design System](#-visual-direction--design-system)
- [Supported QR Payload Standards](#-supported-qr-payload-standards)
- [Optical Scannability Guard](#-optical-scannability-guard)
- [Project Architecture & File Tree](#-project-architecture--file-tree)
- [Getting Started](#-getting-started)
- [Testing & Quality Assurance](#-testing--quality-assurance)
- [Privacy & Security Blueprint](#-privacy--security-blueprint)
- [License](#-license)

---

## 🎯 Vision & Goals

Standard QR codes are often treated as utilitarian afterthoughts: rigid black-and-white grids with unpredictable scan rates, dubious contrast ratios, and intrusive tracking redirects. **QR Studio** was created to redefine this standard.

### Core Objectives:
1. **Uncompromised Brand Expression**: Provide creators and businesses with granular control over color palettes, module geometries, error correction, and scale without breaking barcode legibility.
2. **Real-Time Optical Intelligence**: Audit foreground-to-background WCAG contrast ratios and margin quiet zones on every keystroke, actively warning against scannability hazards before printing or publishing.
3. **100% Client-Side Privacy**: Zero servers, zero analytics trackers, zero external database dependencies. Every code is synthesized and downloaded locally in the browser.
4. **Seamless Workflow**: Frictionless switching between an atmospheric storytelling landing page and a lightning-fast, zero-debounce dual-panel workstation.

---

## 👥 Target Roles & Use Cases

| Role | Responsibility & Goal | How QR Studio Solves It |
|---|---|---|
| **Brand Designers & Art Directors** | Ensure physical collateral, business cards, and packaging match strict brand style guides. | Curated presets (*Ocean*, *Sunset*, *Minimal*, *Rounded*), custom hex color pickers, and infinite size calibration. |
| **Software & DevOps Engineers** | Generate standard-compliant machine-readable barcodes for Wi-Fi credentials, mailto links, and raw endpoints. | Strict payload encoders for `WIFI:`, `mailto:`, `tel:`, and URL protocol auto-normalization. |
| **Event Producers & Marketers** | Deploy signage, menus, and banners that scan instantly under harsh lighting conditions. | Real-time WCAG relative luminance calculation and minimum quiet-zone warnings prevent scannability degradation. |
| **Privacy-Minded Users** | Share network access, vCards, or sensitive links without leaking telemetry to third-party shortlink servers. | 100% client-side compilation; zero external API requests; local history stored solely in browser `localStorage`. |

---

## 🚀 Key Features

### 1. 🌌 Atmospheric Landing Route (`#home`)
- **Full-bleed Moody Aesthetics**: Deep teal-to-charcoal gradients accented with subtle grain texture and misty mountain silhouettes.
- **Top Brand Navigation**: "QR Studio" wordmark, fast jump anchors (*Features*, *How it works*, *FAQ*), and a pill-shaped action button.
- **Hero & Micro-Interactions**: Custom 2-line headline, muted subheadline, bouncing scroll cue, and a glowing primary CTA routing directly into the generator.
- **Interactive 3-Card Grid**: Real-time mockups showcasing customization controls, optical intelligence, and history preservation.
- **Step-by-step Workflow & Accordion FAQ**: Clarifies durability, vector scalability, scannability math, and offline execution.

### 2. ⚡ 5 Validated QR Encoders
- **Website URL**: Automatic protocol inspection (prepends `https://` when omitted) and RFC-compliant URL syntax validation.
- **Plain Text**: Raw arbitrary strings and UTF-8 data passthrough.
- **Email**: Compliant `mailto:` URI builder with optional recipient, prefilled subject, and body text.
- **Phone Number**: International E.164 and localized digit validation with `tel:` URI creation.
- **Wi-Fi Network**: Seamless generation of `WIFI:T:<enc>;S:<ssid>;P:<password>;;` strings supporting WPA/WPA2, WEP, and unencrypted networks, complete with a show/hide password toggle.

### 3. 🎨 Customization Engine (`useQRSettings`)
- **Dynamic Size Slider**: 150px to 500px on-the-fly rendering.
- **Precision Color Pickers**: Individual foreground and background hex inputs with instant swatch previews.
- **Error Correction Calibration**: 
  - **L (7%)**: Highest data capacity, minimal redundancy.
  - **M (15%)**: Balanced default for general use.
  - **Q (25%)**: Enhanced resilience for industrial or outdoor use.
  - **H (30%)**: Maximum damage recovery, ideal for high-wear physical prints.
- **Quiet Zone (Margin)**: 0px to 40px adjustable safe zone slider.
- **1-Click Presets**:
  - `Classic`: Pure square monochrome (#000000 / #FFFFFF).
  - `Rounded`: Smooth rounded corner dots (#1E293B / #FFFFFF).
  - `Ocean`: Deep cyan/teal palette (#0284C7 / #F0FDF4).
  - `Sunset`: Warm high-contrast dusk palette (#EA580C / #0F172A).
  - `Minimal`: Subtle soft slate aesthetic (#64748B / #F8FAFC).

### 4. 🛡️ Real-Time Optical Scannability Guard
An advisory, non-blocking warning system that monitors parameters dynamically:
- **Low Contrast Detection**: Calculates the WCAG 2.1 contrast ratio between foreground and background. Issues alerts if the ratio falls below 3.0:1.
- **Margin Hazard Detection**: Alerts if quiet zone drops below 10px, risking misreads by phone cameras.
- **High-Risk Combination Alert**: Warns when low margin or low contrast is paired with Error Correction Level **L**.

### 5. 💾 Recent Codes History & Configuration Restore
- Automatically archives the last 10 configurations upon export.
- Stores form types, field payloads, and customization parameters in browser `localStorage`.
- Single-click restoration: clicking any recent card repopulates the entire studio back to that exact state.
- Graceful recovery: includes auto-repair fallbacks for missing or corrupt `localStorage` data.

### 6. 📐 Dual-Format Production Export
- **High-DPI PNG**: Pixel-perfect bitmap snapshot matching the exact live dimensions, colors, and margins.
- **Lossless SVG**: Scalable vector format ready for large-format physical signage, banners, and vector design suites (Figma, Illustrator).
- **Descriptive Naming**: Automatic formatting: `qr-code-<type>-<timestamp>.<ext>`.

---

## 🎨 Visual Direction & Design System

The application employs a curated, unified **Dark Teal / Charcoal** design palette across both the landing page and the functional generator workspace:

```
┌────────────────────────────────────────────────────────┐
│  SURFACE TOKENS                                        │
│  Base Dark:       #080d11 (Deep Charcoal / Black)      │
│  Card Surface:    #0d151a (Misty Teal Charcoal)        │
│  Borders:         teal-950/60 → teal-500/40 (on hover) │
│                                                        │
│  ACCENT TOKENS                                         │
│  Primary Teal:    #14b8a6 (Teal 500)                   │
│  Deep Glow:       rgba(20, 184, 166, 0.15)             │
│  Warning Amber:   #f59e0b (Amber 500 / Amber 950)      │
│                                                        │
│  TYPOGRAPHY                                            │
│  Headings:        #f1f5f9 (Off-white Slate 100)        │
│  Subtitles:       #94a3b8 (Muted Slate 400)            │
│  Labels & Badges: #2dd4bf (Teal 400)                   │
└────────────────────────────────────────────────────────┘
```

---

## 📡 Supported QR Payload Standards

| Type | Encoded Payload Standard | Example Output |
|---|---|---|
| **Website URL** | Normalized URI Scheme (`https://`) | `https://github.com/Viiiiidit/QR_GENERATOR` |
| **Plain Text** | UTF-8 Raw String | `Hello from QR Studio!` |
| **Email** | RFC 6068 Mailto Scheme | `mailto:contact@qrstudio.dev?subject=Inquiry&body=Hi%20there` |
| **Phone** | RFC 3966 Tel URI | `tel:+14155552671` |
| **Wi-Fi** | ZXing Wireless Configuration Standard | `WIFI:T:WPA;S:StudioHQ;P:SecretKey123;;` |

---

## 🔬 Optical Scannability Guard

To guarantee barcodes scan reliably across diverse smartphone optics and lighting, QR Studio implements the official **W3C WCAG 2.1 Relative Luminance Algorithm**:

$$L = 0.2126 \times R_{\text{lin}} + 0.7152 \times G_{\text{lin}} + 0.0722 \times B_{\text{lin}}$$

Where each linearized sRGB channel is calculated as:

$$C_{\text{lin}} = \begin{cases} \frac{C_{\text{srgb}}}{12.92} & \text{if } C_{\text{srgb}} \le 0.04045 \\ \left(\frac{C_{\text{srgb}} + 0.055}{1.055}\right)^{2.4} & \text{otherwise} \end{cases}$$

The contrast ratio between lighter luminance ($L_1$) and darker luminance ($L_2$) is:

$$\text{Contrast Ratio} = \frac{L_1 + 0.05}{L_2 + 0.05}$$

If $\text{Ratio} < 3.0$, QR Studio flags an advisory banner alerting the user to increase foreground/background contrast.

---

## 📂 Project Architecture & File Tree

```
d:/QR Code/
├── src/
│   ├── components/
│   │   ├── landing/                  # Landing page presentation route
│   │   │   ├── HeroSection.tsx       # Moody atmospheric hero & CTAs
│   │   │   ├── FeaturesSection.tsx   # 3-card showcase with UI mockups
│   │   │   ├── HowItWorksSection.tsx # 3-step workflow diagram
│   │   │   ├── FaqSection.tsx        # Collapsible accordion FAQ
│   │   │   ├── LandingNav.tsx        # Sticky minimal header
│   │   │   ├── LandingFooter.tsx     # Footer & back-to-top links
│   │   │   ├── LandingPage.tsx       # Landing route aggregator
│   │   │   └── index.ts
│   │   ├── FormPanel.tsx             # QR type selection & dynamic fields
│   │   ├── PreviewPanel.tsx          # Live qr-code-styling canvas & exports
│   │   ├── Header.tsx                # Studio navigation & route switch
│   │   ├── PresetsRow.tsx            # Visual style preset pills
│   │   ├── CustomizeSection.tsx      # Size, colors, ECC, margin sliders
│   │   ├── ScannabilityWarning.tsx   # Contrast & quiet zone auditor banner
│   │   ├── RecentQRCodes.tsx         # Saved configuration history chips
│   │   └── index.ts
│   ├── hooks/
│   │   ├── useQRForm.ts              # Field states & validation logic
│   │   ├── useQRSettings.ts          # Customization & preset handlers
│   │   ├── useRecentCodes.ts         # LocalStorage history preservation
│   │   └── index.ts
│   ├── types/
│   │   └── index.ts                  # QR types, preset schemas & contracts
│   ├── utils/
│   │   ├── qrGenerators.ts           # String conversion algorithms
│   │   ├── validation.ts             # Regex & RFC format validators
│   │   ├── scannability.ts           # WCAG luminance & ratio calculators
│   │   └── index.ts
│   ├── App.tsx                       # Client-side router & workspace layout
│   ├── index.css                     # Tailwind CSS v4 design layer
│   └── main.tsx                      # React root entry point
├── TESTING.md                        # Complete test suite & verification matrix
├── package.json                      # Dependencies & scripts
└── vite.config.ts                    # Vite & Tailwind compilation pipeline
```

---

## 🛠️ Getting Started

### Prerequisites
- **Node.js**: `v18.0.0` or higher
- **npm**: `v9.0.0` or higher

### Installation
Clone the repository and install dependencies:
```bash
git clone https://github.com/Viiiiidit/QR_GENERATOR.git
cd QR_GENERATOR
npm install
```

### Development Server
Start the local Vite development server with Hot Module Replacement (HMR):
```bash
npm run dev
```
Open [http://localhost:5173/](http://localhost:5173/) in your browser.
- **Home Landing Route**: `http://localhost:5173/#home`
- **Generator Studio**: `http://localhost:5173/#generator`

### Code Quality & Linting
Run the fast Oxlint linter:
```bash
npm run lint
```

### Production Build
Compile optimized production assets:
```bash
npm run build
```
Preview the production build locally:
```bash
npm run preview
```

---

## 🧪 Testing & Quality Assurance

QR Studio is backed by an automated 22-point end-to-end browser test suite verifying all UI states, algorithms, and responsive breakpoints:

```json
{
  "landingHeroHeadline": true,
  "landingFeatures3Cards": true,
  "landingScrollIndicator": true,
  "navigatedToGenerator": true,
  "initialPlaceholder": true,
  "urlQR": true,
  "textQR": true,
  "emailQR": true,
  "phoneQR": true,
  "wifiQR": true,
  "presetOcean": true,
  "presetSunset": true,
  "sizeSlider": true,
  "contrastWarning": true,
  "marginAndEccWarning": true,
  "inlineErrorAndDisabledDl": true,
  "recentCodeSaved": true,
  "recentCodeRestored": true,
  "resp375": true,
  "resp768": true,
  "resp1440": true,
  "navigatedBackToHome": true
}
```

Detailed test coverage, verification methods, and step-by-step audit logs are available in [TESTING.md](./TESTING.md).

---

## 🔒 Privacy & Security Blueprint

- **Zero Remote Transmission**: No encoded data (Wi-Fi passwords, contact emails, phone numbers) ever leaves your browser.
- **No Third-Party Redirects**: All generated QR codes point directly to the destination payload.
- **Isolated Local Storage**: Saved history is restricted to your machine's `localStorage` and can be wiped instantly by clearing site data.
- **Content Security**: Sanitized SVG markup generation prevents injection vulnerabilities.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE) — free for personal, commercial, and educational use.
