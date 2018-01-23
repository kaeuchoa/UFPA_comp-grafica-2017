export default function clickableGrid( rows, cols, callback ){
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
};


