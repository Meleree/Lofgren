/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#060606",
        card: "#101010",
        line: "#222222",
        accent: "#2f5bff",
      },
    },
  },
  plugins: [],
};