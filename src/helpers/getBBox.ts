/**
 *
 * from https://github.com/jsdom/jsdom/issues/918#issuecomment-1421629098
 *
 * @param textElement
 * @returns
 */
export const getBBoxPolyfill = (textElement: SVGElement): DOMRect => {
  const span = document.createElement('span');
  span.style.font = window.getComputedStyle(textElement).font;
  span.style.display = 'inline-block';
  span.textContent = textElement.textContent;
  document.body.appendChild(span);
  const rect = span.getBoundingClientRect();
  document.body.removeChild(span);
  const bbox = {
    x: rect.left,
    y: rect.top,
    width: rect.width,
    height: rect.height,
    bottom: rect.bottom,
    left: rect.left,
    right: rect.right,
    top: rect.top
  };
  return {
    ...bbox,
    toJSON: () => bbox
  };
};
