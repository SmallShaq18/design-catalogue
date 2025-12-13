/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        neonPink: "#FF2E88",
        electricPurple: "#A020F0",
        royalBlue: "#2563EB",
        lime: "#A3E635",
        hotOrange: "#FB923C",
      },
      boxShadow: {
        glowPink: "0 0 40px rgba(255,0,150,0.3)",
        glowPurple: "0 0 40px rgba(160,32,240,0.3)",
        glowOrange: "0 0 40px rgba(251,146,60,0.3)",
      },
    },
  },
  plugins: [],
}