// IMPORTS
import clickableGrid from './classes/utils';
let FrameBuffer = require ('./classes/framebuffer');
let Algorithms = require('./classes/algorithms');
let operation = null;

// CONFIGS
const WIDTH = 100;
const HEIGHT = 60;
const LINE_OPERATION = "line";
const CIRCLE_OPERATION = "circle";

// Control variable
let countClicks = 0;

// Grid Related
let frameBuffer = new FrameBuffer(WIDTH,HEIGHT);
let startCoordinates = {};
let endCoordinates = {};

document.getElementById("line").onclick = function(){
    operation = LINE_OPERATION;
}

document.getElementById("circle").onclick = function(){
    operation = CIRCLE_OPERATION;
}

document.getElementById("clear").onclick = function(){
    console.log("FrameBuffer Cleared");
    frameBuffer = new FrameBuffer(WIDTH,HEIGHT);
    paintPoints();
}

// TODO: http://jscolor.com/examples/ color picker
let color = document.getElementById("colorValue").value;
console.log("cor:" + color);

function paintPoints(){
    for (let y=0; y<frameBuffer.height; y++){
        for (let x=0; x<frameBuffer.width; x++){
            let pixel = document.getElementById(x + "-" + y);
            pixel.style.backgroundColor = frameBuffer.getPixel(x,y).color.getRGB();
        }
    }
}

var grid = clickableGrid(HEIGHT,WIDTH,function(el,x,y){
    console.log("You clicked on element:",el);
    if (operation === null) {
        window.alert("Selecione uma ferramenta.");
    }else{

        if (countClicks === 0) {
            countClicks++;
            startCoordinates.x = x;
            startCoordinates.y = y;
            el.style.backgroundColor = "rgb(255,0,0)";
        } else if (countClicks === 1) {
            endCoordinates.x = x;
            endCoordinates.y = y;

            let pixelsToPaint;
            if (operation === LINE_OPERATION)
                pixelsToPaint = Algorithms.bresenham(startCoordinates, endCoordinates);
            else if (operation === CIRCLE_OPERATION)
                pixelsToPaint = Algorithms.midPointCircle(startCoordinates,endCoordinates);

            frameBuffer.pointsToFrameBuffer(pixelsToPaint);
            paintPoints();
            // reset
            countClicks = 0;
            startCoordinates = {};
            endCoordinates = {};
        }


    }
});

document.getElementById("grid").appendChild(grid);





