function parseInput(isTest = false) {
  const fs = require("fs");
  const fileName = isTest ? "testInput.txt" : "input.txt";
  const input = fs
    .readFileSync(fileName, "utf-8")
    .split("\n")
    .map((row) => {
      const [position, velocity] = row.split(" ").map((item) =>
        item
          .slice(2)
          .split(",")
          .map((n) => parseInt(n))
      );
      return { position, velocity };
    });
  return input;
}

module.exports = { parseInput };
