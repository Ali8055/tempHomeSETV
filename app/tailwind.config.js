/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{jsx,js}'],
  theme: {
    extend: {
      backgroundImage: {
        'hero-pattern': "url('./sunset.jpg')",
      }
      
    },
  },
  plugins: [],
}

