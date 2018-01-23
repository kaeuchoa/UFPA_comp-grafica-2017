// IMPORTS
import clickableGrid from './classes/utils';

let FrameBuffer = require('./classes/framebuffer');
let Algorithms = require('./classes/algorithms');
let Color = require("./classes/color");
let VertexTable = require("./classes/vertextable");


// FOR TESTING PURPOSES

let smallGrid = {width: 15, height: 15};
let bigGrid = {width: 120, height: 60};

// CONFIGS
const WIDTH = bigGrid.width;
const HEIGHT = bigGrid.height;
const LINE_OPERATION = "line";
const CIRCLE_OPERATION = "circle";
const BUCKET_OPERATION = "bucket";
const COHEN_CUT_OPERATION = "cohen-cut";
// DEFAULT OPTION
let operation = LINE_OPERATION;

// Control variable
let countClicks = 0;
let cutFrameClicks=0;

// Polygons description arrays
let vertexTable = new VertexTable();
let cutFrame = new VertexTable();

// Grid Related
let frameBuffer = new FrameBuffer(WIDTH, HEIGHT);
let startCoordinates = {};
let endCoordinates = {};

let cutStartCoordinates = {};
let cutEndCoordinates = {};

var grid = clickableGrid(HEIGHT, WIDTH, function (el, x, y) {
    // console.log("You clicked on element:",el);
    let pixelsToPaint;
    // Preenchimento recursivo
    if (countClicks === 0 && operation === BUCKET_OPERATION) {
        Algorithms.floodFill(x, y, frameBuffer, new Color(200, 0, 0), new Color(0, 0, 0));
        paintPoints();
    } else if (countClicks === 0 && operation !== BUCKET_OPERATION && operation !== COHEN_CUT_OPERATION) {
        countClicks++;
        startCoordinates.x = x;
        startCoordinates.y = y;
        vertexTable.addVertex(x, y);
        el.style.backgroundColor = "rgb(255,0,0)";
    } else if (countClicks === 1) {
        endCoordinates.x = x;
        endCoordinates.y = y;
        vertexTable.addVertex(x, y);
        if (operation === LINE_OPERATION)
            Algorithms.bresenham(startCoordinates, endCoordinates, frameBuffer);
        else if (operation === CIRCLE_OPERATION)
            Algorithms.midPointCircle(startCoordinates, endCoordinates, frameBuffer);

        paintPoints();
        // reset
        countClicks = 0;
        startCoordinates = {};
        endCoordinates = {};
    } else if (operation === COHEN_CUT_OPERATION) {
        if (cutFrameClicks === 0 && cutFrame.vertexTable.length <=4) {
            cutFrameClicks++;
            cutStartCoordinates.x = x;
            cutStartCoordinates.y = y;
            cutFrame.addVertex(x, y);
            el.style.backgroundColor = "rgb(255,0,0)";
        } else if (cutFrameClicks === 1 && cutFrame.vertexTable.length <5) {
            cutEndCoordinates.x = x;
            cutEndCoordinates.y = y;
            cutFrame.addVertex(x, y);
            Algorithms.bresenham(cutStartCoordinates, cutEndCoordinates, frameBuffer);
            paintPoints();
            // reset
            cutFrameClicks = 0;
            cutStartCoordinates = {};
            cutEndCoordinates = {};
        }else{
            window.alert("Só 4 pontos são permitidos nessa função");
        }
    }


});

function paintPoints() {
    for (let y = 0; y < frameBuffer.height; y++) {
        for (let x = 0; x < frameBuffer.width; x++) {
            let pixel = document.getElementById(x + "-" + y);
            pixel.style.backgroundColor = frameBuffer.getPixel(x, y).color.getRGB();
        }
    }
}

document.getElementById("grid").appendChild(grid);

document.getElementById("line").onclick = function () {
    operation = LINE_OPERATION;
}

document.getElementById("circle").onclick = function () {
    operation = CIRCLE_OPERATION;
}

document.getElementById("bucket").onclick = function () {
    operation = BUCKET_OPERATION;
}

document.getElementById("translation").onclick = function () {
    openTranslationWindow();
}

document.getElementById("scale").onclick = function () {
    frameBuffer = Algorithms.scale(frameBuffer, vertexTable, 2, 2);
    paintPoints();
}

document.getElementById("rotation-90-right").onclick = function () {
    frameBuffer = Algorithms.rotation(frameBuffer, vertexTable, 90);
    paintPoints();
}

document.getElementById("rotation-90-left").onclick = function () {
    frameBuffer = Algorithms.rotation(frameBuffer, vertexTable, -90);
    paintPoints();
}

document.getElementById("rotation-180").onclick = function () {
    frameBuffer = Algorithms.rotation(frameBuffer, vertexTable, 180);
    paintPoints();
}

document.getElementById("cohen-cut").onclick = function () {
    operation = COHEN_CUT_OPERATION;
    // frameBuffer = Algorithms.cuttinCohen(frameBuffer, vertexTable, 180);
    // paintPoints();
}


document.getElementById("clear").onclick = function () {
    frameBuffer = new FrameBuffer(WIDTH, HEIGHT);
    vertexTable = new VertexTable();
    cutFrame = new VertexTable();
    cutFrameClicks = 0;
    countClicks = 0;
    paintPoints();
}

// // TODO: http://jscolor.com/examples/ color picker
// let color = document.getElementById("colorValue").onchange = function(){
//     this.value;
//     console.log("asd");
// }
// console.log("cor:" + color);


var openTranslationWindow = function () {
    let bgPanel = document.getElementById("bgpanel");
    bgPanel.classList.toggle("invisible");
    let translationPanel = document.getElementById("translation-panel");
    translationPanel.classList.toggle("invisible");
    document.getElementById("translation-cancel").onclick = function () {
        translationPanel.classList.toggle("invisible");
        bgPanel.classList.toggle("invisible");
    }
    document.getElementById("translation-ok").onclick = function () {
        let xTranslation = Number(document.getElementById("translation-x").value);
        let yTranslation = Number(document.getElementById("translation-y").value);
        frameBuffer = Algorithms.translation(frameBuffer, xTranslation, yTranslation);

        paintPoints();

        translationPanel.classList.toggle("invisible");
        bgPanel.classList.toggle("invisible");
    }


}







