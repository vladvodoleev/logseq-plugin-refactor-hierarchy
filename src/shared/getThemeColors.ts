import color from "color";

function getColor(propertyName: string) {
  // Credits to Yurii Piskun
  // discord.com/channels/725182569297215569/853262815727976458/1005819283743453214
  return getComputedStyle(top!.document.documentElement)
    .getPropertyValue(propertyName)
    .trim();
}

function getColorChannels(inputColor: string) {
  return color(inputColor).array().join(" ");
}

const getThemeColors = (propertyNames: Array<string>) => {
  return propertyNames.reduce((acc, property) => {
    acc[property] = getColorChannels(getColor(property));
    return acc;
  }, {} as Record<string, string>);
};

export { getThemeColors };
