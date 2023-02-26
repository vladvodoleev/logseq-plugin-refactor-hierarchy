import color from 'color';
import properties from './properties.json';

const defaultThemeColors = {
  '--ls-primary-text-color': '164 181 182',
  '--ls-primary-background-color': '0 43 54',
  '--ls-link-text-color': '138 187 187',
};

function getColorFromHost(propertyName: string) {
  // Credits to Yurii Piskun
  // discord.com/channels/725182569297215569/853262815727976458/1005819283743453214

  // eslint-disable-next-line no-restricted-globals
  return getComputedStyle(top!.document.documentElement).getPropertyValue(propertyName).trim();
}

function getColorChannels(inputColor: string) {
  return color(inputColor).array().join(' ');
}

function getThemeColorsFromHost(propertyNames: Array<string>) {
  try {
    return propertyNames.reduce((acc, property) => {
      acc[property] = getColorChannels(getColorFromHost(property));
      return acc;
    }, {} as Record<string, string>);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
  }

  return defaultThemeColors;
}

export function setThemeColorsToApp() {
  const propertiesArray = Object.values(properties);
  const themeColors = getThemeColorsFromHost(propertiesArray);

  propertiesArray.forEach((property) => {
    document.documentElement.style.setProperty(property, themeColors[property]);
  });
}
