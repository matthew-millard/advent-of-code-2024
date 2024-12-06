import { readFile } from 'node:fs/promises';

const input = await readFile('../inputs/day_01.txt', 'utf-8');

// Split the input into lines and process each line
const lines = input.trim().split('\n');

// Initialize two arrays for the separate lists
const leftList: number[] = [];
const rightList: number[] = [];

// Iterate over each line and extract the numbers
for (const line of lines) {
  const [left, right] = line.trim().split(/\s+/).map(Number); // Split by whitespace and convert to numbers
  leftList.push(left);
  rightList.push(right);
}

function sortArrayInAscendingOrder(array: number[]): number[] {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - 1 - i; j++) {
      if (array[j] > array[j + 1]) {
        // Swap elements
        let temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
      }
    }
  }

  return array;
}

export const sortedLeftList = sortArrayInAscendingOrder(leftList);
export const sortedRightList = sortArrayInAscendingOrder(rightList);

const distancesBetween = [];
for (let i = 0; i < sortedLeftList.length; i++) {
  let distance = Math.abs(sortedLeftList[i] - sortedRightList[i]);
  distancesBetween.push(distance);
}

// Add all the items in the array
const sumOfDistances = distancesBetween.reduce((total, num) => {
  return total + num;
}, 0);

// Part One Answer
console.log('Part one answer: ', sumOfDistances);

// How many times does a number in the left list appear in the right list?
const howOftenEachNumberAppears: number[] = new Array(leftList.length).fill(0);

for (let i = 0; i < leftList.length; i++) {
  let leftNum = leftList[i];
  for (let j = 0; j < rightList.length; j++) {
    if (leftNum === rightList[j]) {
      howOftenEachNumberAppears[i]++;
    }
  }
}

let similarityScore = leftList.map((number, index) => {
  return number * howOftenEachNumberAppears[index];
});

console.log('similarityScore', similarityScore);

const totalSimilarityScore = similarityScore.reduce((total, number) => {
  return total + number;
}, 0);

console.log('Answer to part two: ', totalSimilarityScore);
