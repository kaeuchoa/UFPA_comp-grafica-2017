'mode strict';

function createGrid(canvas,width,height){
  const PIXEL_CONST = 20;
  const PIXEL_SIZE = 15;
  let ctx = canvas.getContext('2d');
  for (var x = 0; x < width; x++) {
    for (var y  = 0; y < height; y++) {
      if(y == Math.round(height/2 - 1) || x == Math.round(width/2 - 1)){
        paintPixel(x,y,PIXEL_CONST,[165,165,165],PIXEL_SIZE,ctx);
      }else{
        paintPixel(x,y,PIXEL_CONST,[200,200,200],PIXEL_SIZE,ctx);
      }
    }
  }
};

function paintPixel(x,y,pixelConst,color,pixelSize,ctx) {
  let xIndex = x*pixelConst;
  let yIndex = y*pixelConst;
  ctx.fillStyle = "rgb("+ color[0] +  "," + color[1]+ "," + color[2] + ")";
  ctx.fillRect(xIndex,yIndex,pixelSize,pixelSize);
}


function bresenham(initialX,initialY,finalX,finalY){
  var pixelsToPaint = [initialX,initialY];
  // reflection(pX,pY);
  x = initialX;
  y = initialY;
  deltaX = finalX - initialX;
  deltaY = finalY - initialY;
  m = deltaY/deltaX;
  e = m-0.5;
  while(x < finalX){
    if(e>= 0){
      y+=1;
      e-=1;
    }
    x+=1;
    e+=m;
    pixelsToPaint.push(x);
    pixelsToPaint.push(y);
    // console.log("(" + x + "," + y + ")");
  }
  return pixelsToPaint;
};

function main(){
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  const GRID_WIDTH = 50;
  const GRID_HEIGHT = 30;
  const GRID_X_CENTER = Math.round(GRID_WIDTH/2-1);
  const GRID_Y_CENTER = Math.round(GRID_HEIGHT/2-1);
  createGrid(canvas,GRID_WIDTH,GRID_HEIGHT);
  var pixelsToPaint = bresenham(2,2,6,4);
  paintArray(pixelsToPaint,ctx,GRID_X_CENTER,GRID_Y_CENTER);

};

function paintArray(array,ctx,GRID_X_CENTER,GRID_Y_CENTER) {
  console.log(array);
  for (var i = 0; i < array.length; i+=2) {
    console.log("original pixel = (" + array[i] + "," + array[i+1] + ")");
    let x = array[i]+GRID_X_CENTER;
    let y = array[i+1]+GRID_Y_CENTER
    paintPixel(x,y,20,[200,0,0],15,ctx);
    console.log("painted pixel = (" + x + "," + y + ")");
  }
};

function reflection() {
  if(m > 1 || m < -1 ){
    let aux = x1;
    x1 = y1;
    y1 = aux;
    aux = x2;
    x2 = y2;
    y2 = aux;
    let swapXY = true;
  }
  if (x1 > x2) {
    x1 = -x1;
    x2 = -x2;
    let swapX = true;
  }
  if(y1>y2){
    y1 = -y1;
    y2 = -y2;
    let swapY = true;
  }
};

function revertReflection(){
  if(swapY){
    y1 = -y1;
    y2 = -y2;
  }
  if(swapX){
    x1 = -x1;
    x2 = -x2;
  }
  if(swapXY){
    let aux = x1;
    x1 = y1;
    y1 = aux;
    aux = x2;
    x2 = y2;
    y2 = aux;

  }

};
