import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "bg-primary": "#0a0a0a",
        "bg-secondary": "#111111",
        "blue-core": "#1a4fd0",
        "blue-glow": "#2563eb",
        "silver-dark": "#6b7280",
        "silver-mid": "#9ca3af",
        "silver-bright": "#e5e7eb",
      },
      fontFamily: {
        display: ["Outfit", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      animation: {
        shimmer: "shimmer 3s linear infinite",
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
      },
      keyframes: {
        shimmer: {
          "0%": { "background-position": "200% 0" },
          "100%": { "background-position": "-200% 0" },
        },
        "glow-pulse": {
          "0%, 100%": { "box-shadow": "0 0 20px rgba(37, 99, 235, 0.3)" },
          "50%": { "box-shadow": "0 0 40px rgba(37, 99, 235, 0.6)" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
