function parseInput(isTest = false) {
  const fs = require("fs");
  const fileName = isTest ? "testInput.txt" : "input.txt";
  const input = fs.readFileSync(fileName, "utf-8");
  return input;
}

module.exports = { parseInput };