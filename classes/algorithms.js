var Pixel = require('./pixel');
var Color = require('./color');
var FrameBuffer = require('./framebuffer');
let VertexTable = require("./vertextable");

class Algorithms {

    static bresenham(startCoordinates, endCoordinates, framebuffer) {
        // console.log("Started Bresenham");
        // Flags to keep track of what's done in reflection stage
        let swapXY = false, swapX = false, swapY = false;
        // Calculates m before reflection stage
        let deltaX = Math.abs(endCoordinates.x - startCoordinates.x);
        let deltaY = Math.abs(endCoordinates.y - startCoordinates.y);
        let m = deltaY / deltaX;
        // Reflection
        if (m > 1 || m < -1) {
            let aux = startCoordinates.x;
            startCoordinates.x = startCoordinates.y
            startCoordinates.y = aux;
            aux = endCoordinates.x;
            endCoordinates.x = endCoordinates.y
            endCoordinates.y = aux;
            swapXY = true;
        }
        if (startCoordinates.x > endCoordinates.x) {
            startCoordinates.x = -startCoordinates.x;
            endCoordinates.x = -endCoordinates.x;
            swapX = true;
        }
        if (startCoordinates.y > endCoordinates.y) {
            startCoordinates.y = -startCoordinates.y;
            endCoordinates.y = -endCoordinates.y;
            swapY = true;
        }
        // Control variables
        let x = startCoordinates.x, y = startCoordinates.y;
        // Final Array that keeps all the coordinates found by the algorithm
        let pixelsToPaint = [x, y];
        // Calculates m after reflection stage
        deltaX = Math.abs(endCoordinates.x - startCoordinates.x);
        deltaY = Math.abs(endCoordinates.y - startCoordinates.y);
        m = deltaY / deltaX;
        // Error variable
        let e = m - 0.5;

        // Actually calculates the points
        while (x < endCoordinates.x) {
            if (e >= 0) {
                y += 1;
                e -= 1;
            }
            x += 1;
            e += m;
            // push the results into the array
            pixelsToPaint.push(x);
            pixelsToPaint.push(y);
        }

        // console.log(pixelsToPaint);
        // Invert Reflection
        for (let i = 0; i < pixelsToPaint.length - 1; i += 2) {
            if (swapY) {
                pixelsToPaint[i + 1] = -pixelsToPaint[i + 1];
            }
            if (swapX) {
                pixelsToPaint[i] = -pixelsToPaint[i];
            }
            if (swapXY) {
                let aux = pixelsToPaint[i];
                pixelsToPaint[i] = pixelsToPaint[i + 1];
                pixelsToPaint[i + 1] = aux;
            }
            framebuffer.setPixel(pixelsToPaint[i],pixelsToPaint[i+1],
                new Pixel(pixelsToPaint[i],pixelsToPaint[i+1],framebuffer.edgeColor));
        }
    }

    static midPointCircle(startCoordinates, endCoordinates,frameBuffer) {
        // (x1− x0)²+(y1− y0)²= r²
        let radius = Math.pow((endCoordinates.x - startCoordinates.x), 2)
            + Math.pow((endCoordinates.y - startCoordinates.y), 2);
        // value of ray
        radius = Math.sqrt(radius);
        // round value
        radius = Math.round(radius);
        let x = 0, y = radius, p = 1 - radius;
        // x, y + radius
        frameBuffer.setPixel(startCoordinates.x, startCoordinates.y + radius,
                                new Pixel(startCoordinates.x, startCoordinates.y + radius,frameBuffer.edgeColor));
        // x, y - radius
        frameBuffer.setPixel(startCoordinates.x, startCoordinates.y - radius,
            new Pixel(startCoordinates.x, startCoordinates.y - radius,frameBuffer.edgeColor));
        // x + radius, y
        frameBuffer.setPixel(startCoordinates.x + radius, startCoordinates.y,
            new Pixel(startCoordinates.x + radius, startCoordinates.y,frameBuffer.edgeColor));
        // x - radius, y
        frameBuffer.setPixel(startCoordinates.x - radius, startCoordinates.y,
            new Pixel(startCoordinates.x - radius, startCoordinates.y,frameBuffer.edgeColor));



        while (x < y) {
            x++;
            if (p < 0)
                p += 2 * x + 3;
            else {
                y--;
                p += 2 * x - 2 * y + 5;
            }
            // Reflections
            // (x0 + x, y0 + y);
            frameBuffer.setPixel(startCoordinates.x + x, startCoordinates.y + y,
                new Pixel(startCoordinates.x + x, startCoordinates.y + y, frameBuffer.edgeColor));
            // (x0 - x, y0 + y);
            frameBuffer.setPixel(startCoordinates.x - x, startCoordinates.y + y,
                new Pixel(startCoordinates.x - x, startCoordinates.y + y, frameBuffer.edgeColor));
            // (x0 + x, y0 - y);
            frameBuffer.setPixel(startCoordinates.x + x, startCoordinates.y - y,
                new Pixel(startCoordinates.x + x, startCoordinates.y - y, frameBuffer.edgeColor));
            // (x0 - x, y0 - y);
            frameBuffer.setPixel(startCoordinates.x - x, startCoordinates.y - y,
                new Pixel(startCoordinates.x - x, startCoordinates.y - y, frameBuffer.edgeColor));
            // (x0 + y, y0 + x);
            frameBuffer.setPixel(startCoordinates.x + y, startCoordinates.y + x,
                new Pixel(startCoordinates.x + y, startCoordinates.y + x, frameBuffer.edgeColor));
            // (x0 - y, y0 + x);
            frameBuffer.setPixel(startCoordinates.x - y, startCoordinates.y + x,
                new Pixel(startCoordinates.x - y, startCoordinates.y + x, frameBuffer.edgeColor));
            // (x0 + y, y0 - x);
            frameBuffer.setPixel(startCoordinates.x + y, startCoordinates.y - x,
                new Pixel(startCoordinates.x + y, startCoordinates.y - x, frameBuffer.edgeColor));
            // (x0 - y, y0 - x);
            frameBuffer.setPixel(startCoordinates.x - y, startCoordinates.y - x,
                new Pixel(startCoordinates.x - y, startCoordinates.y - x, frameBuffer.edgeColor));

        }
    }

