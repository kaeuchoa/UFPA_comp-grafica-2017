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