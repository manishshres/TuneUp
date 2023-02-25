/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // set dark mode as 'class' to enable dynamic switching
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
