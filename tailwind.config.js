const isDev = process.env.NODE_ENV === 'development';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    ...(isDev ? [
      "../neocentra-bank-dashboard/src/**/*.{js,ts,jsx,tsx}",
      "../neocentra-bank-auth/src/**/*.{js,ts,jsx,tsx}",
      "../neocentra-bank-shared/src/**/*.{js,ts,jsx,tsx}",
    ] : [])
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        brand: {
          navy: '#0F172A',
          gold: '#D97706',
          teal: '#0D9488',
          accent: '#4F46E5',
        },
        error: {
          bg: '#020617',
          border: 'rgba(239, 68, 68, 0.2)',
          glow: 'rgba(239, 68, 68, 0.05)',
          text: '#f87171',
          accent: '#ef4444',
          hover: '#dc2626',
        }
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [],
}
