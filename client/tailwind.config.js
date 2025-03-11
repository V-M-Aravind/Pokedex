/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        retro: ["Retro", "system-ui"],
        permanentMarker: ["PermanentMarker-Regular", "system-ui"],
      },
    },
  },
  plugins: [],
};
