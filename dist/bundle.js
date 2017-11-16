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

var grid = Object(__WEBPACK_IMPORTED_MODULE_0__classes_utils__["a" /* default */])(HEIGHT,WIDTH,function(el,x,y){
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
var Color = __webpack_require__ (0);

class FrameBuffer {

    constructor (width,height){
        this.height = height;
        this.width = width;
        this.frameBuffer = new Array(height);
        for (var i=0 ; i< height; i++){
            this.frameBuffer[i] = new Array(width);
        }

        for (var i =0; i <this.height; i++){
            for (var j = 0 ; j < this.width ; j++){
                this.frameBuffer[i][j] = new Pixel(j,i,new Color(255,255,255));
            }
        }
    }

    getPixel(x,y){
        return this.frameBuffer[y][x];
    }

    pointsToFrameBuffer(pixelsToPaint){
        for (let i=0; i < pixelsToPaint.length -1 ; i+=2){
            this.getPixel(pixelsToPaint[i],pixelsToPaint[i+1]).color = new Color(0,0,200);
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
        this._size = 10;
        this._padding = this.size * 1.3;
        this._x = x;
        this._y = y;
        this._color = color;
    }
    get size() {
        return this._size;
    }

    get padding() {
        return this._padding;
    }

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }

    get color() {
        return this._color;
    }
    set color(color) {
        this._color = color;
    }

}

module.exports = Pixel;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

class Algorithms{

    static bresenham(startCoordinates,endCoordinates){
        console.log("Started Bresenham");
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
        console.log("Finished Bresenham");
        return pixelsToPaint;
    }

    static midPointCircle(startCoordinates,endCoordinates){
        console.log("Started Midpoint");
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

        // pixelsToPaint.push(endCoordinates.x,endCoordinates.y);
        console.log("Finished Midpoint");

        return pixelsToPaint;


    }

}

module.exports = Algorithms;

/***/ })
/******/ ]);