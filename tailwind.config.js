module.exports = {
  mode: "jit",
  purge: ["./*.html", "./src/**/*.{js,jsx,ts,tsx,vue}"],
  darkMode: "class",
  theme: {
    fontFamily: {
      montserrat: ["Montserrat", "sans-serif"],
    },
    extend: {
      colors: {
        "burnt-sienna": "#EE6C4D",
      },
    },
  },
  plugins: [],
  variants: {
    textColor: ["dark"],
  },
};
