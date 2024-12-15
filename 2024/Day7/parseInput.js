function parseInput(isTest = false) {
  const fs = require("fs");

  const inputRules = isTest
    ? fs.readFileSync("testInput.txt", "utf-8")
    : fs.readFileSync("input.txt", "utf-8");
  const result = inputRules.split("\n").map((row) => {
    const [res, nums] = row.split(":");
    const numbers = nums
      .trim()
      .split(" ")
      .map((n) => parseInt(n));
    return [parseInt(res), numbers];
  });
  return result;
}

module.exports = { parseInput };
