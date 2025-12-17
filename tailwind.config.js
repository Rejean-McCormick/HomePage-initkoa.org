/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx,md,mdx}", // <--- Updated to include Markdown files
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1e6864"
      },
      fontFamily: {
        sans: ["Baskervville", "serif"]
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography'), // <--- Added for beautiful Markdown rendering
  ]
};