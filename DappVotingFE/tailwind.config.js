/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        custom_1: "0 9px 20px rgba(13, 38, 76, 0.19)",
      },
      backgroundColor: {
        main: "#207bc1",
        orange: "#ff7443",
        orange_hover: "#ff4200",
        custom_green: "#3cb312",
      },
      screens: {
        xs: "540px",
        sm: "600px",
        md: "960px",
        lg: "1024px",
        desktop: "1280px",
        xl: "1440px",
        xls: "1550px",
        xxl: "2560px",
      },
      colors: {
        main: "#333",
        hover: "#207bc1",
        orange: "#ff7443",
        orange_hover: "#ff4200",
      },
      borderColor: {
        main: "#207bc1",
      },
    },
  },
  plugins: [],
};
