//PLANS
//1.Reveal tiles by double clicking -yes
//2.Add color options -yes
//3.Add text on a sides -yes
//4.Add reload -yes
//5.Add reload without new mines placement
//6.Add board size and mines for player to decide -yes
//7.Firstly make random board, then add some buttons/options to declare new board size and mines by the player - yes
//8.Add get back to hellish colors mode -yes
//9.Place buttons where and how you want :( 

//Display


function noHelloKitty() {
  document.getElementById('bo1').style.backgroundColor = "grey";
  document.getElementById('bo1').style.color = "blue";
  document.getElementById('bo1').style.border = "navy";
  document.body.style.backgroundColor = "darkgrey";
  document.body.style.color="black";
  document.getElementById('t1').style.color = "darkblue";
  document.getElementById('t2').style.color = "darkblue";
  let btn3 = document.getElementById("btn3");
  btn3.removeAttribute("hidden");
}

function ohMyGodness() {
  document.getElementById('bo1').style.backgroundColor = "rgb(7, 58, 42)";
  document.getElementById('bo1').style.color = "black";
  document.getElementById('bo1').style.border = "grey";
  document.body.style.backgroundColor = "rgb(7, 38, 12)";
  document.getElementById('t1').style.color = "lightblue";
  document.getElementById('t2').style.color = "lightblue";
  let btn3 = document.getElementById("btn3");
  btn3.removeAttribute("hidden");
}

function backHelloKitty() {
  document.getElementById('bo1').style.backgroundColor = "rgb(94, 1, 75)";
  document.getElementById('bo1').style.color = "darkdgrey";
  document.getElementById('bo1').style.border = "grey";
  document.body.style.backgroundColor = "black";
  document.body.style.color="white";
  document.getElementById('t1').style.color = "magenta";
  document.getElementById('t2').style.color = "darkmagenta";
}


//Variables

const minBoard = 2;
const maxBoard = 40;
const minMines = 1;
const maxMines = "board size to the square minus 1";
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
tableData = [parseInt(boardSize1),parseInt(numberOfMines1)]
console.log(tableData);
return tableData;
};

function enableButton() 
  { 
    document.getElementById("start-btn").removeAttribute("hidden");
  };


//tilestatuses
const TILE_STATUSES = {
    HIDDEN: "hidden",
    MINE: "mine",
    NUMBER: "number",
    MARKED: "marked",
  }

function showTable() {
  document.getElementById("form1").setAttribute.hidden;
  document.getElementById("game1").removeAttribute.hidden;
}

function startGame(tableData){
  showTable();
  console.log(tableData);
  const BOARD_SIZE = tableData.indexOf[0];
  const NUMBER_OF_MINES = tableData.indexOf[1];
  const rowByColumns = BOARD_SIZE*BOARD_SIZE;
  const board = createBoard(BOARD_SIZE, NUMBER_OF_MINES);
  const boardElement = document.querySelector(".board");
  const minesLeftHeader = document.querySelector("[data-mine-count]");
  const messageTextHeader = document.querySelector(".subtext");
  console.log(board);
  
  boardElement.style.setProperty("--size", BOARD_SIZE);
  minesLeftHeader.textContent = NUMBER_OF_MINES;
  
  board.forEach(row => {
      row.forEach(tile => {
          boardElement.append(tile.element);
  
          //inplans:colorwhenmouseisovertile
          tile.element.addEventListener ( 'mouseover', () =>{
              
          });
  
          //left click
          tile.element.addEventListener('click', () =>{
              tileReveal(board, tile);
              checkGameEnd();
  
          });
          //double click
          tile.element.addEventListener('dblclick', () =>{
            doubleReveal(board, tile);
            checkGameEnd();
  
        });
          //right click
          tile.element.addEventListener('contextmenu', e => {
              e.preventDefault();
              markTile(tile);
              minesLeft();
          });
      })
  })
  
}



 //board creation
 function createBoard (boardSize, numberOfMines) {
    const board = [];
    const minePositions = getMinePositions(boardSize,numberOfMines);
    console.log(minePositions);

    for (let x = 0; x < boardSize; x++) {
      const row = [];
      for (let y = 0; y < boardSize; y++) {
        const element = document.createElement("div");
        element.dataset.status = TILE_STATUSES.HIDDEN;

        const tile = {
          element,
          x,
          y,
          mine: minePositions.some(p => positionCheck(p, {x, y})),
          get status() {
            return this.element.dataset.status;
          },
          set status(value) {
            this.element.dataset.status = value;
          },
        }

        row.push(tile)
      }

      board.push(row)
    }

    return board
  }

//Board creation 
// const board = createBoard(BOARD_SIZE, NUMBER_OF_MINES);
// const boardElement = document.querySelector(".board");
// const minesLeftHeader = document.querySelector("[data-mine-count]");
// const messageTextHeader = document.querySelector(".subtext");
// console.log(board);

// boardElement.style.setProperty("--size", BOARD_SIZE);
// minesLeftHeader.textContent = NUMBER_OF_MINES;

// board.forEach(row => {
//     row.forEach(tile => {
//         boardElement.append(tile.element);

