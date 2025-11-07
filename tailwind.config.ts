import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Base colors from mobile app
        background: "#ffffff",
        foreground: "#1a1a1a",

        // Brand colors
        primary: {
          DEFAULT: "#4CAF50", // Green (primary action color)
          dark: "#2d2d2d",    // Dark gray/black (secondary buttons)
          light: "#E8F5E9",   // Light green background
        },

        // Category colors (matching mobile app)
        category: {
          barber: "#4A90E2",     // Blue
          hairstylist: "#E91E63", // Pink
          nails: "#FF6B9D",       // Light pink
          makeup: "#9C27B0",      // Purple
          massage: "#00BCD4",     // Cyan
          laundry: "#4CAF50",     // Green
          tattoo: "#FF5722",      // Orange
          piercing: "#795548",    // Brown
        },

        // UI colors
        gray: {
          50: "#f9f9f9",
          100: "#f5f5f5",
          200: "#f0f0f0",
          300: "#e0e0e0",
          400: "#999999",
          500: "#666666",
          600: "#4a4a4a",
          700: "#2d2d2d",
          800: "#1a1a1a",
          900: "#0a0a0a",
        },

        // Status colors
        success: "#4CAF50",
        danger: "#DC3545",
        warning: "#FFC107",
        info: "#2196F3",
      },
    },
  },
  plugins: [],
} satisfies Config;
