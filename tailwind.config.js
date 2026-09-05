/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        obsidian: '#0A0A0A',
        gold: '#D4AF37',
      },
      fontFamily: {
        sans: ['DM Sans', 'Inter', 'sans-serif'],
        display: ['Instrument Serif', 'Georgia', 'serif'],
        mono: ['DM Mono', 'JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}