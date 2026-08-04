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
        navy: {
          DEFAULT: "#0C1E38", // Primary — Deep Navy
          50: "#EAEDF1",
          100: "#C7CFDA",
          200: "#9DAAC0",
          300: "#6E7FA0",
          400: "#405682",
          500: "#0C1E38", // base
          600: "#0A1930",
          700: "#081426",
          800: "#060F1C",
          900: "#040A12",
        },
        gold: {
          DEFAULT: "#C5A059", // Accent — Metallic Gold
          50: "#FBF6EC",
          100: "#F2E5C9",
          200: "#E6CE9E",
          300: "#D9B77D",
          400: "#CFA96A",
          500: "#C5A059", // base
          600: "#A8823F",
          700: "#856633",
          800: "#634B26",
          900: "#41321A",
        },
        slate: {
          dark: "#1A202C", // Neutral / Text
          mid: "#2C3E50", // Neutral / Text (secondary)
        },
        cream: "#FAF9F6", // Light Background (default)
        "navy-dark": "#081220", // Dark Mode Background
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
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #C5A059 0%, #E6CE9E 50%, #C5A059 100%)",
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
