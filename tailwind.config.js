// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
const properties = require("./src/shared/properties");

// eslint-disable-next-line no-undef
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: Object.entries(properties).reduce((acc, [prop, val]) => {
      acc[prop] = `rgb(var(${val}) / <alpha-value>)`;
      return acc;
    }, {}),
  },
  plugins: [],
};
