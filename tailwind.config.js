/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "hero-pattern": "url('./src/assets/img/hero.jpg')",
        "footer-texture": "url('/img/footer-texture.png')",
      },
      colors: {
        primary: "#007CFF",
        secondary: "#CB5882",
      },
      fontFamily: {
        primary: ["Montserrat", "sans-serif"],
        secondary: ["Lato", "sans-serif"],
      },
    },
  },
  plugins: [],
};
