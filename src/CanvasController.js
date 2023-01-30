import Points from "./Points";
import chroma from "chroma-js";

/**
 * Canvas controller
 * Here we control the canvas element, its context and the array of polygons/shapes
 */

class Canvas {
  constructor(canvasWidth, canvasHeight, quads) {
    // The line bellow can be change to create the canvas element and insert it on the document.body;
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");

    this.canvas.width = canvasWidth;
    this.canvas.height = canvasHeight;
    this.quads = quads;

    this.shapes = [];

    this.canvas.addEventListener("click", () => {
      this.addShape();
    });
  }

  // Drawing points on the canvas
  drawPoints() {
    this.ctx.beginPath();
    this.shapes.forEach((points) => {
      points.drawPoints(this.ctx);
      points.decreaseLifeTime(1);
    });
    // this.ctx.stroke();
    this.ctx.resetTransform();
  }

  // Responsible to randomly change the point values
  changePoints() {
    this.shapes.forEach((points) => {
      //   points.distortAllPoints(
      //     Math.floor(Math.random() * (6 - -5) + -5),
      //     Math.floor(Math.random() * (6 - -5) + -5)
      //   );
      //   points.distortPoints(
      //     Math.floor(Math.random() * (2 - -1) + -1),
      //     Math.floor(Math.random() * (2 - -1) + -1)
      //   );
      points.distortPoints();
    });
  }

  createColorArray() {
    const scale = chroma
      .scale([chroma.random(), chroma.random()])
      .mode("hcl")
      .colors(100);

    console.log(scale);

    return scale;
  }

  // Responsible to randomly change the color
  changeColorRandomly() {
    const newColor = [
      Math.floor(Math.random() * 255),
      Math.floor(Math.random() * 255),
      Math.floor(Math.random() * 255),
      Math.random(),
    ];

    return `rgba(${newColor.join(", ")})`;
  }

  changeWindowSize(newWidth, newHeight) {
    this.canvas.width = newWidth;
    this.canvas.height = newHeight;
  }

  // add new shapes for the shapes array
  addShape() {
    this.shapes.push(new Points(this.quads));
  }

  // delete dead shapes from the shapes array
  buryDeadShapes() {
    this.shapes = this.shapes.filter((points) => points.isDead === false);
  }
}

export default Canvas;
