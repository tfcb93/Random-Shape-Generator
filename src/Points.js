import Point from "./Point";
import chroma from "chroma-js";

/**
 * Points class that keep a collection of 4 points
 */

class Points {
  constructor(quads) {
    this.points = [];
    this.generateFourPoints(quads);
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

  defineDirection() {
    return [
      Math.floor(Math.random() * (2 - -1) + -1),
      Math.floor(Math.random() * (2 - -1) + -1),
    ];
  }

  // draw each points of its collection on canvas
  drawPoints(ctx) {
    ctx.save();
    this.changeColor();
    ctx.strokeStyle = this.color;
    this.points.forEach((point, index) => {
      if (index === 0) {
        ctx.moveTo(point.x, point.y);
      } else {
        ctx.lineTo(point.x, point.y);
      }
    });
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
  }

  changeColor() {
    this.colorDeg += 5;
    if (this.colorDeg > 360) this.colorDeg = 0;
    this.color = chroma(this.color).set("hsl.h", this.colorDeg);
  }

  // "distort" points method, so it changes the x and y of each point in its collection
  distortPoints(addX = 1, addY = 1) {
    this.points.forEach((point) => {
      point.distortInXandY(this.direction[0] + addX, this.direction[1] + addY);
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

export default Points;
