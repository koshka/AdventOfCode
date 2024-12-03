const { parseInput } = require("./parseInput");
const reports = parseInput();

let safeCount = 0;

function isSafe(report) {
  let isIncreasing;
  let isSafe = true;
  for (let j = 1; j < report.length; j++) {
    const diff = report[j] - report[j - 1];
    if (Math.abs(diff) < 1 || Math.abs(diff) > 3) {
      isSafe = false;
      break;
    }
    if (isIncreasing == undefined) {
      isIncreasing = diff > 0;
    } else {
      // not monotonous increase or decrease
      if ((isIncreasing && diff < 0) || (!isIncreasing && diff > 0)) {
        isSafe = false;
        break;
      }
    }
  }
  return isSafe;
}

for (let i = 0; i < reports.length; i++) {
  const report = reports[i];
  let isReportSafe = isSafe(report);
  if (isReportSafe) {
    safeCount++;
    continue;
  }
  for (let j = 0; j < report.length; j++) {
    const reportSubArray = [...report.slice(0, j), ...report.slice(j + 1)];
    isReportSafe = isSafe(reportSubArray);
    if (isReportSafe) {
      safeCount++;
      break;
    }
  }
}

console.log("safeCount: ", safeCount);
