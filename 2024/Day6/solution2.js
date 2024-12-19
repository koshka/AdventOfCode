const { parseInput } = require("./parseInput");
const grid = parseInput();

const NEXT_DIRECTION = {
  up: "right",
  right: "down",
  down: "left",
  left: "up",
};

// Guard leaves if one of the coordinates goes outside of the grid
const maxRow = grid.length - 1;
const maxCol = grid[0].length - 1;

let initialDirection = "up";
let initialRow;
let initialCol;

// Find the initial guard position
for (let i = 0; i < grid.length; i++) {
  for (let j = 0; j < grid[0].length; j++) {
    if (grid[i][j] == "^") {
      initialRow = i;
      initialCol = j;
      break;
    }
  }
}

function getKey(row, col) {
  return `${row},${col}`;
}

function parseKey(key) {
  return key.split(",").map((v) => parseInt(v));
}

function simulatePath(
  grid,
  startDirection,
  startRow,
  startCol,
  isObstacleTest = false
) {
  let guardRow = startRow;
  let guardCol = startCol;
  let direction = startDirection;

  let visitedMap = new Map();

  while (
    guardRow >= 0 &&
    guardRow <= maxRow &&
    guardCol >= 0 &&
    guardCol <= maxCol
  ) {
    const key = getKey(guardRow, guardCol);
    const directionsList = visitedMap.get(key);

    if (directionsList != null) {
      // Found a loop; shouldn't happen for the initial run
      if (directionsList.includes(direction)) {
        if (isObstacleTest) {
          return { visitedMap, isLoopFound: true };
        }
      } else {
        visitedMap.set(key, [...directionsList, direction]);
      }
    } else {
      visitedMap.set(key, [direction]);
    }

    let nextRow;
    let nextCol;

    switch (direction) {
      case "up":
        nextRow = guardRow - 1;
        nextCol = guardCol;

        // Leave the grid
        if (nextRow < 0) {
          guardRow--;
          break;
        }
        // Check if there's an obstacle
        if (grid[nextRow][nextCol] == "#") {
          direction = NEXT_DIRECTION[direction];
        } else {
          guardRow--;
        }
        break;
      case "right":
        nextRow = guardRow;
        nextCol = guardCol + 1;
        // Leave the grid
        if (nextCol > maxCol) {
          guardCol++;
          break;
        }
        // Check if there's an obstacle
        if (grid[nextRow][nextCol] == "#") {
          direction = NEXT_DIRECTION[direction];
        } else {
          guardCol++;
        }
        break;
      case "down":
        nextRow = guardRow + 1;
        nextCol = guardCol;
        // Leave the grid
        if (nextRow > maxRow) {
          guardRow++;
          break;
        }
        // Check if there's an obstacle
        if (grid[nextRow][nextCol] == "#") {
          direction = NEXT_DIRECTION[direction];
        } else {
          guardRow++;
        }
        break;
      case "left":
        nextRow = guardRow;
        nextCol = guardCol - 1;

        // Leave the grid
        if (nextCol < 0) {
          guardCol--;
          break;
        }
        // Check if there's an obstacle
        if (grid[nextRow][nextCol] == "#") {
          direction = NEXT_DIRECTION[direction];
        } else {
          guardCol--;
          break;
        }
    }
  }

  return { visitedMap, isLoopFound: false };
}

// Find the initial path
const { visitedMap } = simulatePath(
  grid,
  initialDirection,
  initialRow,
  initialCol,
  false
);

// For each point from the inital path try to set an obtacle on it and test if there's a loop
const visitedCells = Array.from(visitedMap.keys()).map((key) => parseKey(key));

let result = 0;

// Skip the initial position; can't place an obstacle there
for (let i = 1; i < visitedCells.length; i++) {
  const [testRow, testCol] = visitedCells[i];

  const testGrid = grid.map((row, rowIndex) => {
    return row.map((value, colIndex) => {
      if (rowIndex == testRow && colIndex == testCol) {
        return "#";
      } else {
        return value;
      }
    });
  });

  const { isLoopFound } = simulatePath(
    testGrid,
    initialDirection,
    initialRow,
    initialCol,
    true
  );
  if (isLoopFound) {
    result++;
  }
}

console.log("result", result);
