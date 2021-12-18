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
        "gray-light": "#d3dce6",
      },
    },
  },
  plugins: [],
  variants: {
    textColor: ["dark"],
  },
};
