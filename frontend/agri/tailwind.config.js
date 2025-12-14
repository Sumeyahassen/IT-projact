/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2E7D32', // dark green
        secondary: '#8BC34A', // light green
      },
    },
  },
  plugins: [],
}