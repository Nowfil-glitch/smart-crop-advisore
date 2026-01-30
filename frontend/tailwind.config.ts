import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        bg: {
          950: '#05060a',
          900: '#080b12',
          800: '#0e1420',
          100: '#eef2ff',
        },
        accent: {
          500: '#22d3ee', // cyan
          400: '#67e8f9',
          300: '#a5f3fc',
        },
        accent2: {
          500: '#8b5cf6', // violet
          400: '#a78bfa',
          300: '#c4b5fd',
        },
      },
      boxShadow: {
        glass: '0 18px 40px rgba(0,0,0,0.35)',
        glow: '0 0 0 1px rgba(103,232,249,0.10), 0 0 44px rgba(139,92,246,0.14)',
      },
      backdropBlur: {
        glass: '28px',
      },
      borderRadius: {
        glass: '18px',
      },
      keyframes: {
        floaty: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      animation: {
        floaty: 'floaty 8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
} satisfies Config;
