import { readFile } from 'node:fs/promises';
const input = await readFile('../inputs/day_07.txt', 'utf-8').then(input => input
    .trim()
    .split('\n')
    .map(line => {
    const [testValue, equation] = line.split(': ');
    const values = equation.split(' ').map(item => Number(item));
    return [Number(testValue), values];
}));
// const inputStr = `
// 190: 10 19
// 3267: 81 40 27
// 83: 17 5
// 156: 15 6
// 7290: 6 8 6 15
// 161011: 16 10 13
// 192: 17 8 14
// 21037: 9 7 18 13
// 292: 11 6 16 20
// `;
// const input: Input = inputStr
//   .trim()
//   .split('\n')
//   .map(line => {
//     const [testValue, equation] = line.split(': ');
//     const values = equation.split(' ').map(item => Number(item));
//     return [Number(testValue), values];
//   });
const operators = {
    add: (num1, num2) => num1 + num2,
    multiple: (num1, num2) => num1 * num2,
};
function getTotalCalibrationResult(input) {
    let totalCalibrationResult = 0;
    for (let testIndex = 0; testIndex < input.length; testIndex++) {
        // console.log('\n', `***************** Starting test: ${testIndex} *****************`, '\n');
        // console.time(`Test ${testIndex} duration`);
        const [testValue, equationValues] = input[testIndex];
        if (isEquationValid(testValue, equationValues)) {
            totalCalibrationResult += testValue;
        }
        // console.timeEnd(`Test ${testIndex} duration`);
    }
    return totalCalibrationResult;
}
function isEquationValid(testValue, equationValues) {
    const possibleResults = evaluate(equationValues);
    // Check if any result matches the testValue
    return possibleResults.some(result => result === testValue);
}
// Recursively evaluate all possible combinations of operators and numbers
function evaluate(equationValues, depth = 0) {
    // Base cases
    if (depth > 5) {
        throw new Error('Recursion depth limit exceeded');
    }
    if (equationValues.length === 1) {
        return equationValues;
    }
    const results = [];
    for (let valueIndex = 0; valueIndex < equationValues.length - 1; valueIndex++) {
        const leftPointer = equationValues[valueIndex];
        const rightPointer = equationValues[valueIndex + 1];
        for (const operator of Object.values(operators)) {
            const combined = operator(leftPointer, rightPointer);
            const newValues = equationValues.slice(0, valueIndex); // Numbers before the pair
            newValues.push(combined);
            newValues.push(...equationValues.slice(valueIndex + 2)); // Numbers after the pair
            //   console.log('newValues', newValues);
            // Recursively evaluate the new array and collect results
            const subResults = evaluate(newValues, depth + 1);
            //   console.log('subResults', subResults);
            results.push(...subResults); // Add sub results to the main list
            //   console.log('possible results', results);
        }
    }
    return results; // Return all possible results
}
const total = getTotalCalibrationResult(input);
// console.log('Total:', total);
