var Color = require ('./classes/color');
var FrameBuffer = require ('./classes/framebuffer');
var Algorithms = require('./algorithms');
const WIDTH = 50;
const HEIGHT = 50;
let frameBuffer = new FrameBuffer(WIDTH,HEIGHT);

function paintCanvas(){
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    for (let i=0; i<frameBuffer.height; i++){
        for (let j=0; j<frameBuffer.width; j++){
            let size = frameBuffer.getPixel(j,i).size;
            let padding = frameBuffer.getPixel(j,i).padding;
            ctx.fillStyle = frameBuffer.getPixel(j,i).color.getStyle();
            ctx.fillRect((frameBuffer.getPixel(j,i).x)*padding,(frameBuffer.getPixel(j,i).y)*padding,size,size);
        }
    }
}

paintCanvas();

var btnBresenham = document.getElementById("btnBresenham");

btnBresenham.onclick = function () {
    console.log("Start Bresenham");
    var startCoordinates = {
        x: Number(document.getElementById("initialX").value),
        y: Number(document.getElementById("initialY").value)
    };

    var endCoordinates = {
        x: Number(document.getElementById("finalX").value),
        y: Number(document.getElementById("finalY").value)
    };
    let pixelsToPaint = Algorithms.bresenham(startCoordinates,endCoordinates);
    console.log("Finished Bresenham");
    for (let i=0; i < pixelsToPaint.length -1 ; i+=2){
        frameBuffer.getPixel(pixelsToPaint[i],pixelsToPaint[i+1]).color = new Color(200,0,0);
    }
    paintCanvas();
};




