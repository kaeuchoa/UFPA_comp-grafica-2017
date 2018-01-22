/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

class Color {
    constructor(r, g, b) {
        this.r = r;
        this.g = g;
        this.b = b;
    }

    getColor(){
        return [this.r,this.g,this.b];
    }

    getRGB(){
        return "rgb("+ this.r +  "," + this.g + "," + this.b + ")"
    }

    isEqual(color){
        if(this.r === color.r && this.g === color.g && this.b === color.b)
            return true;
    }

    setColor(r,g,b){
        this.r = r;
        this.g = g;
        this.b = b;
    }
}

module.exports = Color;

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__classes_utils__ = __webpack_require__(2);
// IMPORTS

let FrameBuffer = __webpack_require__ (3);
let Algorithms = __webpack_require__(5);
let Color = __webpack_require__(0);
let VertexTable = __webpack_require__(6);


// FOR TESTING PURPOSES

let smallGrid = {width:7,height:7};
let bigGrid = {width:120,height:60};

// CONFIGS
const WIDTH = bigGrid.width;
const HEIGHT = bigGrid.height;
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

var grid = Object(__WEBPACK_IMPORTED_MODULE_0__classes_utils__["a" /* default */])(HEIGHT,WIDTH,function(el,x,y){
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
        // vertexTable.addVertex(x,y);
        el.style.backgroundColor = "rgb(255,0,0)";
    }else if (countClicks === 1) {
        endCoordinates.x = x;
        endCoordinates.y = y;
        // vertexTable.addVertex(x,y);
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

// document.getElementById("bgpanel").onclick = function () {
//     document.getElementById("bgpanel").classList.toggle("invisible");
// }

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
    paintPoints();
}

// // TODO: http://jscolor.com/examples/ color picker
// let color = document.getElementById("colorValue").value;
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

        let f = Algorithms.translation(frameBuffer,xTranslation,yTranslation);
        // console.log("depois");
        frameBuffer = f;
        console.log(frameBuffer);
        paintPoints();

        translationPanel.classList.toggle("invisible");
        bgPanel.classList.toggle("invisible");
    }



}









/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = clickableGrid;
function clickableGrid( rows, cols, callback ){
    var grid = document.getElementById('canvas');
    var x,y;
    grid.className = 'grid';
    for (var r=0;r<rows;++r){
        var tr = grid.appendChild(document.createElement('tr'));
        for (var c=0;c<cols;++c){
            var cell = tr.appendChild(document.createElement('td'));
            x = c;
            y = r;
            cell.id = x + "-" + y;
            cell.addEventListener('click',(function(el,x,y){
                return function(){
                    callback(el,x,y);
                }
            })(cell,x,y),false);
        }
    }
    return grid;
}



/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var Pixel = __webpack_require__(4);
var Color = __webpack_require__(0);

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
        if(y < this.height && x < this.width ){
            pixel.setX(x);
            pixel.setY(y);
            this.frameBuffer[y][x] = pixel;
        }

    }

    getBaseColor(){
        return this.baseColor;
    }

    pointsToFrameBuffer(pixelsToPaint) {
        for (let i = 0; i < pixelsToPaint.length - 1; i += 2) {
            this.getPixel(pixelsToPaint[i], pixelsToPaint[i + 1]).color = this.edgeColor;
        }
    }



}

module.exports = FrameBuffer;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const color = __webpack_require__ (0)

class Pixel{
    constructor(x,y,color){
        this.size = 10;
        this.padding = this.size * 1.3;
        this.x = x;
        this.y = y;
        this.color = color;
    }

    getColor(){
        return this.color;
    }

    setX(x){
        this.x = x;
    }

    setY(y){
        this.y = y;
    }


}

module.exports = Pixel;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var Pixel = __webpack_require__(4);
var Color = __webpack_require__(0);
var FrameBuffer = __webpack_require__(3);

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

