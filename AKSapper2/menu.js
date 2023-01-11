const minBoard = 2;
const maxBoard = 40;
const minMines = 1;
const maxMines = "board size to the square minus 1"  ;
const defUno =`Min value is ${minBoard}, max is ${maxBoard}`;
const defDos =`Min value is ${minMines}, max is ${maxMines}`;

document.getElementById("p1").innerHTML = defUno;
document.getElementById("p2").innerHTML = defDos;


function takeValues()
{   
let boardSize1 = document.getElementById('number_of_rows').value;

console.log(boardSize1);
  
let numberOfMines1 = document.getElementById('number_of_mines').value;

console.log(numberOfMines1);

if(isNaN(boardSize1) || boardSize1 < minBoard || boardSize1 > maxBoard ) 
{
  document.getElementById("warning1").removeAttribute("hidden");
}
else if(isNaN(numberOfMines1) || numberOfMines1 < minMines || numberOfMines1 > maxMines)
{
  document.getElementById("warning2").removeAttribute("hidden");
}
else {
  enableButton();
};

return tableData = [parseInt(boardSize1),parseInt(numberOfMines1)];
console.log(tableData);
};

function enableButton() 
  { 
    document.getElementById("start-btn").removeAttribute("hidden");
  };

  
  
function redirect()
    {
    window.location.href = "./game.html";
    };
