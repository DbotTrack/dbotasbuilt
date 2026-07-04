/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        orange: {
          DEFAULT: '#ff8f1f',
          deep: '#e87a0f',
          soft: '#fff3e6',
          tint: '#fff8ef',
        },
        purple: {
          DEFAULT: '#4a304d',
          soft: '#ede5ee',
          tint: '#f6f1f6',
          hover: '#3c2740',
        },
        lavender: '#a98fad',
        sage: {
          DEFAULT: '#869897',
          soft: 'rgba(134, 152, 151, 0.14)',
        },
        grey: {
          1: '#eaecec',
          2: '#c9c9c9',
          3: '#869897',
          bg: '#f5f5f4',
        },
        ink: {
          DEFAULT: '#1a1718',
          2: '#4d4849',
          3: '#6b6566',
          hover: '#322c2d',
        },
        page: '#ebe9e5',
        line: '#f1f0f1',
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"SF Pro Display"',
          '"SF Pro Text"',
          '"Segoe UI"',
          'Roboto',
          'Helvetica',
          'Arial',
          'sans-serif',
        ],
        display: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"SF Pro Display"',
          '"SF Pro Text"',
          '"Segoe UI"',
          'Roboto',
          'Helvetica',
          'Arial',
          'sans-serif',
        ],
        wordmark: ['Comfortaa', '"Trebuchet MS"', 'sans-serif'],
      },
      borderRadius: {
        sm: '10px',
        md: '14px',
        lg: '18px',
        xl: '24px',
        pill: '999px',
      },
      boxShadow: {
        sm: '0 1px 2px rgba(26,23,24,0.04)',
        md: '0 1px 3px rgba(26,23,24,0.04), 0 4px 12px rgba(26,23,24,0.04)',
        lg: '0 2px 6px rgba(26,23,24,0.04), 0 12px 32px rgba(26,23,24,0.07)',
        xl: '0 4px 10px rgba(26,23,24,0.05), 0 24px 60px rgba(26,23,24,0.10)',
        purple: '0 10px 30px rgba(74,48,77,0.18)',
        'orange-btn': '0 6px 16px rgba(255,143,31,0.28)',
      },
      maxWidth: {
        site: '1140px',
      },
      spacing: {
        'nav-h': '70px',
      },
      keyframes: {
        viewFade: {
          from: { opacity: '0', transform: 'translateY(6px)' },
          to: { opacity: '1', transform: 'none' },
        },
      },
      animation: {
        viewFade: 'viewFade 0.32s ease',
      },
    },
  },
  plugins: [],
}
