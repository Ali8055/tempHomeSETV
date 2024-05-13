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
// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: ['./src/**/*.{jsx,js}'],
//   theme: {
//     extend: {
//       keyframes: {
//         slideIn: {
//           '0%': {
//             transform: 'translateX(-100%)',
//           },
//           '50%': {
//             transform: 'translateX(0)',
//           },
//           '100%': {
//             transform: 'translateX(50%)',
//           },
//         },
//         slideOut: {
//           '0%': {
//             transform: 'translateX(50%)',
//           },
//           '50%': {
//             transform: 'translateX(0)',
//           },
//           '100%': {
//             transform: 'translateX(-100%)',
//           },
//         },
//       },
//       animation: {
//         slideIn: 'slideIn 0.5s ease-in-out',
//         slideOut: 'slideOut 0.5s ease-in-out',
//       },
//     },
//   },
//   plugins: [],
// };
