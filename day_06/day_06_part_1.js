import { readFile } from 'node:fs/promises';
const grid = await readFile('../inputs/day_06.txt', 'utf-8').then(value => value
    .trim()
    .split('\n')
    .map(row => row.split('')));
// const input = `
// ....#.....
// .........#
// ..........
// ..#.......
// .......#..
// ..........
// .#..^.....
// ........#.
// #.........
// ......#...
// `;
// const grid = input
//   .trim()
//   .split('\n')
//   .map(row => row.split(''));
const numOfRows = grid.length;
const numOfCols = grid[0].length;
// If there is something directly in front of you, turn right 90 degrees.
// Otherwise, take a step forward.
const directions = [
    [-1, 0], // Up
    [0, 1], // Right
    [1, 0], // Down
    [0, -1], // Left
];
let guardIsOnPatrol = true; // Once the guard has left the map, switch to false
let currentDirectionIndex = 0; // default to facing up
let currentPositionOfGuard = getStartingPositionOfGuard(grid);
const visitedPositons = new Set();
while (guardIsOnPatrol) {
    const [dx, dy] = directions[currentDirectionIndex];
    let nextPosition = [currentPositionOfGuard[0] + dx, currentPositionOfGuard[1] + dy];
    const charAtNextPosition = getCharAtPosition(nextPosition);
    if (charAtNextPosition === null) {
        visitedPositons.add(currentPositionOfGuard.toString());
        guardIsOnPatrol = false;
    }
    else if (getCharAtPosition(nextPosition) !== '#') {
        // move guard forward and add previous position to visitedPositions
        visitedPositons.add(currentPositionOfGuard.toString());
        currentPositionOfGuard = nextPosition;
    }
    else {
        // Turn right 90 degrees
        changeDirection();
    }
    if (outOfBounds(currentPositionOfGuard)) {
        guardIsOnPatrol = false;
    }
}
console.log(visitedPositons);
console.log('Total number of distinct positions:', visitedPositons.size);
function changeDirection() {
    currentDirectionIndex = (currentDirectionIndex + 1) % directions.length;
}
function getStartingPositionOfGuard(grid) {
    let foundGuardPosition = false;
    let positionX = 0;
    let positionY = 0;
    for (let rowIndex = 0; rowIndex < numOfRows; rowIndex++) {
        for (let colIndex = 0; colIndex < numOfCols; colIndex++) {
            if (grid[rowIndex][colIndex] === '^') {
                positionX = rowIndex;
                positionY = colIndex;
                foundGuardPosition = true;
                break;
            }
        }
        if (foundGuardPosition)
            break;
    }
    return [positionX, positionY];
}
function outOfBounds([row, column]) {
    return row < 0 || row >= numOfRows || column < 0 || column >= numOfCols;
}
function getCharAtPosition([row, column]) {
    if (outOfBounds([row, column])) {
        return null;
    }
    const character = grid[row][column];
    return character;
}
