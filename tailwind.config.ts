import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2563EB",
        ink: "#0F172A",
        surface: "#F8FAFC",
      },
      boxShadow: {
        card: "0 12px 36px -18px rgba(15, 23, 42, 0.20)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: { "fade-up": "fade-up 280ms ease-out" },
    },
  },
  plugins: [],
} satisfies Config;
