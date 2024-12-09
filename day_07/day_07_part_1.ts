import { readFile } from "node:fs/promises";

type Input = Array<[number, number[]]>;

const input: Input = await readFile("../inputs/day_07.txt", "utf-8").then(input =>
  input
    .trim()
    .split("\n")
    .map(line => {
      const [testValue, equation] = line.split(": ");
      const values = equation.split(" ").map(item => Number(item));
      return [Number(testValue), values];
    })
);

// const inputStr = `
// 190: 10 19
// // 3267: 81 40 27
// `;

// 83: 17 5
// 156: 15 6
// 7290: 6 8 6 15
// 161011: 16 10 13
// 192: 17 8 14
// 21037: 9 7 18 13
// 292: 11 6 16 20

type Operators = {
  add: (num1: number, num2: number) => number;
  multiple: (num1: number, num2: number) => number;
};

const operators: Operators = {
  add: (num1, num2) => num1 + num2,
  multiple: (num1, num2) => num1 * num2,
};

// const input: Input = inputStr
//   .trim()
//   .split("\n")
//   .map(line => {
//     const [testValue, equation] = line.split(": ");
//     const values = equation.split(" ").map(item => Number(item));
//     return [Number(testValue), values];
//   });

function getTotalCalibrationResult(input: Input) {
  let totalCalibrationResult = 0;
  for (let testIndex = 0; testIndex < input.length; testIndex++) {
    const testValue = input[testIndex][0];
    const equation = input[testIndex][1];

    if (isEquationValid(testValue, equation)) {
      totalCalibrationResult += testValue;
    }
  }

  return totalCalibrationResult;
}

function isEquationValid(testValue: number, values: number[]) {
  // Recursively evaluate all possible combinations of operators and numbers
  function evaluate(values: number[]) {
    // Base case
    if (values.length === 1) {
      return values;
    }
    const results: number[] = [];

    for (let valueIndex = 0; valueIndex < values.length - 1; valueIndex++) {
      const leftPointer = values[valueIndex];
      const rightPointer = values[valueIndex + 1];

      for (const operator of Object.values(operators)) {
        const combined = operator(leftPointer, rightPointer);

        const newValues = [
          ...values.slice(0, valueIndex), // Numbers before the pair
          combined, // The result of combining the pair
          ...values.slice(valueIndex + 2), // Numbers after the pair
        ];

        // Recursively evaluate the new array and collect results
        const subResults = evaluate(newValues);
        results.push(...subResults); // Add these results to the main list
      }
    }

    return results; // Return all possible results
  }

  const possibleResults = evaluate(values);

  // Check if any result matches the testValue
  return possibleResults.includes(testValue);
}

const total = getTotalCalibrationResult(input);

console.log("Total:", total);
