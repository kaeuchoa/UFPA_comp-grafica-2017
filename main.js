let countClicks = 0;
let startCoordinates = {};
let endCoordinates = {};
var grid = clickableGrid(35,50,function(el,x,y){
    console.log("You clicked on element:",el);
    console.log("You clicked on item #:",x,y);

    if(countClicks === 0){
        countClicks++;
        startCoordinates.x = x;
        startCoordinates.y = y;
    }else if(countClicks === 1){
        endCoordinates.x = x;
        endCoordinates.y = y;
        // paint

        // reset
        countClicks = 0;
        startCoordinates = {};
        endCoordinates = {};
    }

    el.className='clicked';
    el.style.backgroundColor = "black";


    // let asd = document.getElementById(x + "-" + y);
    // asd.style.backgroundColor = "blue";
    // console.log("You clicked on element:",asd);
});

document.body.appendChild(grid);

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



