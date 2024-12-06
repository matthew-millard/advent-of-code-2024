import { readFile } from 'node:fs/promises';
const input = await readFile('../inputs/day_05.txt', 'utf-8');
const [inputRules, inputUpdates] = input.trim().split('\n\n');
const rules = inputRules
    .trim()
    .split('\n')
    .map(rule => {
    return rule.split('|').map(page => Number(page));
});
const updates = inputUpdates
    .trim()
    .split('\n')
    .map(update => update.split(',').map(page => Number(page)));
const rulesMap = new Map();
let sumOfAllMiddlePages = 0;
for (const [key, value] of rules) {
    if (!rulesMap.has(key)) {
        rulesMap.set(key, []);
    }
    rulesMap.get(key).push(value);
}
for (let updateIndex = 0; updateIndex < updates.length; updateIndex++) {
    const update = updates[updateIndex];
    let isValid = true;
    for (let pageIndex = 0; pageIndex < update.length; pageIndex++) {
        const currentPage = update[pageIndex];
        if (!rulesMap.has(currentPage)) {
            // Page isn't in the update, ignore the rule
            console.log('Page:', currentPage, '***No rules apply***');
            continue;
        }
        const currentPageRules = rulesMap.get(currentPage);
        if (!isValidUpdate(currentPage, currentPageRules, update)) {
            isValid = false;
            break;
        }
    }
    if (isValid) {
        const middlePage = update[Math.floor(update.length / 2)];
        sumOfAllMiddlePages += middlePage;
    }
}
console.log('Total of all middle pages:', sumOfAllMiddlePages);
function isValidUpdate(page, rules, updates) {
    const indexOfCurrentPage = updates.indexOf(page);
    for (const rule of rules) {
        const indexOfRule = updates.indexOf(rule);
        if (indexOfRule !== -1 && indexOfRule <= indexOfCurrentPage) {
            return false;
        }
    }
    return true;
}
