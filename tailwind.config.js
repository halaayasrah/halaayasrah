/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#e85d75",
          light: "#f4a0b0",
          dark: "#c94060",
        },
        surface: {
          DEFAULT: "#1a0d10",
          card: "#1f1215",
          elevated: "#2a1820",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
}

