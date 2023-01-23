import color from 'color';

function getColor(propertyName: string) {
  // Credits to Yurii Piskun
  // discord.com/channels/725182569297215569/853262815727976458/1005819283743453214
  // eslint-disable-next-line no-restricted-globals
  return getComputedStyle(top!.document.documentElement).getPropertyValue(propertyName).trim();
}

function getColorChannels(inputColor: string) {
  return color(inputColor).array().join(' ');
}

const getThemeColors = (propertyNames: Array<string>) => {
  console.log(propertyNames);
  try {
    return propertyNames.reduce((acc, property) => {
      acc[property] = getColorChannels(getColor(property));
      return acc;
    }, {} as Record<string, string>);
  } catch (e) {
    console.log(e);
  }

  return {
    '--ls-primary-text-color': '164 181 182',
    '--ls-primary-background-color': '0 43 54',
    '--ls-link-text-color': '138 187 187',
  };
};

export { getThemeColors };
