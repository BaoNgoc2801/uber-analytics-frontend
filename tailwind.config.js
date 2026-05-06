/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0a',
        surface: '#171717',
        surfaceHighlight: '#262626',
        primary: '#22c55e', // Uber/Stripe green-ish accent
        primaryHover: '#16a34a',
        textPrimary: '#f5f5f5',
        textSecondary: '#a3a3a3',
        textMuted: '#525252',
        border: '#262626',
        danger: '#ef4444',
        warning: '#f59e0b',
        info: '#3b82f6',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glass': '0 4px 30px rgba(0, 0, 0, 0.5)',
        'card': '0 1px 3px rgba(0, 0, 0, 0.3), 0 1px 2px rgba(0, 0, 0, 0.24)',
      },
    },
  },
  plugins: [],
}
