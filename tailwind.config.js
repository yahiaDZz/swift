/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#007CFF",
        secondary: "#CB5882",
      },
      fonts: {
        display: ["Montserrat", "sans-serif"],
      },
    },
  },
  plugins: [],
};
