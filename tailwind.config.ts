import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          50: "#FFFDF9",
          100: "#FBF8F3",
          200: "#F5EFE6",
          300: "#ECE2D0",
          400: "#DFD2BC",
        },
        paper: "#FFFDF8",
        vintage: {
          dark: "#2B1B17",
          sepia: "#795548",
          line: "#E8E0D8",
          peach: "#F3A79A",
          blush: "#D9B6A9",
          rose: "#E5989B",
          gold: "#D4AF37",
        },
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Cormorant Garamond", "Georgia", "serif"],
        script: ["var(--font-great-vibes)", "Great Vibes", "cursive"],
        handwriting: ["var(--font-caveat)", "Caveat", "cursive"],
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
      },
      boxShadow: {
        letter: "0 10px 40px -10px rgba(43, 27, 23, 0.12), 0 0 1px rgba(43, 27, 23, 0.2)",
        polaroid: "0 8px 30px -5px rgba(43, 27, 23, 0.18), 0 2px 6px -1px rgba(43, 27, 23, 0.08)",
        glow: "0 0 25px -5px rgba(243, 167, 154, 0.4)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-6px) rotate(0.5deg)" },
        },
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "20%, 60%": { transform: "translateX(-8px)" },
          "40%, 80%": { transform: "translateX(8px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.6", transform: "scale(1)" },
          "50%": { opacity: "0.9", transform: "scale(1.05)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        shake: "shake 0.4s ease-in-out",
        pulseGlow: "pulseGlow 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
