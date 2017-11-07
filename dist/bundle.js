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

let Color = __webpack_require__ (0);
let FrameBuffer = __webpack_require__ (3);
let Algorithms = __webpack_require__(5);

// CONFIGS
const WIDTH = 25;
const HEIGHT = 25;

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

var grid = Object(__WEBPACK_IMPORTED_MODULE_0__classes_utils__["a" /* default */])(HEIGHT,WIDTH,function(el,x,y){
    console.log("You clicked on element:",el);
    // console.log("You clicked on item #:",x,y);

    if(countClicks === 0){
        countClicks++;
        startCoordinates.x = x;
        startCoordinates.y = y;
    }else if(countClicks === 1){
        endCoordinates.x = x;
        endCoordinates.y = y;
        // paint
        // TODO: check which algorithm should be used
        console.log("Started Bresenham");
        let pixelsToPaint = Algorithms.bresenham(startCoordinates,endCoordinates);
        console.log(pixelsToPaint);
        console.log("Finished Bresenham");
        for (let i=0; i < pixelsToPaint.length -1 ; i+=2){
            frameBuffer.getPixel(pixelsToPaint[i],pixelsToPaint[i+1]).color = new Color(200,0,0);
        }
        paintPoints();
        console.log(frameBuffer);
        // reset
        countClicks = 0;
        startCoordinates = {};
        endCoordinates = {};
    }

    el.className='clicked';
    el.style.backgroundColor = "rgb(200,0,0)";


    // let asd = document.getElementById(x + "-" + y);
    // asd.style.backgroundColor = "blue";
    // console.log("You clicked on element:",asd);
});

document.body.appendChild(grid);







/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = clickableGrid;
function clickableGrid( rows, cols, callback ){
    var grid = document.createElement('table');
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

    setPixel(x,y,color){
        this.frameBuffer[y][x];
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

/***/ })
/******/ ]);