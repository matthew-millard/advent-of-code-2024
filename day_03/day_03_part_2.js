import { readFile } from 'node:fs/promises';
const corruptedMemory = await readFile('../inputs/day_03.txt', 'utf-8');
let total = 0;
let isMulEnabled = true; // default true
const mulRegExp = new RegExp('mul\\((?<first>\\d{1,3}),(?<second>\\d{1,3})\\)', 'g');
const doRegExp = new RegExp('do\\(\\)', 'g');
const dontRegExp = new RegExp("don't\\(\\)", 'g');
// Get matches and attach a type to each match
const mulMatches = [...corruptedMemory.matchAll(mulRegExp)].map(match => ({ type: 'mul', match }));
const doMatches = [...corruptedMemory.matchAll(doRegExp)].map(match => ({ type: 'do', match }));
const dontMatches = [...corruptedMemory.matchAll(dontRegExp)].map(match => ({ type: "don't", match }));
// Combine all matches and sort in order using indexes
const allMatches = [...mulMatches, ...doMatches, ...dontMatches].sort((a, b) => a.match.index - b.match.index);
// Iterate through all matches in order
allMatches.forEach(({ type, match }) => {
    if (type === 'do') {
        // Enable multiplication instructions
        isMulEnabled = true;
    }
    else if (type === "don't") {
        // Disable multiplication instructions
        isMulEnabled = false;
    }
    else if (type === 'mul') {
        if (match.groups && isMulEnabled) {
            // Perform multiplication if enabled
            const arg1 = Number(match.groups['first']);
            const arg2 = Number(match.groups['second']);
            const result = mul(arg1, arg2);
            total += result;
        }
    }
});
console.log('Total sum of results:', total);
function mul(x, y) {
    return x * y;
}
