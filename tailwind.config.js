/** @type {import('tailwindcss').Config} */
import PrimeUI from "tailwindcss-primeui";
export default {
  content: ["./src/**/*.{html,ts}", "./node_modules/primeng/**/*.{html,ts}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [PrimeUI],
  corePlugins: {
    preflight: false,
  },
};
