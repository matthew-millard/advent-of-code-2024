import { readFile } from 'node:fs/promises';

const input = await readFile('../inputs/day_04.txt', 'utf-8');
const grid = input
  .trim()
  .split('\n')
  .map(row => row.split(''));

const word = 'XMAS';
const numOfColumns = grid[0].length; // 140
const numOfRows = grid.length; // 140

const directions = [
  [0, 1], // Right
  [0, -1], // Left
  [-1, 0], // Up
  [1, 0], // Down
  [-1, 1], // Up Right
  [-1, -1], // Up Left
  [1, 1], // Down Right
  [1, -1], // Down Left
];

let totalFound = 0;

for (let row = 0; row < numOfRows; row++) {
  for (let column = 0; column < numOfColumns; column++) {
    if (getCharAt(row, column) === word[0]) {
      directions.forEach(([rowOffset, columnOffset]) => {
        if (checkWord(row, column, rowOffset, columnOffset)) {
          totalFound++;
        }
      });
    }
  }
}

console.log(`Total words found:`, totalFound);

function getCharAt(row: number, column: number) {
  return grid[row][column];
}

function isWithinBoundaries(row: number, column: number) {
  return row >= 0 && row < numOfRows && column >= 0 && column < numOfColumns;
}

function checkWord(row: number, column: number, rowOffset: number, columnOffset: number) {
  for (let i = 0; i < word.length; i++) {
    const x = row + i * rowOffset;
    const y = column + i * columnOffset;
    if (!isWithinBoundaries(x, y) || getCharAt(x, y) !== word[i]) {
      return false;
    }
  }
  return true;
}
