const { fontFamily } = require("tailwindcss/defaultTheme");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./styles/**/*.{ts,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-black": "#1A232E",
        "secondary-white": "rgb(156 163 175)",
        "primary-gray": "rgb(55 65 81)",
        "primary-bg": "#f8fafc",
        "primary-blue": "#0284c7",
        sub: "#64748b",
      },
      transitionTimingFunction: {
        "out-flex": "cubic-bezier(0.05, 0.6, 0.4, 0.9)",
      },
      fontFamily: {
        primary: ["var(--inter)", ...fontFamily.sans],
        serif: ["var(--inter)", ...fontFamily.serif],
      },
    },
  },
  plugins: [],
};
