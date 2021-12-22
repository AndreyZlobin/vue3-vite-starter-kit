export function makeStyles(element, style) {
  if (!element) {
    console.warn({
      message: `['warn'] передан некорректный DOM элемент, типа ${typeof element}`,
    });
    return;
  }

  for (const property in style) {
    element.style[property] = style[property];
  }
}
