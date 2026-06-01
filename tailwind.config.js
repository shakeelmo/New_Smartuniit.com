/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        smartNavy: "#0B1B3F",
        smartBlue: "#075EA8",
        smartOrange: "#F26522",
        smartGreen: "#2D8A69",
        ink: "#111827"
      },
      boxShadow: {
        soft: "0 18px 60px rgba(15, 23, 42, 0.10)",
        panel: "0 12px 40px rgba(11, 27, 63, 0.14)"
      }
    }
  },
  plugins: []
};
