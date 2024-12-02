function parseInput() {
  const fs = require("fs");
  const input = fs.readFileSync("input.txt", "utf-8");
  const split = input.split("\n");
  let list1 = [];
  let list2 = [];

  for (let i = 0; i < split.length; i++) {
    const [first, second] = split[i].split(/\s+/);
    list1.push(parseInt(first));
    list2.push(parseInt(second));
  }
  return [list1, list2];
}

module.exports = { parseInput };
