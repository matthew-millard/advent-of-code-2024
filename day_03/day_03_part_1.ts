import { readFile } from 'node:fs/promises';

const corruptedMemory = await readFile('../inputs/day_03.txt', 'utf-8');

let total = 0;

function mul(x: number, y: number): number {
  return x * y;
}

const targetExp = new RegExp('mul\\((\\d{1,3}),(\\d{1,3})\\)', 'g');

const matches = [...corruptedMemory.matchAll(targetExp)];

console.log('matches', matches);

if (matches) {
  matches.forEach(match => {
    // Extract arguments groups and call the function
    const arg1 = Number(match[1]); // First number from the capturing group
    const arg2 = Number(match[2]); // Second number from the capturing group
    const result = mul(arg1, arg2);
    console.log(`Multiplying ${arg1} and ${arg2} = ${result}`);
    total += result;
  });
}

console.log('Total sum of results:', total);
