/**
 * Single point class
 */

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  distortInX(addXValue) {
    this.x += addXValue;
  }

  distortInY(addYValue) {
    this.y += addYValue;
  }

  distortInXandY(addX, addY) {
    this.distortInX(addX);
    this.distortInY(addY);
  }
}

export default Point;
