const { parseInput } = require("./parseInput");
const grid = parseInput();

const maxRow = grid.length - 1;
const maxCol = grid[0].length - 1;

function search(i, j, prev, found, visited) {
  if (i < 0 || i > maxRow || j < 0 || j > maxCol) {
    return;
  }

  const key = `${i},${j}`;

  const curr = grid[i][j];
  if (curr != prev + 1) {
    return;
  }

  if (curr == 9) {
    found.push(key);
    return;
  }
  // Check all four directions
  search(i - 1, j, curr, found, visited); // up
  search(i, j + 1, curr, found, visited); // right
  search(i + 1, j, curr, found, visited); // bottom
  search(i, j - 1, curr, found, visited); // left
}

let result = 0;

for (let i = 0; i < grid.length; i++) {
  for (let j = 0; j < grid[0].length; j++) {
    const curr = grid[i][j];
    if (curr == 0) {
      const found = [];
      const visited = new Set();
      search(i, j, -1, found, visited);
      result += found.length;
    }
  }
}

console.log("result", result);