//         //inplans:colorwhenmouseisovertile
//         tile.element.addEventListener ( 'mouseover', () =>{
            
//         });

//         //left click
//         tile.element.addEventListener('click', () =>{
//             tileReveal(board, tile);
//             checkGameEnd();

//         });
//         //double click
//         tile.element.addEventListener('dblclick', () =>{
//           doubleReveal(board, tile);
//           checkGameEnd();

//       });
//         //right click
//         tile.element.addEventListener('contextmenu', e => {
//             e.preventDefault();
//             markTile(tile);
//             minesLeft();
//         });
//     })
// })



function minesLeft() {
    const markedTilesCounter = board.reduce((count, row) => {
        return count + row.filter(tile => tile.status === TILE_STATUSES.MARKED).length
    }, 0)
    minesLeftHeader.textContent = NUMBER_OF_MINES - markedTilesCounter;
}

function checkGameEnd() {
    const win = checkWin(board);
    const lose = checkLose(board);
//marking tiles is possible after game end
    if (win || lose){
        boardElement.addEventListener('click', stopEvents, {capture:true});
        //boardElement.addEventListener('contextmenu', stopEvents, {capture:true});
    }

    if(win){
        messageTextHeader.textContent = "Gratulations, You're MindMaster! You've saved the world! ";
    }

    if(lose){
        messageTextHeader.textContent = "Hey, that's not it, try again. Later. Really, later, go live some real life.";
        board.forEach( row => {
            row.forEach(tile => {
                if(tile.TILE_STATUSES === TILE_STATUSES.MARKED){
                    markTile(tile);
                }
                if(tile.mine) {
                    tileReveal(board,tile);
                }
            })
        })
    }
}

function stopEvents(e) {
    e.stopImmediatePropagation();
}

 
  
  //markingTiles
function markTile(tile) {
    if (
      tile.status !== TILE_STATUSES.HIDDEN && tile.status !== TILE_STATUSES.MARKED
    ) {
      return
    }
  
    if (
      tile.status === TILE_STATUSES.MARKED
    ) {
      tile.status = TILE_STATUSES.HIDDEN
    }
  
    else {
      tile.status = TILE_STATUSES.MARKED
    }
  }  
  
  //clickingTiles
function tileReveal(board, tile) {
    if (
      tile.status !== TILE_STATUSES.HIDDEN
    ) {
      return;
    }
  
    if (tile.mine) {
      tile.status = TILE_STATUSES.MINE;
      return;
    }
    else {
      tile.status = TILE_STATUSES.NUMBER;
      const adjacentTiles = nearbyTilesReveal(board, tile);
      const mines = adjacentTiles.filter(t => t.mine);
      if(mines.length===0) {
        adjacentTiles.forEach(tileReveal.bind(null, board));
      } 
      else {
        tile.element.textContent = mines.length;}
    } 
  }
  
  //mining the board
    function getMinePositions (boardSize, numberOfMines) {
      const positions = [];
  
      while (positions.length < numberOfMines) {
        const position = {
          x: randomNumber(boardSize),
          y: randomNumber(boardSize),
        }
        if (!positions.some(p => positionCheck(p, position))){
          positions.push(position);
        }
      }
      return positions;
  
    }
  
//double click reveal
function doubleReveal (board, tile) {
  if (tile.status === TILE_STATUSES.NUMBER) {
  console.log(tile.element.textContent);
  const adjacentTiles = nearbyTilesReveal(board, tile);  
  const mines = adjacentTiles.filter(t => t.mine);
  const tilesAlreadyMarked = adjacentTiles.filter(tile => tile.status === TILE_STATUSES.MARKED);
  console.log(tilesAlreadyMarked.length);
  adjacentTiles.forEach(tileReveal.bind(null, board));
  //could be easier, with no option to use it while not all the bombs are marked
    //if (mines.length === tilesAlreadyMarked.length)
    // { console.log("yes");
    //  adjacentTiles.forEach(tileReveal.bind(null, board));
    //}
    //  else {
    //   return;
    // }
}
}


  //tile Reveal function
    function nearbyTilesReveal(board, {x, y}){
      const tiles = [];
      for (let x1=-1; x1 <=1; x1++){
        for (let y1=-1; y1 <=1; y1++){
          const tile = board[x+x1]?.[y+y1];
          if(tile){
            tiles.push(tile);
          }
        }
      }
  
      return tiles;
    }
  
  //win and lose check
  function checkWin(board) {
    return board.every(row => {
      return row.every(tile => {
        return tile.status === TILE_STATUSES.NUMBER || 
        (tile.mine && tile.status === TILE_STATUSES.HIDDEN || tile.status ===TILE_STATUSES.MARKED)
      })
    }
      )
  }
  
  function checkLose(board) {
    return board.some(row => {
      return row.some(tile => {
        return tile.status === TILE_STATUSES.MINE 
      })
    })
  }
  
  //not doubling x y positions
    function positionCheck(a, b) {
      return a.x === b.x && a.y === b.y;
  
    }
  
    //randomizing board mining
    function randomNumber(size) {
      return Math.floor(Math.random() * size);
    }

