/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'duck-green': '#2D5A27',
        'duck-brown': '#5D4037',
        'duck-tan': '#D7CCC8',
        'duck-orange': '#FF9800',
      }
    },
  },
  plugins: [],
}
