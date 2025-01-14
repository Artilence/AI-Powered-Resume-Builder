/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary-blue': 'rgba(100, 21, 255, 1)',
        'white-transparent': 'rgba(255, 255, 255, 0.15)',
      },
      fontFamily: {
        albert: ['"Albert Sans"', 'sans-serif'],
        inter: ['"Inter"', 'sans-serif'],
      },
      fontSize: {
        base: '16px',
        sm: '14px',
        base_2: '18px',
        heading: '60px',
      },
    },
  },
  plugins: [],
};
