/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/primeng/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      rotate: {
        180: '180deg', // Proverite da li je rotacija definisana
      },
    },
  },
  plugins: [
    require('tailwindcss-primeui')
  ],
  corePlugins: {
    preflight: false,
  }
}
