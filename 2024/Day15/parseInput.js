function parseInput(isTest = false) {
  const fs = require("fs");
  const fileName = isTest ? "testInput.txt" : "input.txt";
  const [grid, steps] = fs.readFileSync(fileName, "utf-8").split("\n\n");
  return {
    grid: grid.split("\n").map((row) => row.split("")),
    steps: steps.split("\n").join(""),
  };
}

module.exports = { parseInput };
