// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
const properties = require("./src/shared/properties");

// eslint-disable-next-line no-undef
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      "primary-text": `rgb(var(${properties.text}) / <alpha-value>)`,
      "primary-background": `rgb(var(${properties.background}) / <alpha-value>)`,
    },
  },
  plugins: [],
};
