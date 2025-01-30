/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      height: {
        '130' : '34rem',
      }
    },
  },
  plugins: [],
  safelist: [
    "opacity-0",
    "opacity-100",
    "transition-opacity",
    "duration-300",
  ],
  
}

