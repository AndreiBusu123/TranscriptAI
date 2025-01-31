/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          900: '#1E40AF',
          800: '#1E3A8A',
          700: '#2563EB',
          200: '#BFDBFE',
          100: '#DBEAFE'
        },
        secondary: {
          900: '#334155',
          800: '#475569',
          700: '#64748B',
          200: '#E2E8F0',
          100: '#F1F5F9'
        },
        success: {
          700: '#15803D',
          100: '#DCFCE7'
        },
        warning: {
          700: '#B45309',
          100: '#FEF3C7'
        },
        error: {
          700: '#B91C1C',
          100: '#FEE2E2'
        }
      },
      boxShadow: {
        'light': '0 1px 2px rgba(0, 0, 0, 0.05)',
        'medium': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        'large': '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
      }
    },
  },
  plugins: [],
};
