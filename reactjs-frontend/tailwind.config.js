/** @type {import('tailwindcss').Config} */
const scrollbar = require("tailwind-scrollbar")({ nocompatible: true });
const daisyui = require("daisyui");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [scrollbar, daisyui],
};