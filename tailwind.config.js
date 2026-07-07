/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#778873',
        secondary: '#DCCFC0',
        accent: '#A88A72',
        highlight: '#FDF6ED',
        muted: '#6D655C',
        surface: '#FFFFFF',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Sora', 'sans-serif'],
        button: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        luxe: '0 24px 64px rgba(115, 110, 100, 0.12)',
      },
    },
  },
  plugins: [],
};
