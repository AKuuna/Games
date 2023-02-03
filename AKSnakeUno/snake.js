

import { getInputDirection } from "./input.js";
export const SNAKE_SPEED = 1;


const snakeBody = [{
    x: 13, 
    y: 13
}];
let newParts = 0;

export function update() {
    const inputDirection = getInputDirection();

    for ( let i = snakeBody.length - 2; i >= 0; i--) {
        snakeBody[i + 1] = {...snakeBody[i] };
    }

    snakeBody[0].x += inputDirection.x;
    snakeBody[0].y += inputDirection.y;
};

export function draw (gameBoard) {
    snakeBody.forEach( part => {
        const snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = part.y;
        snakeElement.style.gridColumnStart = part.x;
        snakeElement.classList.add('snake');
        gameBoard.appendChild(snakeElement);
    })
};

export function expandSnake (amount) {
    newParts += amount;
}

export function onSnake(position) {
    return snakeBody.some(part => {
       return samePositions(part, position)
    })
}

function samePositions (position1, position2) {
    return position1.x === position2.x && position1.y === position2.y
}

function addParts() {
    for (let i = 0; i < newParts; i++) {
        snakeBody[snakeBody.lenght] ={...snakeBody[snakeBody.lenght - 1]};
    }
    newParts = 0;
}