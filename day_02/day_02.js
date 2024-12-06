import { readFile } from 'node:fs/promises';
const input = await readFile('../inputs/day_02.txt', 'utf-8');
const reports = input
    .trim()
    .split('\n')
    .map(report => {
    return report.split(' ').map(Number);
});
let safeReports = 0;
reports.forEach(report => {
    // Check that the remaining report is ascending
    if (checkReportIsSafe(report)) {
        safeReports++;
    }
});
function checkReportIsSafe(report) {
    let count = 0;
    report.forEach((level, index) => {
        if (index + 1 < report.length) {
            if (report[index + 1] > level) {
                if (Math.abs(report[index + 1] - level) >= 1 && Math.abs(report[index + 1] - level) <= 3) {
                    count++;
                }
            }
        }
    });
    console.log('count: ', count);
    return count === report.length ? true : false;
}
console.log('Total safe reports: ', safeReports);
