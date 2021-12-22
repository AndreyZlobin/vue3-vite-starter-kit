export function positionPopover(activator, content, position) {
  const pos = position.split("-");
  let top = 0;
  switch (pos[0]) {
    case "top":
      top = activator.y + window.scrollY - content.height - 8;
      if (activator.y - content.height < 0) {
        top -= activator.y - content.height - 16;
      }
      break;
    case "bottom":
      top = activator.y + window.scrollY + activator.height + 8;
      if (window.innerHeight < top - window.scrollY + content.height - 20) {
        top -= top + content.height - window.innerHeight - window.scrollY + 20;
      }
      break;
  }

  let left = 0;
  switch (pos[1]) {
    case "left":
      left = activator.x - content.width;
      break;
    case "center":
      left = activator.x - (content.width - activator.width) / 2;
      break;
    case "right":
      left = activator.x + activator.width;
      break;
  }
  if (window.innerWidth - 17 < left + content.width) {
    left -= left + content.width - window.innerWidth + 20;
  } else if (left < 0) {
    left = 8;
  }

  return {
    top: `${top}px`,
    left: `${left}px`,
  };
}
