/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        powerbi: {
          bg: "#0f172a",
          card: "#1e293b",
          border: "#334155",
          accent: "#f59e0b",
          gold: "#d97706",
          blue: "#3b82f6",
          red: "#ef4444",
          green: "#10b981",
          purple: "#8b5cf6",
          pink: "#ec4899",
          yellow: "#eab308",
          orange: "#f97316",
          teal: "#14b8a6",
        }
      }
    },
  },
  plugins: [],
};
