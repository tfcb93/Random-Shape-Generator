import { quadGenerator } from './Quadrants';
import Canvas from './CanvasController';


window.onload = () => {

    // create a quad object to keep the quadrants of the window, since each point will be created on a quadrant itself
    const quads = quadGenerator(0, 0, window.innerWidth, window.innerHeight)

    // create a new canvas
    const canvas = new Canvas(window.innerWidth, window.innerHeight, quads);


    // animation frame function that change the points, draw it, delete dead forms and repeat
    const moviment = () => {
        canvas.changePoints();
        canvas.drawPoints();
        canvas.buryDeadForms();
        requestAnimationFrame(moviment);
    }
    moviment();

}