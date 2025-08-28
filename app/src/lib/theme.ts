/**
 * Shivaay Theme Configuration
 * Inspired by the landing page aesthetics with glassmorphism, gradients, and smooth animations
 */

export const theme = {
  // Color System
  colors: {
    // Primary Colors (Blue-Purple Gradient)
    primary: {
      50: "#eff6ff",
      100: "#dbeafe",
      200: "#bfdbfe",
      300: "#93c5fd",
      400: "#60a5fa", // Primary blue
      500: "#3b82f6",
      600: "#2563eb", // Primary blue 600
      700: "#1d4ed8",
      800: "#1e40af",
      900: "#1e3a8a",
    },

    // Purple Colors
    purple: {
      50: "#faf5ff",
      100: "#f3e8ff",
      200: "#e9d5ff",
      300: "#d8b4fe",
      400: "#c084fc", // Primary purple
      500: "#a855f7",
      600: "#9333ea", // Primary purple 600
      700: "#7c3aed",
      800: "#6b21a8",
      900: "#581c87",
    },

    // Cyan/Teal (Accent)
    cyan: {
      50: "#ecfeff",
      100: "#cffafe",
      200: "#a5f3fc",
      300: "#67e8f9",
      400: "#22d3ee", // Accent cyan
      500: "#06b6d4",
      600: "#0891b2",
      700: "#0e7490",
      800: "#155e75",
      900: "#164e63",
    },

    // Semantic Colors
    emerald: {
      400: "#34d399",
      500: "#10b981",
      600: "#059669",
    },

    orange: {
      400: "#fb923c",
      500: "#f97316",
      600: "#ea580c",
    },

    rose: {
      400: "#fb7185",
      500: "#f43f5e",
      600: "#e11d48",
    },

    // Grayscale
    slate: {
      50: "#f8fafc",
      100: "#f1f5f9",
      200: "#e2e8f0",
      300: "#cbd5e1",
      400: "#94a3b8",
      500: "#64748b",
      600: "#475569",
      700: "#334155",
      800: "#1e293b",
      900: "#0f172a",
    },

    // Background & Text
    background: "#0a0a0a",
    foreground: "#ededed",

    // Shivaay Brand
    shivaay: {
      blue: "#002c7e",
      blueHover: "#023696",
    },
  },

  // Gradient Presets
  gradients: {
    primary: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    secondary: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    accent: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    hero: "linear-gradient(135deg, #60a5fa 0%, #c084fc 50%, #22d3ee 100%)",
    glass:
      "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
    shimmer:
      "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
  },

  // Glass Effects
  glass: {
    light: {
      background: "rgba(255, 255, 255, 0.05)",
      border: "rgba(255, 255, 255, 0.1)",
      backdropFilter: "blur(10px)",
    },
    medium: {
      background: "rgba(255, 255, 255, 0.1)",
      border: "rgba(255, 255, 255, 0.2)",
      backdropFilter: "blur(15px)",
    },
    strong: {
      background: "rgba(255, 255, 255, 0.15)",
      border: "rgba(255, 255, 255, 0.3)",
      backdropFilter: "blur(20px)",
    },
  },

  // Shadows & Glows
  shadows: {
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    glow: "0 0 80px rgba(168, 85, 247, 0.4)",
    glowPrimary: "0 0 20px rgba(139, 92, 246, 0.3)",
    glowPrimaryStrong: "0 0 40px rgba(139, 92, 246, 0.6)",
  },

  // Typography Scale
  typography: {
    fonts: {
      primary: '"Red Hat Display", Arial, Helvetica, sans-serif',
      mono: '"Red Hat Mono", "Consolas", monospace',
      display: '"Orbitron", system-ui, sans-serif',
      body: '"DMSans", system-ui, sans-serif',
    },

    sizes: {
      xs: "0.75rem", // 12px
      sm: "0.875rem", // 14px
      base: "1rem", // 16px
      lg: "1.125rem", // 18px
      xl: "1.25rem", // 20px
      "2xl": "1.5rem", // 24px
      "3xl": "1.875rem", // 30px
      "4xl": "2.25rem", // 36px
      "5xl": "3rem", // 48px
      "6xl": "3.75rem", // 60px
      "7xl": "4.5rem", // 72px
      "8xl": "6rem", // 96px
      "9xl": "8rem", // 128px
    },

    weights: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },

  // Spacing Scale
  spacing: {
    px: "1px",
    0: "0",
    0.5: "0.125rem", // 2px
    1: "0.25rem", // 4px
    1.5: "0.375rem", // 6px
    2: "0.5rem", // 8px
    2.5: "0.625rem", // 10px
    3: "0.75rem", // 12px
    3.5: "0.875rem", // 14px
    4: "1rem", // 16px
    5: "1.25rem", // 20px
    6: "1.5rem", // 24px
    7: "1.75rem", // 28px
    8: "2rem", // 32px
    9: "2.25rem", // 36px
    10: "2.5rem", // 40px
    11: "2.75rem", // 44px
    12: "3rem", // 48px
    14: "3.5rem", // 56px
    16: "4rem", // 64px
    20: "5rem", // 80px
    24: "6rem", // 96px
    28: "7rem", // 112px
    32: "8rem", // 128px
    36: "9rem", // 144px
    40: "10rem", // 160px
    44: "11rem", // 176px
    48: "12rem", // 192px
    52: "13rem", // 208px
    56: "14rem", // 224px
    60: "15rem", // 240px
    64: "16rem", // 256px
    72: "18rem", // 288px
    80: "20rem", // 320px
    96: "24rem", // 384px
  },

  // Border Radius
  borderRadius: {
    none: "0",
    sm: "0.125rem", // 2px
    md: "0.375rem", // 6px
    lg: "0.5rem", // 8px
    xl: "0.75rem", // 12px
    "2xl": "1rem", // 16px
    "3xl": "1.5rem", // 24px
    full: "9999px",
  },

  // Animation Durations
  animation: {
    duration: {
      fast: "150ms",
      normal: "300ms",
      slow: "500ms",
      slower: "800ms",
    },

    easing: {
      smooth: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      bounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
      ease: "ease-in-out",
    },
  },

  // Breakpoints
  breakpoints: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
  },

  // Z-Index Scale
  zIndex: {
    hide: -1,
    auto: "auto",
    base: 0,
    docked: 10,
    dropdown: 1000,
    sticky: 1100,
    banner: 1200,
    overlay: 1300,
    modal: 1400,
    popover: 1500,
    skipLink: 1600,
    toast: 1700,
    tooltip: 1800,
  },
} as const;

export type Theme = typeof theme;
