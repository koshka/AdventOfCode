function parseInput(isTest = false) {
  const fs = require("fs");
  const fileName = isTest ? "testInput.txt" : "input.txt";
  const input = fs
    .readFileSync(fileName, "utf-8")
    .split(" ")
    .map((s) => parseInt(s));
  return input;
}

module.exports = { parseInput };
