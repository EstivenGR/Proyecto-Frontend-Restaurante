// tailwind.config.js
/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme';
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
                'sans': ['Poppins', ...defaultTheme.fontFamily.sans],
                'serif': ['Playfair Display', ...defaultTheme.fontFamily.serif],
            },
    },
  },
  plugins: [],
}