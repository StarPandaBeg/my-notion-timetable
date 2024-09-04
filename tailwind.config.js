/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        base: "#191919",
        surface: "#2f2f2f",
        border: "#212121",
        primary: "#cccccc",
        secondary: "#999999",
        muted: "#555555",
      },
    },
  },
  plugins: [],
};
