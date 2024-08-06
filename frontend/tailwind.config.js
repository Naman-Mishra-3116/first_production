/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        custom: ["Rubik", "sans-serif"],
      },
      colors: {
        'primary-blue': '#1585e0',
        'secondary-blue': '#369cef', 
        'primary-back': '#121212',
        'secondary-back': '#1a1a1a',
      },
    },
  },
  plugins: [],
};
