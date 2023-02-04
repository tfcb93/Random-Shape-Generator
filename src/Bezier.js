import Point from "./Point";

class Bezier extends Point {
  constructor(x, y, cp1x, cp1y, cp2x, cp2y) {
    super(x, y);

    this.controlPoints = {
      one: {
        x: cp1x,
        y: cp1y,
      },
      two: {
        x: cp2x,
        y: cp2y,
      },
    };
  }
}

export default Bezier;
