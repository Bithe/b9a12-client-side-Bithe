/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily:{
        poppins: '"Poppins", sans-serif',
      },
      backgroundImage: {
        'custom-banner': "url('https://i.ibb.co/r7BmmSS/banner.jpg')",
      },
    },
  },
  plugins: [require("daisyui")],

  daisyui: {
    themes: ["light", "synthwave"],
  },
};
 