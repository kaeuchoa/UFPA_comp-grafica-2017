var Pixel = require('./pixel');
var Color = require('./color');

class FrameBuffer {

    constructor(width, height) {
        this.height = height;
        this.width = width;
        this.frameBuffer = new Array(height);
        this.baseColor = new Color(255, 255, 255);
        this.edgeColor = new Color (0,0,0);
        for (var i = 0; i < height; i++) {
            this.frameBuffer[i] = new Array(width);
        }

        for (var i = 0; i < this.height; i++) {
            for (var j = 0; j < this.width; j++) {
                this.frameBuffer[i][j] = new Pixel(j, i, new Color(255, 255, 255));
            }
        }
    }

    getPixel(x, y) {
        return this.frameBuffer[y][x];
    }

    setPixel(x,y,pixel){
        if((y>=0 && y < this.height) &&(x>=0 && x < this.width )){
            pixel.setX(x);
            pixel.setY(y);
            this.frameBuffer[y][x] = pixel;
        }

    }

    setEdgeColor(color){
        this.edgeColor = color;
    }

    getBaseColor(){
        return this.baseColor;
    }
}

module.exports = FrameBuffer;