import { readFile } from 'node:fs/promises';

type Input = Array<[number, number[]]>;

const input: Input = await readFile('../inputs/day_07.txt', 'utf-8').then(input =>
  input
    .trim()
    .split('\n')
    .map(line => {
      const [testValue, equation] = line.split(': ');
      const values = equation.split(' ').map(item => Number(item));
      return [Number(testValue), values];
    })
);

const inputStr = `
190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20
`;

// const input: Input = inputStr
//   .trim()
//   .split('\n')
//   .map(line => {
//     const [testValue, equation] = line.split(': ');
//     const values = equation.split(' ').map(item => Number(item));
//     return [Number(testValue), values];
//   });

function getTotalCalibrationResult(input: Input) {
  console.log(input);
}

getTotalCalibrationResult(input);
