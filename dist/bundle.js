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

    getStyle(){
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
/***/ (function(module, exports, __webpack_require__) {

var Color = __webpack_require__ (0);
var FrameBuffer = __webpack_require__ (2);
var Algorithms = __webpack_require__(4);
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






/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var Pixel = __webpack_require__(3);
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
                this.frameBuffer[i][j] = new Pixel(j,i,new Color(200,200,200));
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
/* 3 */
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
/* 4 */
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