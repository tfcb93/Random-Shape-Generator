import Point from "./Point";
import chroma from "chroma-js";
import Bezier from "./Bezier";

const enumDirections = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
  [1, -1],
  [-1, -1],
  [1, 1],
  [-1, 1],
];

/**
 * Points class that keep a collection of 4 points
 */

class Shape {
  constructor(quads) {
    this.points = [];
    this.pointsType = Math.floor(Math.random() * 1.99) ? "Bezier" : "Lines";
    if (this.pointsType === "Bezier") {
      this.generateBezierPoints();
    } else {
      this.generateFourPoints(quads);
    }
    this.color = chroma.random();
    this.colorDeg = chroma(this.color).get("hsl.h");
    this.direction = this.defineDirection();
    this.lifeTime = Math.floor(Math.random() * (3600 - 900) + 900);
    this.isDead = false;
  }

  generateFourPoints(quads) {
    for (let i = 1; i <= 4; i++) {
      this.points.push(
        new Point(
          Math.floor(
            Math.random() * (quads[i].x.start - quads[i].x.end) + quads[i].x.end
          ),
          Math.floor(
            Math.random() * (quads[i].y.start - quads[i].y.end) + quads[i].y.end
          )
        )
      );
    }
  }

  generateBezierPoints() {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const totalPoints = Math.ceil(Math.random() * 19.9);

    for (let i = 1; i <= totalPoints; i++) {
      this.points.push(
        new Bezier(
          Math.floor(Math.random() * (0 - windowWidth) + windowWidth),
          Math.floor(Math.random() * (0 - windowHeight) + windowHeight),
          Math.floor(Math.random() * (0 - windowWidth) + windowWidth),
          Math.floor(Math.random() * (0 - windowHeight) + windowHeight),
          Math.floor(Math.random() * (0 - windowWidth) + windowWidth),
          Math.floor(Math.random() * (0 - windowHeight) + windowHeight)
        )
      );
    }

    // I dunno if this has any effect on making the curve less sharp closing the path
    this.points.push(this.points[0]);
  }

  defineDirection() {
    const chooseNumber = Math.floor(Math.random() * 7.99);
    return enumDirections[chooseNumber];
  }

  // draw each points of its collection on canvas
  drawPoints(ctx) {
    // ctx.save();
    this.changeColor();
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    this.points.forEach((point, index) => {
      if (index === 0) {
        ctx.moveTo(point.x, point.y);
      } else {
        this.pointsType !== "Bezier"
          ? ctx.lineTo(point.x, point.y)
          : ctx.bezierCurveTo(
              point.x,
              point.y,
              point.controlPoints.one.x,
              point.controlPoints.one.y,
              point.controlPoints.two.x,
              point.controlPoints.two.x
            );
      }
    });
    ctx.closePath();
    ctx.stroke();
    // ctx.restore();
  }

  changeColor() {
    this.colorDeg += 5;
    if (this.colorDeg > 360) this.colorDeg = 0;
    this.color = chroma(this.color).set("hsl.h", this.colorDeg);
  }

  // "distort" points method, so it changes the x and y of each point in its collection
  distortPoints(addX = 1, addY = 1) {
    this.points.forEach((point) => {
      point.distortInXandY(this.direction[0] * addX, this.direction[1] * addY);
    });
  }

  // decrease a value of its lifetime
  decreaseLifeTime(val) {
    this.lifeTime -= val;
    this.checkIfItsDead();
  }

  // check if this colleciton of points (form) is dead
  checkIfItsDead() {
    if (this.lifeTime <= 0) {
      this.isDead = true;
    }
  }
}

export default Shape;
