
import{update as updateSnake, draw as drawSnake, SNAKE_SPEED} from "./snake.js"
import{update as updateNutrition, draw as drawNutrition } from "./nutrition.js"

let lastRenderTime = 0;
const gameBoard = document.getElementById('gameboard');

//reapetable rendering game
function renderGame (currentTime) {
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
}
function draw() {
    gameBoard.innerHTML = ''; //hiding previous parts of snake
    drawSnake(gameBoard);
    drawNutrition(gameBoard);
}
