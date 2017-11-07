// IMPORTS
import clickableGrid from './classes/utils';
let Color = require ('./classes/color');
let FrameBuffer = require ('./classes/framebuffer');
let Algorithms = require('./algorithms');

// CONFIGS
const WIDTH = 35;
const HEIGHT = 50;

// Control variable
let countClicks = 0;

// Grid Related
let frameBuffer = new FrameBuffer(WIDTH,HEIGHT);
let startCoordinates = {};
let endCoordinates = {};

function paintPoints(){
    for (let y=0; y<frameBuffer.height; y++){
        for (let x=0; x<frameBuffer.width; x++){
            let pixel = document.getElementById(x + "-" + y);
            pixel.style.backgroundColor = frameBuffer.getPixel(x,y).color.getRGB();

        }
    }
}

var grid = clickableGrid(WIDTH,HEIGHT,function(el,x,y){
    console.log("You clicked on element:",el);
    console.log("You clicked on item #:",x,y);

    if(countClicks === 0){
        countClicks++;
        startCoordinates.x = x;
        startCoordinates.y = y;
    }else if(countClicks === 1){
        endCoordinates.x = x;
        endCoordinates.y = y;
        // paint
        // TODO: check which algorithm should be used
        let pixelsToPaint = Algorithms.bresenham(startCoordinates,endCoordinates);
        console.log("Finished Bresenham");
        for (let i=0; i < pixelsToPaint.length -1 ; i+=2){
            frameBuffer.getPixel(pixelsToPaint[i],pixelsToPaint[i+1]).color = new Color(200,0,0);
        }
        paintCanvas();
        // reset
        countClicks = 0;
        startCoordinates = {};
        endCoordinates = {};
    }

    el.className='clicked';
    el.style.backgroundColor = "black";


    // let asd = document.getElementById(x + "-" + y);
    // asd.style.backgroundColor = "blue";
    // console.log("You clicked on element:",asd);
});

document.body.appendChild(grid);





