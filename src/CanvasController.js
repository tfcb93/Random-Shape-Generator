import Points from './Points';

/**
 * Canvas controller
 * Here we control the canvas element, its context and the array of polygons/forms
 */

class Canvas {
    constructor(canvasWidth, canvasHeight, quads) {
        // The line bellow can be change to create the canvas element and insert it on the document.body;
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');

        this.canvas.width = canvasWidth;
        this.canvas.height = canvasHeight;

        this.forms = [];
        this.forms.push(new Points(quads));

        this.canvas.addEventListener('click', () => {
            this.forms.push(new Points(quads));
        });
    }

    // Drawing points on the canvas
    drawPoints() {
        const color = this.changeColorRandomly();
        this.ctx.strokeStyle = color;
        this.ctx.beginPath();
        this.forms.forEach((points) => {
            points.drawPoints(this.ctx);
            points.decreaseLifeTime(1);
        });
        this.ctx.stroke();
    }

    // Responsible to randomly change the point values
    changePoints() {
        this.forms.forEach((points) => {
            points.distortAllPoints(
                Math.floor(Math.random() * (6 - (-5)) + (-5)),
                Math.floor(Math.random() * (6 - (-5)) + (-5))
            );
        });
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

    // delete dead forms from the forms array
    buryDeadForms() {
        this.forms = this.forms.filter((points) => points.isDead === false);
    }

}

export default Canvas;