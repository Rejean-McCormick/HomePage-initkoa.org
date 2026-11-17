/** @type {import('tailwindcss').Config} */
// One brand palette; Tailwind variants (hover, group-hover, dark backgrounds,
// gradients) retain their original relative contrast instead of CSS overrides.
const koaTeal = {
  50: '#eef7f3',
  100: '#dcece7',
  200: '#bbdbd0',
  300: '#91bfb2',
  400: '#62a193',
  500: '#347f75',
  600: '#1e6864',
  700: '#195651',
  800: '#16433f',
  900: '#123532',
  950: '#0c2624',
};

module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx,md,mdx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1e6864',
        blue: koaTeal,
        sky: koaTeal,
        cyan: koaTeal,
        indigo: koaTeal,
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        serif: ['Georgia', 'Times New Roman', 'serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