    static floodFill(x, y, frameBuffer, color, edgeColor) {
        let current = frameBuffer.getPixel(x, y);
        if (current.color.getRGB() !== edgeColor.getRGB() && current.color.getRGB() !== color.getRGB()) {
            frameBuffer.getPixel(x, y).color = color;
            Algorithms.floodFill(x + 1, y, frameBuffer, color, edgeColor);
            Algorithms.floodFill(x, y + 1, frameBuffer, color, edgeColor);
            Algorithms.floodFill(x - 1, y, frameBuffer, color, edgeColor);
            Algorithms.floodFill(x, y - 1, frameBuffer, color, edgeColor);
        }
    }

    static scanlineFill(vertexTable) {

        // Int [][] a: two dimensional array to store the polygon vertices.
        // Int [][] b : two dimensional array to store the Edges-Table.
        // float [][] cc : two dimensional array to store the Active-Table.
        // float [][] ccc : two dimensional array to store the updated Active-Table.
        // float [] slop : one dimensional array to store the slop.
        // double [][] drawline : two dimensional array to store the drawing points
        vertexTable.buildEdgeTable();
        vertexTable.sortEdgeTable();
        let scanline = vertexTable.edgeTable[0].yMin;


    }

    static translation(framebuffer, moveX, moveY) {

        let translatedBuffer = new FrameBuffer(framebuffer.width, framebuffer.height);
        for (let y = 0; y < framebuffer.height; y++) {
            for (let x = 0; x < framebuffer.width; x++) {
                let pixel = framebuffer.getPixel(x, y);
                if (pixel.getColor().getRGB() !== framebuffer.getBaseColor().getRGB()) {
                    translatedBuffer.setPixel(x + moveX, y + moveY, pixel);
                }
            }
        }

        return translatedBuffer;
    }

    static scale(framebuffer,vertexTable, scaleX, scaleY) {
        let currentPixel = [0, 0];
        let scaledBuffer = new FrameBuffer(framebuffer.width, framebuffer.height);
        let scaledVertexTable = new VertexTable();
        let scaleMatrix = [new Array(scaleX, 0), new Array(0, scaleY)];
        let scaledPixel = [0, 0];

        // it works but needs interpolation
        // for (let y = 0; y < framebuffer.height; y++) {
        //     for (let x = 0; x < framebuffer.width; x++) {
        //         currentPixel[0] = framebuffer.getPixel(x,y).x;
        //         currentPixel[1] = framebuffer.getPixel(x,y).y;
        //         let pixel = framebuffer.getPixel(x, y);
        //         for(let i =0 ; i <2; i++ ){
        //             for(let j =0; j<2; j++){
        //                 scaledPixel[i] += currentPixel[i] * scaleMatrix[i][j];
        //             }
        //         }
        //         scaledBuffer.setPixel(scaledPixel[0], scaledPixel[1], pixel);
        //         scaledPixel = [0, 0];
        //     }
        // }


        // Using Bresenham
        let xToOrigin = vertexTable.vertexTable[0].x;
        let yToOrigin = vertexTable.vertexTable[0].y;
        for (let i = 0; i < vertexTable.vertexTable.length; i++) {
            currentPixel[0] = vertexTable.vertexTable[i].x - xToOrigin;
            currentPixel[1] = vertexTable.vertexTable[i].y - yToOrigin;
            for (let i = 0; i < 2; i++) {
                for (let j = 0; j < 2; j++) {
                    scaledPixel[i] += Math.round(currentPixel[i] * scaleMatrix[i][j]);
                }
            }
            scaledVertexTable.addVertex(scaledPixel[0] + xToOrigin,scaledPixel[1] + yToOrigin);
            scaledPixel = [0, 0];
        }
        // updates the original vertextable
        vertexTable.vertexTable = scaledVertexTable.vertexTable;

        let startCoordinates = {};
        let endCoordinates = {};
        let length = scaledVertexTable.vertexTable.length -1;
        for (let i = 0; i < length; i++) {
            startCoordinates.x = scaledVertexTable.vertexTable[i].x;
            startCoordinates.y = scaledVertexTable.vertexTable[i].y;
            endCoordinates.x = scaledVertexTable.vertexTable[i+1].x;
            endCoordinates.y = scaledVertexTable.vertexTable[i+1].y;
            this.bresenham(startCoordinates,endCoordinates,scaledBuffer);
        }
        startCoordinates.x = scaledVertexTable.vertexTable[0].x;
        startCoordinates.y = scaledVertexTable.vertexTable[0].y;
        endCoordinates.x = scaledVertexTable.vertexTable[length].x;
        endCoordinates.y = scaledVertexTable.vertexTable[length].y;
        this.bresenham(startCoordinates,endCoordinates,scaledBuffer);


        return scaledBuffer;

    }

    static rotation(framebuffer,vertexTable, rotationX, rotationY) {
        let currentPixel = [0, 0];
        let scaledBuffer = new FrameBuffer(framebuffer.width, framebuffer.height);
        let scaledVertexTable = new VertexTable();
        let scaleMatrix = [new Array(scaleX, 0), new Array(0, scaleY)];
        let scaledPixel = [0, 0];

    }
}

module.exports = Algorithms;