function parseInput() {
  const fs = require("fs");
  const input = fs.readFileSync("input.txt", "utf-8");
  const reportStrings = input.split("\n");
  let reports = [];

  for (let i = 0; i < reportStrings.length; i++) {
    const report = reportStrings[i].split(" ").map((item) => parseInt(item));
    reports.push(report);
  }
  return reports;
}

module.exports = { parseInput };
