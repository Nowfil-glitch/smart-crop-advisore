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
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        nunito: ['var(--font-nunito)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        bg: {
          base: '#050505',
          elevated: '#0a0a0a',
          surface: '#111111',
          950: '#050505',
          900: '#0a0a0a',
          800: '#111111',
          100: '#eef2ff',
        },
        accent: {
          DEFAULT: '#10b981',
          600: '#059669',
          500: '#10b981',
          400: '#34d399',
          300: '#6ee7b7',
        },
        accent2: {
          DEFAULT: '#14b8a6',
          600: '#0d9488',
          500: '#14b8a6',
          400: '#2dd4bf',
          300: '#5eead4',
        },
      },
      boxShadow: {
        glass: '0 20px 40px rgba(0, 0, 0, 0.3)',
        glow: '0 0 40px rgba(16, 185, 129, 0.15)',
        'glow-strong': '0 0 60px rgba(16, 185, 129, 0.25)',
        'glow-accent': '0 0 30px rgba(16, 185, 129, 0.3)',
        depth: '0 24px 48px rgba(0, 0, 0, 0.4)',
        'inner-glow': 'inset 0 0 30px rgba(16, 185, 129, 0.1)',
      },
      backdropBlur: {
        glass: '16px',
        'glass-heavy': '24px',
      },
      borderRadius: {
        glass: '20px',
        'glass-lg': '24px',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(1deg)' },
        },
        drift: {
          '0%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(-10px, -10px)' },
          '100%': { transform: 'translate(0, 0)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.6', transform: 'scale(1.05)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%) skewX(-15deg)' },
          '100%': { transform: 'translateX(200%) skewX(-15deg)' },
        },
        'slow-spin': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        float: 'float 8s cubic-bezier(0.4, 0, 0.2, 1) infinite',
        drift: 'drift 20s cubic-bezier(0.4, 0, 0.2, 1) infinite',
        'pulse-glow': 'pulse-glow 4s cubic-bezier(0.4, 0, 0.2, 1) infinite',
        'slow-spin': 'slow-spin 60s linear infinite',
        gradient: 'gradient-shift 6s ease infinite',
        shimmer: 'shimmer 0.8s ease forwards',
        'fade-in-up': 'fade-in-up 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards',
        'fade-in': 'fade-in 0.5s ease forwards',
        'scale-in': 'scale-in 0.4s cubic-bezier(0.2, 0.8, 0.2, 1) forwards',
      },
      transitionTimingFunction: {
        premium: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
        smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
        bounce: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-premium': 'linear-gradient(135deg, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
} satisfies Config;
