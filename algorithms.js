class Algorithms{

    static bresenham(startCoordinates,endCoordinates){
        // Flags to keep track of what's done in reflection stage
        let swapXY = false, swapX = false, swapY = false;
        // Calculates m before reflection stage
        let deltaX = Math.abs(endCoordinates.x - startCoordinates.x);
        let deltaY = Math.abs(endCoordinates.y - startCoordinates.y);
        let m = deltaY/deltaX;
        // Reflection
        if(m > 1 || m < -1 ){
            let aux = startCoordinates.x;
            startCoordinates.x = startCoordinates.y, startCoordinates.y = aux;
            aux = endCoordinates.x;
            endCoordinates.x = endCoordinates.y, endCoordinates.y = aux;
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

        // console.log("x | y  | e");

        let pixelsToPaint = [x,y];
        // Calculates m after reflection stage
        deltaX = Math.abs(endCoordinates.x - startCoordinates.x);
        deltaY = Math.abs(endCoordinates.y - startCoordinates.y);
        m = deltaY/deltaX;
        // Error variable
        let e = m-0.5;

        // console.log( x + " |  " + y + " | " + e);

        // Actually calculates the points
        while(x < endCoordinates.x){
            if(e>= 0){
                y+=1;
                e-=1;
            }
            x+=1;
            e+=m;

            // console.log( x + " |  " + y + " | " + e);

            // push the results into the array
            pixelsToPaint.push(x);
            pixelsToPaint.push(y);
        }

        // Invert Reflection
        this.invertReflection(pixelsToPaint,swapX,swapY,swapXY);
        return pixelsToPaint;
    }

    static invertReflection(pixelsToSwap, swapX, swapY, swapXY){
        for (let i =0; i< pixelsToSwap.length -1; i++){
            if(swapY) {
                pixelsToSwap[i] = (i % 2 == 0) ? pixelsToSwap[i] : -pixelsToSwap[i];
            }
            if(swapX) {
                pixelsToSwap[i] = (i % 2 == 0) ? -pixelsToSwap[i] : pixelsToSwap[i];
            }
            if(swapXY) {
                let aux =  pixelsToSwap[i];
                pixelsToSwap[i] = pixelsToSwap[i+1];
                pixelsToSwap[i+1] = aux;
                i++;
            }
        }
    }




}

module.exports = Algorithms;