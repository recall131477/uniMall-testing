/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#2EBD85',
        gray: {
          100: '#9198A2',
          200: '#434C5A',
          300: '#29313E',
          400: '#1F2630',
        },
      },
    },
  },
  plugins: [],
};
