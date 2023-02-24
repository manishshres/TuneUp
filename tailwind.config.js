/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class', // set dark mode as 'class' to enable dynamic switching
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
