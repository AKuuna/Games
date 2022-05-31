//PLANS
//1.

//Display

const BOARD_SIZE = 10;
const NUMBER_OF_MINES = 10;

//tilestatuses
const TILE_STATUSES = {
    HIDDEN: "hidden",
    MINE: "mine",
    NUMBER: "number",
    MARKED: "marked",
  
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

        //right click
        tile.element.addEventListener('contextmenu', e => {
            e.preventDefault();
            markTile(tile);
            minesLeft();
        });
    })
})



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
    console.log(tile);
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
  
  //tile Reveal
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

