/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        white: "#ffffff",
        primary: "#3BACB6",
        "primary-light": "#82DBD8",
        "primary-dark": "#2F8F9D",
        success: "#28A745",
        disabled: "#B7B9D8",
        dark: "#413F42"
      },
    },
  },
  plugins: [],
};
