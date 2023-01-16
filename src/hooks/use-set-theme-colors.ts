import { getThemeColors } from "../shared/getThemeColors";
import properties from "../shared/properties.json";

export function useSetThemeColors() {
  const setThemeColors = () => {
    const propertiesArray = Object.values(properties);
    const themeColors = getThemeColors(propertiesArray);

    propertiesArray.forEach((property) => {
      document.documentElement.style.setProperty(
        property,
        themeColors[property]
      );
    });
  };

  return setThemeColors;
}
