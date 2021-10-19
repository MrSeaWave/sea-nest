import dangerousStyleValue from './dangerousStyleValue';
import hyphenateStyleName from './hyphenateStyleName';

const styleNameCache: any = {};
const processStyleName = function (styleName: string): string {
  if (styleNameCache.hasOwnProperty(styleName)) {
    return styleNameCache[styleName];
  }
  const result = hyphenateStyleName(styleName);
  styleNameCache[styleName] = result;
  return result;
};

type Style = {
  [key: string]: any;
};
function transformStyles(styles: Style): Style {
  const newStyle: Style = {};
  for (const styleName in styles) {
    if (!styles.hasOwnProperty(styleName)) {
      continue;
    }
    const isCustomProperty = styleName.indexOf('--') === 0;
    const styleValue = styles[styleName];

    if (styleValue !== null) {
      const name = isCustomProperty ? styleName : processStyleName(styleName);
      newStyle[name] = dangerousStyleValue(styleName, styleValue, isCustomProperty);
    }
  }
  return newStyle;
}

export default transformStyles;
