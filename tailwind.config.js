/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        night: "#0a0a0a",
        carbon: "#111111",
        ivory: "#f4efe7",
        gold: "#c7a05c"
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        serif: ["Playfair Display", "Georgia", "serif"]
      },
      boxShadow: {
        glow: "0 0 70px rgba(199, 160, 92, 0.22)"
      }
    }
  },
  plugins: []
};
