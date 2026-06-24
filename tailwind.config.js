/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#0F172A',
          gold: '#D97706',
          teal: '#0D9488',
          accent: '#4F46E5',
        }
      }
    },
  },
  plugins: [],
}
