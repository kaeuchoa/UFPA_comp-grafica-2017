const color = require ('./color')

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