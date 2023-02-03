import { onSnake, expandSnake } from "./snake.js";


let nutrition = {
    x: 10,
    y: 10
};

const EXPANSION_RATE = 1;

export function update () {
    if(onSnake(nutrition)){
        expandSnake(EXPANSION_RATE);
        nutrition = {x :10, y: 10};
    }

}

export function draw (gameBoard) {
        const nutritionElement = document.createElement('div');
        nutritionElement.style.gridRowStart = nutrition.y;
        nutritionElement.style.gridColumnStart = nutrition.x;
        nutritionElement.classList.add('nutrition');
        gameBoard.appendChild(nutritionElement);
};