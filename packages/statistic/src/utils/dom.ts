const addPx = (size: string) => Math.round(parseFloat(size)) + 'px';

/**
 * 获取dom节点样式
 * @param elem
 */
export const getInitialStyle = (elem: HTMLElement): object => {
  const { color, fontFamily, fontSize } = getComputedStyle(elem);
  return {
    color,
    fontFamily,
    fontSize: addPx(fontSize),
  };
};
