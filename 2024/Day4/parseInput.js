function parseInput() {
  const fs = require("fs");
  const input = fs.readFileSync("input.txt", "utf-8");
  const split = input.split("\n");

  const table = [];
  for (let i = 0; i < split.length; i++) {
    table.push(split[i].split(""));
  }
  return table;
}

module.exports = { parseInput };
