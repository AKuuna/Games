
const GRID_SIZE = 26;

export function randomGridPosition() {
    return{
        x: Math.floor(Math.random() * GRID_SIZE) + 1,
        y: Math.floor(Math.random() * GRID_SIZE) + 1
    }
}