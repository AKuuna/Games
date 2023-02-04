
import{update as updateSnake, draw as drawSnake, SNAKE_SPEED, getStartPart, snakePartHit} from "./snake.js"
import{update as updateNutrition, draw as drawNutrition } from "./nutrition.js"
import { outsideGrid } from "./grid.js";

let lastRenderTime = 0;
let gameEnds = false;
const gameBoard = document.getElementById('gameboard');

//reapetable rendering game
function renderGame (currentTime) {
    if (gameEnds) {
       if (confirm(`You've lost. Press OK to start again`)){
        window.location ='./';
       };
       return;
    }

    window.requestAnimationFrame(renderGame);
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
    if (secondsSinceLastRender < 1 / SNAKE_SPEED) return
    console.log('Render');
    
    lastRenderTime = currentTime;

    update();

    draw();

};

window.requestAnimationFrame(renderGame);

function update() {
    updateSnake();
    updateNutrition();
    checkIfDead();
}
function draw() {
    gameBoard.innerHTML = ''; //hiding previous parts of snake
    drawSnake(gameBoard);
    drawNutrition(gameBoard);
}


function checkIfDead() {
    gameEnds = outsideGrid(getStartPart()) || snakePartHit()
};
