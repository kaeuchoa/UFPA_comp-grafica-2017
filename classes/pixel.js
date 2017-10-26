const color = require ('./color')

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