/***/ }),
/* 6 */
/***/ (function(module, exports) {

class VertexTable {

    constructor() {
        // guarda os vértices
        this.vertexTable = [];
        // guarda as bordas do polígono (chamada de global após ordenação)
        this.edgeTable = [];
        this.activeTable = [];
    }

    addVertex(xCoord, yCoord) {
        if (this.vertexTable.length === 0) {
            this.vertexTable.push({x: xCoord, y: yCoord});
        } else {
            let containsFlag = false;
            for (let i = 0; i < this.vertexTable.length; i++) {
                let row = this.vertexTable[i];
                if ((row.x === xCoord && row.y === yCoord)) {
                    containsFlag = true;
                    break;
                }
            }
            if (!containsFlag)
                this.vertexTable.push({x: xCoord, y: yCoord});
        }
    }

    printVertexToConsole() {
        console.log("X\tY");
        for (let i = 0; i < this.vertexTable.length; i++) {
            console.log(this.vertexTable[i].x + "\t" + this.vertexTable[i].y);
        }
    }



    findMaxY(i) {
        if (this.vertexTable[i].y > this.vertexTable[i + 1].y)
            return this.vertexTable[i].y;
        else
            return this.vertexTable[i + 1].y;
    }

    findMinY(i) {
        if (this.vertexTable[i].y < this.vertexTable[i + 1].y)
            return this.vertexTable[i].y;
        else
            return this.vertexTable[i + 1].y;
    }

    // Tabela dos lados
    // slope = inclinação da reta
    buildEdgeTable() {
        for (let i = 0; i < this.vertexTable.length - 1; i++) {
            this.edgeTable.push({
                yMin: this.findMinY(i),
                yMax: this.findMaxY(i),
                xyMin: this.vertexTable[i].x,
                slope: this.findSlope(i)
            });
            if(i+1 === (this.vertexTable.length -1)){
                this.edgeTable.push({
                    yMin: this.findMinY(0),
                    yMax: this.findMaxY(0),
                    xyMin: this.vertexTable[0].y,
                    slope: this.findSlope(0)
                });
            }
        }
    }

    printEdgeTableToConsole(){
        console.log("yMin\tyMax\txyMin\tslope");
        for(let i = 0; i< this.edgeTable.length; i++){
            console.log(this.edgeTable[i].yMin+"\t\t"+this.edgeTable[i].yMax+"\t\t"+this.edgeTable[i].xyMin+"\t\t"+this.edgeTable[i].slope);
        }
    }

    findSlope(i) {
        let dy = this.vertexTable[i + 1].y - this.vertexTable[i].y;
        let dx = this.vertexTable[i + 1].x - this.vertexTable[i].x;
        let slope;
        if (dy === 0)
            slope = 1;
        if (dx === 0)
            slope = 0;
        if ((dy !== 0) && (dx !== 0)) /*- calculate inverse slope -*/
            slope = dx / dy;
        return slope;
    }

    getNumberOfVertexes() {
        return this.vertexTable.length;
    }

    // produz a global table
    sortEdgeTable() {
        let swap;
        // A. yMin[i] > yMin [i+1]
        // B. yMax[i] > yMax [i+1]
        // C. yMin[i] == yMin[i+1]
        // D. xyMin[i] > xyMin [i+1]
        for (let i = 0; i < this.edgeTable.length - 1; i++) {
            for (let j = 0; j< (this.edgeTable.length -1);j++){
                // condições
                let A = this.edgeTable[j].yMin > this.edgeTable[j + 1].yMin;
                let B = this.edgeTable[j].yMax > this.edgeTable[j + 1].yMax;
                let C = this.edgeTable[j].yMin === this.edgeTable[j+1].yMin;
                let D = this.edgeTable[j].xyMin > this.edgeTable[j+1].xyMin;
                if ((A || B) || (C && D)){
                    swap = this.edgeTable[j];
                    this.edgeTable[j] = this.edgeTable[j+1];
                    this.edgeTable[j+1] = swap;
                }
            }
        }
    }

    buildActiveTable(){
        let scanline = this.edgeTable[0].yMin;
        for(let i=0; i<this.edgeTable.length;i++){
            if(this.edgeTable[i].yMin === scanline) {
                this.activeTable.push({
                    yMax: this.edgeTable[i].yMax,
                    xyMin: this.edgeTable[i].xyMin,
                    slope: this.edgeTable[i].slope
                });
            }
        }
    }





}

module.exports = VertexTable;

/***/ })
/******/ ]);