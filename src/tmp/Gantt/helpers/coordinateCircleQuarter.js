export function coordinateCircleQuarter(sX, eX, sY, eY) {
  if (eX >= sX) {
    if (eY <= sY) {
      return 1;
    } else {
      return 4;
    }
  } else {
    if (eY <= sY) {
      return 2;
    } else {
      return 3;
    }
  }
}
