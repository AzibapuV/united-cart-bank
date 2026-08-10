import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0A1628",
        "ink-soft": "#101F38",
        "ink-line": "#1E3155",
        paper: "#FFFFFF",
        "paper-soft": "#F4F6FA",
        "paper-line": "#E2E8F0",
        brand: "#2E5EFF",
        "brand-soft": "#EAF0FF",
        success: "#16A34A",
        danger: "#DC2626",
        warning: "#D97706",
        muted: "#64748B"
      },
      fontFamily: {
        display: ["var(--font-sora)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-plex-mono)", "monospace"]
      },
      keyframes: {
        marker: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.4" }
        }
      },
      animation: {
        marker: "marker 1.6s ease-in-out infinite"
      }
    }
  },
  plugins: []
};

export default config;
