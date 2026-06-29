const isDev = process.env.NODE_ENV === "development";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    ...(isDev
      ? [
          "../neocentra-bank-dashboard/src/**/*.{js,ts,jsx,tsx}",
          "../neocentra-bank-auth/src/**/*.{js,ts,jsx,tsx}",
          "../neocentra-bank-shared/src/**/*.{js,ts,jsx,tsx}",
          "../neocentra-bank-layout/src/**/*.{js,ts,jsx,tsx}",
        ]
      : []),
  ],
  presets: [require("../neocentra-bank-shared/tailwind.preset.js")],
  theme: {
    extend: {},
  },
  plugins: [],
};
