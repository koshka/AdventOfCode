function parseInput() {
  const fs = require("fs");
  const input = fs.readFileSync("input.txt", "utf-8");
  return input;
}

module.exports = { parseInput };
