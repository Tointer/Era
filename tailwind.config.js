/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  content: [],
  theme: {
    extend: {},
  },
  plugins: [],
  darkMode: ['variant', ['&:where(.dark, .dark *)', '&:where(:global(.dark), :global(.dark) *)']]
}

