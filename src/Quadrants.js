export function quadGenerator(startX, startY, endX, endY){

    return ({
        1: {
            x: {
                start: endX,
                end: endX/2
            },
            y: {
                start: endY/2,
                end: startY
            }
        },
        2: {
            x: {
                start: endX/2,
                end: startX
            },
            y: {
                start: startY,
                end: endY/2
            }
        },
        3: {
            x: {
                start: endX/2,
                end: startX
            },
            y: {
                start: endY,
                end: endY/2
            }
        },
        4: {
            x: {
                start: endX,
                end: endX/2
            },
            y: {
                start: endY,
                end: endY/2
            }
        },
    })
}