module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  // darkMode: false,
  // darkMode: "media",
  darkMode: "class",
  theme: {
    extend: {
      keyframes: {
        toast: {
          "0%": {
            opacity: 0,
          },
          "20%, 81%": {
            opacity: 1,
          },
          "100%": {
            opacity: 0,
          },
        },
        visible: {
          "0%": {
            opacity: 0,
          },
          "100%": {
            opacity: 1,
          },
        },
      },
      animation: {
        toast: "toast 6s linear infinite",
        visible: "visible 3s linear",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
