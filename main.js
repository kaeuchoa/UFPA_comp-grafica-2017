// IMPORTS
import clickableGrid from './classes/utils';
let FrameBuffer = require ('./classes/framebuffer');
let Algorithms = require('./classes/algorithms');
let Color = require("./classes/color");
let VertexTable = require("./classes/vertextable");


// FOR TESTING PURPOSES

let smallGrid = {width:15,height:15};
let bigGrid = {width:120,height:60};

// CONFIGS
const WIDTH = smallGrid.width;
const HEIGHT = smallGrid.height;
const LINE_OPERATION = "line";
const CIRCLE_OPERATION = "circle";
const BUCKET_OPERATION = "bucket";
// DEFAULT OPTION
let operation = LINE_OPERATION;

// Control variable
let countClicks = 0;

// Polygons description arrays
let vertexTable = new VertexTable();

// Grid Related
let frameBuffer = new FrameBuffer(WIDTH,HEIGHT);
let startCoordinates = {};
let endCoordinates = {};

var grid = clickableGrid(HEIGHT,WIDTH,function(el,x,y){
    // console.log("You clicked on element:",el);
    let pixelsToPaint;
    // Preenchimento recursivo
    if (countClicks === 0 && operation === BUCKET_OPERATION) {
        Algorithms.floodFill(x,y,frameBuffer,new Color(200,0,0),new Color(0,0,0));
        paintPoints();
    }else if(countClicks === 0 && operation !== BUCKET_OPERATION) {
        countClicks++;
        startCoordinates.x = x;
        startCoordinates.y = y;
        vertexTable.addVertex(x,y);
        el.style.backgroundColor = "rgb(255,0,0)";
    }else if (countClicks === 1) {
        endCoordinates.x = x;
        endCoordinates.y = y;
        vertexTable.addVertex(x,y);
        if (operation === LINE_OPERATION)
           Algorithms.bresenham(startCoordinates, endCoordinates,frameBuffer);
        else if (operation === CIRCLE_OPERATION)
           Algorithms.midPointCircle(startCoordinates,endCoordinates,frameBuffer);

        paintPoints();
        // reset
        countClicks = 0;
        startCoordinates = {};
        endCoordinates = {};
    }
});

document.getElementById("grid").appendChild(grid);


document.getElementById("line").onclick = function(){
    operation = LINE_OPERATION;
}

document.getElementById("circle").onclick = function(){
    operation = CIRCLE_OPERATION;
}

document.getElementById("bucket").onclick = function () {
    operation = BUCKET_OPERATION;
}

document.getElementById("translation").onclick = function () {
    openTranslationWindow();
}

document.getElementById("scale").onclick = function(){

    frameBuffer = Algorithms.scale(frameBuffer,vertexTable,2,2);
    paintPoints();
}

// document.getElementById("fillPolygon").onclick = function () {
//     console.log("fill");
//     vertexTable.addVertex(12,12);
//     vertexTable.addVertex(12,18);
//     vertexTable.addVertex(18,22);
//     vertexTable.addVertex(30,12);
//     vertexTable.addVertex(30,18);
//     vertexTable.addVertex(24,12);
//     Algorithms.scanlineFill(vertexTable);
//     // vertexTable.printVertexToConsole();
//     // vertexTable.printEdgeTableToConsole();
//     // if (vertexTable.getNumberOfVertexes() >= 3){
//     //     Algorithms.scanlineFill(vertexTable);
//     //
//     // }
// }

document.getElementById("clear").onclick = function(){
    frameBuffer = new FrameBuffer(WIDTH,HEIGHT);
    vertexTable = new VertexTable();
    countClicks = 0;
    paintPoints();
}

// // TODO: http://jscolor.com/examples/ color picker
// let color = document.getElementById("colorValue").onchange = function(){
//     this.value;
//     console.log("asd");
// }
// console.log("cor:" + color);

function paintPoints(){
    for (let y=0; y<frameBuffer.height; y++){
        for (let x=0; x<frameBuffer.width; x++){
            let pixel = document.getElementById(x + "-" + y);
            pixel.style.backgroundColor = frameBuffer.getPixel(x,y).color.getRGB();
        }
    }
}



var openTranslationWindow = function(){
    let bgPanel = document.getElementById("bgpanel");
    bgPanel.classList.toggle("invisible");
    let translationPanel = document.getElementById("translation-panel");
    translationPanel.classList.toggle("invisible");
    document.getElementById("translation-cancel").onclick = function(){
        translationPanel.classList.toggle("invisible");
        bgPanel.classList.toggle("invisible");
    }
    document.getElementById("translation-ok").onclick = function(){
        let xTranslation = Number(document.getElementById("translation-x").value);
        let yTranslation = Number(document.getElementById("translation-y").value);

        frameBuffer = Algorithms.translation(frameBuffer,xTranslation,yTranslation);

        paintPoints();

        translationPanel.classList.toggle("invisible");
        bgPanel.classList.toggle("invisible");
    }



}







