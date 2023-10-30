/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '1rem',
      screens: {
        sm: '576px',
        md: '768px',
        lg: '992px',
        xl: '1200px',
        '2xl': '1400px',
      },
    },
    extend: {
      animation: {
        fadeIn: 'fadeIn 0.15s ease-in-out forwards',
        fadeOut: 'fadeOut 0.15s ease forwards',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        fadeOut: {
          from: { opacity: 1 },
          to: { opacity: 0 },
        },
      },
    },
  },
  plugins: [],
};
