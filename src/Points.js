import Point from './Point';

/**
 * Points class that keep a collection of 4 points
 */

class Points {
    constructor(quads) {
        this.points = [];
        this.generateFourPoints(quads);
        this.lifeTime = Math.floor(Math.random() * (3600 - 900) + 900);
        this.isDead = false;
    }

    generateFourPoints(quads) {
        for(let i = 1; i <= 4; i++) {
            this.points.push(
                new Point(
                    Math.floor(Math.random() * (quads[i].x.start - quads[i].x.end) + quads[i].x.end),
                    Math.floor(Math.random() * (quads[i].y.start - quads[i].y.end) + quads[i].y.end)
                )
            );
        }
    }

    // draw each points of its collection on canvas
    drawPoints(ctx) {
        this.points.forEach((point, index) => {
            if(index === 0) {
                ctx.moveTo(point.x, point.y);
            } else {
                ctx.lineTo(point.x, point.y);
            }
        });
        ctx.closePath();
    }


    // "distort" points method, so it changes the x and y of each point in its collection
    distortAllPoints(addX, addY) {
        this.points.forEach((point) => {
            point.distortInXandY(addX, addY);
        });
    }

    // decrease a value of its lifetime
    decreaseLifeTime(val) {
        this.lifeTime -= val;
        this.checkIfItsDead();
    }

    // check if this colleciton of points (form) is dead
    checkIfItsDead() {
        if(this.lifeTime <= 0) {
            this.isDead = true;
        }
    }
}

export default Points;