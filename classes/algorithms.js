var Pixel = require('./pixel');
var Color = require('./color');
var FrameBuffer = require('./framebuffer');

class Algorithms{
    // TODO: make operations directly on framebuffer
    static bresenham(startCoordinates,endCoordinates,framebuffer){
        // console.log("Started Bresenham");
        // Flags to keep track of what's done in reflection stage
        let swapXY = false, swapX = false, swapY = false;
        // Calculates m before reflection stage
        let deltaX = Math.abs(endCoordinates.x - startCoordinates.x);
        let deltaY = Math.abs(endCoordinates.y - startCoordinates.y);
        let m = deltaY/deltaX;
        // Reflection
        if(m > 1 || m < -1 ){
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
        let pixelsToPaint = [x,y];
        // Calculates m after reflection stage
        deltaX = Math.abs(endCoordinates.x - startCoordinates.x);
        deltaY = Math.abs(endCoordinates.y - startCoordinates.y);
        m = deltaY/deltaX;
        // Error variable
        let e = m-0.5;

        // Actually calculates the points
        while(x < endCoordinates.x){
            if(e>= 0){
                y+=1;
                e-=1;
            }
            x+=1;
            e+=m;
            // push the results into the array
            pixelsToPaint.push(x);
            pixelsToPaint.push(y);
        }

        // Invert Reflection
        for (let i=0; i< pixelsToPaint.length -1; i+=2) {
            if (swapY) {
                pixelsToPaint[i+1] =  -pixelsToPaint[i+1];
            }
            if (swapX)
                pixelsToPaint[i] = -pixelsToPaint[i];

            if (swapXY) {
                let aux = pixelsToPaint[i];
                pixelsToPaint[i] = pixelsToPaint[i + 1];
                pixelsToPaint[i + 1] = aux;

            }
        }
        // console.log("Finished Bresenham");
        return pixelsToPaint;
    }

    static midPointCircle(startCoordinates,endCoordinates){
        // (x1− x0)²+(y1− y0)²= r²
        let radius = Math.pow((endCoordinates.x - startCoordinates.x),2)
                        + Math.pow((endCoordinates.y - startCoordinates.y),2);
        // value of ray
        radius = Math.sqrt(radius);
        // round value
        radius = Math.round(radius);
        let x = 0 , y = radius, p = 1 - radius;
        let pixelsToPaint = [startCoordinates.x,startCoordinates.y + radius];
        pixelsToPaint.push(startCoordinates.x, startCoordinates.y - radius);
        pixelsToPaint.push(startCoordinates.x + radius, startCoordinates.y);
        pixelsToPaint.push(startCoordinates.x - radius, startCoordinates.y);

        while(x<y){
            x++;
            if(p<0)
                p+=2*x+3;
            else{
                y--;
                p+= 2*x - 2*y + 5;
            }
            // Reflections
            // (x0 + x, y0 + y);
            // (x0 - x, y0 + y);
            // (x0 + x, y0 - y);
            // (x0 - x, y0 - y);
            // (x0 + y, y0 + x);
            // (x0 - y, y0 + x);
            // (x0 + y, y0 - x);
            // (x0 - y, y0 - x);
            pixelsToPaint.push(startCoordinates.x + x ,startCoordinates.y + y);
            pixelsToPaint.push(startCoordinates.x - x ,startCoordinates.y + y);
            pixelsToPaint.push(startCoordinates.x + x ,startCoordinates.y - y);
            pixelsToPaint.push(startCoordinates.x - x ,startCoordinates.y - y);
            pixelsToPaint.push(startCoordinates.x + y ,startCoordinates.y + x);
            pixelsToPaint.push(startCoordinates.x - y ,startCoordinates.y + x);
            pixelsToPaint.push(startCoordinates.x + y ,startCoordinates.y - x);
            pixelsToPaint.push(startCoordinates.x - y ,startCoordinates.y - x);


        }

        return pixelsToPaint;


    }

    static floodFill(x,y,frameBuffer,color,edgeColor){
        let current = frameBuffer.getPixel(x,y);
        if(current.color.getRGB() !== edgeColor.getRGB() && current.color.getRGB() !== color.getRGB()){
            frameBuffer.getPixel(x,y).color = color;
            Algorithms.floodFill(x+1,y,frameBuffer,color,edgeColor);
            Algorithms.floodFill(x,y+1,frameBuffer,color,edgeColor);
            Algorithms.floodFill(x-1,y,frameBuffer,color,edgeColor);
            Algorithms.floodFill(x,y-1,frameBuffer,color,edgeColor);
        }
    }

    static scanlineFill(vertexTable){

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

    static translation(framebuffer,moveX,moveY) {

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


}

module.exports = Algorithms;