/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary-blue': 'rgba(100, 21, 255, 1)',
        'white-transparent': 'rgba(255, 255, 255, 0.15)',
        'pink-purple': 'rgba(219, 209, 255, 1)',
        'light-gray': 'rgba(209, 213, 219, 1)',
        'dim-white': 'rgba(255, 255, 255, 1)',
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
        heading2: '38px',
        heading3: '30px',
      },
    },
  },
  plugins: [],
};
