const { parseInput } = require("./parseInput");
const reports = parseInput();

let safeCount = 0;
for (let i = 0; i < reports.length; i++) {
  const report = reports[i];

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
  if (isSafe) {
    safeCount++;
  }
}
console.log("safeCount: ", safeCount);
