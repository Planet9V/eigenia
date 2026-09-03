import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "var(--bg-canvas)",
        surface: "var(--bg-surface)",
        subtle: "var(--bg-subtle)",
        primary: "var(--text-primary)",
        secondary: "var(--text-secondary)",
        muted: "var(--text-muted)",
        hairline: "var(--border-hairline)",
        background: "var(--bg-canvas)",
        foreground: "var(--text-primary)",
        obsidian: "#0b0c0e",
        charcoalBand: "#121417",
        slateBand: "#16181d",
        cardSurface: "#131519",
        cardBorder: "#22252c",
        dutchOrange: {
          DEFAULT: "#E05A10",
          50: "#FFF6EF",
          100: "#FFE7D6",
          200: "#FFC9A8",
          300: "#FFA370",
          400: "#F07B37",
          500: "#E05A10",
          600: "#C64405",
          700: "#9C3204",
          800: "#7A2A0A",
          900: "#63240C",
        },
        charcoal: {
          DEFAULT: "#0b0c0e",
          50: "#18181b",
          100: "#121417",
          200: "#0d0d0f",
          300: "#09090b",
          400: "#050505",
          500: "#0b0c0e",
          600: "#000000",
        },
      },
      fontFamily: {
        serif: ["var(--font-sans)", "Inter", "system-ui", "-apple-system", "sans-serif"],
        sans: ["var(--font-sans)", "Inter", "system-ui", "-apple-system", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        float: "float 6s ease-in-out infinite",
        glow: "glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        glow: {
          "0%": { boxShadow: "0 0 15px rgba(224, 90, 16, 0.3)" },
          "100%": { boxShadow: "0 0 25px rgba(224, 90, 16, 0.6)" },
        },
      },
    },
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant("light", "html.light &");
    }),
  ],
};

export default config;
