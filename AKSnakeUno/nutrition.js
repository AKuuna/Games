import { onSnake, expandSnake } from "./snake.js";
import { randomGridPosition } from "./grid.js";

let nutrition = getRandomNutritionPosition ();

const EXPANSION_RATE = 3;

export function update () {
    if(onSnake(nutrition)){
        expandSnake(EXPANSION_RATE);
        nutrition = getRandomNutritionPosition();
    }

};

export function draw (gameBoard) {
        const nutritionElement = document.createElement('div');
        nutritionElement.style.gridRowStart = nutrition.y;
        nutritionElement.style.gridColumnStart = nutrition.x;
        nutritionElement.classList.add('nutrition');
        gameBoard.appendChild(nutritionElement);
};


function getRandomNutritionPosition () {
    let newNutritionPosition ;
    while (newNutritionPosition == null || onSnake(newNutritionPosition)) {
        newNutritionPosition = randomGridPosition();
    } 
    return newNutritionPosition;

};