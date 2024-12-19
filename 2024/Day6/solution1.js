const { parseInput } = require("./parseInput");
const grid = parseInput();

let guardRow;
let guardCol;

// Find the guard position
for (let i = 0; i < grid.length; i++) {
  for (let j = 0; j < grid[0].length; j++) {
    if (grid[i][j] == "^") {
      guardRow = i;
      guardCol = j;
      break;
    }
  }
}

// Guard leaves if one of the coordinates goes outside of the grid
const maxRow = grid.length - 1;
const maxCol = grid[0].length - 1;

// Initial direction
let direction = "up";

while (
  guardRow >= 0 &&
  guardRow <= maxRow &&
  guardCol >= 0 &&
  guardCol <= maxCol
) {
  grid[guardRow][guardCol] = "X";
  switch (direction) {
    case "up":
      // Leave the grid
      if (guardRow - 1 < 0) {
        guardRow--;
        break;
      }
      // Check if there's an obstacle
      if (grid[guardRow - 1][guardCol] == "#") {
        direction = "right";
      } else {
        guardRow--;
      }
      break;
    case "right":
      // Leave the grid
      if (guardCol + 1 > maxCol) {
        guardCol++;
        break;
      }
      // Check if there's an obstacle
      if (grid[guardRow][guardCol + 1] == "#") {
        direction = "down";
      } else {
        guardCol++;
      }
      break;
    case "down":
      // Leave the grid
      if (guardRow + 1 > maxRow) {
        guardRow++;
        break;
      }
      // Check if there's an obstacle
      if (grid[guardRow + 1][guardCol] == "#") {
        direction = "left";
      } else {
        guardRow++;
      }
      break;
    case "left":
      // Leave the grid
      if (guardCol - 1 < 0) {
        guardCol--;
        break;
      }
      // Check if there's an obstacle
      if (grid[guardRow][guardCol - 1] == "#") {
        direction = "up";
      } else {
        guardCol--;
        break;
      }
  }
}

// Count unique steps
let result = 0;
for (let i = 0; i < grid.length; i++) {
  for (let j = 0; j < grid[0].length; j++) {
    if (grid[i][j] == "X") {
      result++;
    }
  }
}

console.log("result: ", result);
