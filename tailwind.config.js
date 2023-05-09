/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navGradient: "linear-gradient(180deg, #180030, #000 25%)",
        bgGradient: "linear-gradient(105.23deg, #01A4FF 33.35%, #01FFC2 115.77%)",
        bgBlack: "#010101",
        bgDarkPurple: "#110021",
        bgLightPurple: "#180030",
        bgLightPurple2: "#250247",
        gray1: "#E0E0E0",
        gray2: "#9D99A0",
        gray3: "#8C8099",
      },
    },
  },
  plugins: [],
};
