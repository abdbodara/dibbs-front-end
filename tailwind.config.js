/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      backgroundColor: {
        bg: "#f9f9f9",
        sky: "#1EAAE7",
        green: "#2BC155",
        grey: "#7e7e7e",
      },
      textColor: {
        grey: "#7e7e7e",
        sky: "#1EAAE7",
      },
      boxShadow: {
        custom: "0px 12px 23px 0px rgba(62,73,84,0.04)",
      },
    },
  },
  plugins: [],
};
