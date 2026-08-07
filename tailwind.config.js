/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // light mode is the default; dark is an explicit opt-in toggle
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand palette per the client's technical color-code summary
        // (2026-08-04): dark navy primary, white/off-white backgrounds,
        // slate-blue accent, charcoal body text. Replaces the earlier
        // navy/gold/cream direction site-wide — every component reads
        // these same token names, so this remap alone re-themes the
        // whole site without touching per-component classes.
        navy: {
          DEFAULT: "#0B192C", // Primary — Dark Navy Blue
          50: "#EAEDF0",
          100: "#C6CCD4",
          200: "#9CA6B4",
          300: "#6D7A8E",
          400: "#405166",
          500: "#0B192C", // base
          600: "#0A1526",
          700: "#08111F",
          800: "#060D17",
          900: "#04080F",
        },
        // NOTE: token key stays `accent` — this used to be a metallic gold
        // ("gold" everywhere in class names), now the client's slate-blue.
        // Renamed the key (not just the hex) so `text-accent`/`bg-accent`
        // reads honestly instead of a "gold" utility resolving to blue.
        accent: {
          DEFAULT: "#2E5B88", // Accent & Icons — Slate/Blue
          50: "#EBF0F5",
          100: "#C9D8E5",
          200: "#A3BDD2",
          300: "#7A9FBD",
          400: "#547FA3",
          500: "#2E5B88", // base
          600: "#254A6E",
          700: "#1C3854",
          800: "#13273A",
          900: "#0A1620",
        },
        // Dedicated CTA-button color, distinct from `accent` (which stays
        // on icons/borders/links). Bright sky-blue by default, drops to the
        // slate-blue accent tone on hover — set 2026-08-04 per the client's
        // direct color instruction.
        button: {
          DEFAULT: "#27AAE1",
          hover: "#2E5B88",
        },
        slate: {
          dark: "#3E4856", // Body Text — Charcoal / Dark Gray
          mid: "#5C6B7A", // Secondary / muted text, derived from the charcoal
        },
        cream: "#F8F9FA", // Background Light — Off-White
        "navy-dark": "#04080F", // Dark Mode Background
      },
      // Bumps every Tailwind text-size utility ~8-9% larger than the
      // framework defaults (2026-08-06) — the client compared this build
      // against the live WordPress site and felt body/heading text read
      // noticeably smaller here. `extend` merges these in per-key rather
      // than replacing Tailwind's whole scale, so nothing else changes.
      fontSize: {
        xs: ["0.8125rem", { lineHeight: "1.1rem" }],
        sm: ["0.9375rem", { lineHeight: "1.35rem" }],
        base: ["1.0625rem", { lineHeight: "1.625rem" }],
        lg: ["1.1875rem", { lineHeight: "1.75rem" }],
        xl: ["1.375rem", { lineHeight: "1.875rem" }],
        "2xl": ["1.625rem", { lineHeight: "2.1rem" }],
        "3xl": ["2.0625rem", { lineHeight: "2.375rem" }],
        "4xl": ["2.5rem", { lineHeight: "2.625rem" }],
        "5xl": ["3.25rem", { lineHeight: "1" }],
        "6xl": ["4.0625rem", { lineHeight: "1" }],
        "7xl": ["4.875rem", { lineHeight: "1" }],
      },
      fontFamily: {
        // Headings — English
        "heading-en": ["var(--font-heading-en)", "Cinzel", "Playfair Display", "serif"],
        // Headings — Arabic
        "heading-ar": ["var(--font-heading-ar)", "Amiri", "Scheherazade New", "serif"],
        // Body — English
        "body-en": ["var(--font-body-en)", "Inter", "system-ui", "sans-serif"],
        // Body — Arabic
        "body-ar": ["var(--font-body-ar)", "Readex Pro", "system-ui", "sans-serif"],
      },
      boxShadow: {
        institutional: "0 4px 24px -4px rgba(12, 30, 56, 0.12)",
      },
      borderRadius: {
        institutional: "0.25rem", // restrained, near-square corners — legal, not startup
      },
      maxWidth: {
        content: "1280px",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
      animation: {
        marquee: "marquee 30s linear infinite",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    // Small in-house plugin: adds `[dir="rtl"]` aware spacing utilities
    // (start/end) so components don't hand-roll rtl: variants everywhere.
    function ({ addVariant }) {
      addVariant("rtl", '[dir="rtl"] &');
      addVariant("ltr", '[dir="ltr"] &');
    },
  ],
};
