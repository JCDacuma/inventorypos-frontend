// tailwind.config.js
import scrollbar from "tailwind-scrollbar";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // React files
  ],
  theme: {
    extend: {},
  },
  plugins: [
    scrollbar({ nocompatible: true }), // ✅ allow hover + rounded
  ],
};
