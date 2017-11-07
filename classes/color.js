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