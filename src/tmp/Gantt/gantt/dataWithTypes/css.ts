interface Style {
  [key: string]: string | number;
}
export function makeStyles(element: HTMLElement, style: Style): void {
  if (!element) {
    console.warn({
      message: `['warn'] передан некорректный DOM элемент, типа ${typeof element}`,
    });
    return;
  }

  for (const property in style) {
    // @ts-ignore
    element.style[property] = style[property];
  }
}
