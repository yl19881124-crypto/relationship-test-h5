import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: '#8b5cf6',
        accent: '#22d3ee'
      },
      boxShadow: {
        glow: '0 0 40px rgba(139,92,246,0.35)'
      }
    }
  },
  plugins: []
} satisfies Config;
