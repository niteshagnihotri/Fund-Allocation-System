/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      fontFamily: {
        Dongle: "'Dongle', sans-serif",
        RedHat: "'Red Hat Text', sans-serif",
        Ubuntu: "'Ubuntu', sans-serif",
        Work: "'Work Sans', sans-serif",
        Algreya: "'Alegreya Sans', sans-serif",
        Manrope: "'Manrope', sans-serif",
        Poppins: " 'Poppins', sans-serif",
        Roboto: "'Roboto', sans-serif",
        "Source-Sans-Pro": "'Source Sans Pro', sans-serif",
      },
      colors: {
        'nav-border': '#EBEAEA',
        'light-white': '#FAFAFB',
        'light-white-100': '#F9F9F9',
        'light-white-200': '#d7d7d7',
        'light-white-300': '#F3F3F4',
        'light-white-400': '#E2E5F1',
        'light-white-500': '#E4E4E4',
        'green-100': 'rgba(81, 133, 84, 0.1)',
        'green-200': '#518554',
        'red-100': 'rgba(239, 68, 68, 0.1)',
        'red-200': 'rgba(239, 68, 68, 1)',
        'orange-100': 'rgba(246, 165, 122, 0.1)',
        'orange-200': 'rgba(246, 165, 122, 1)',
        'blue-100': 'rgb(37 99 235)',
        'black-100': '#252525',
        primary: '#518554',
        'gray-50': '#D9D9D9',
        'gray-100': '#F9F9F9',
        'gray-400': '#f7f3f3',
        'gray-800': '#727272',
        'black-600': '#1A1A1A',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
