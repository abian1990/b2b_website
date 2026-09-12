/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0A1628',
        accent: '#FF6B35',
        secondary: '#1E3A5F',
        dark: '#0F172A',
        surface: '#F8FAFC',
        border: '#E2E8F0',
        muted: '#64748B'
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans SC', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif']
      }
    },
  },
  plugins: [],
}
