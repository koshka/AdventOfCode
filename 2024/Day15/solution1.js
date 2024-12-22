const { parseInput } = require("./parseInput");
const isTest = false;
let { grid, steps } = parseInput(isTest);

const BOX = "O";
const ROBOT = "@";
const EMPTY = ".";
const WALL = "#";

// Find robot
let robot = { i: null, j: null };

for (let i = 0; i < grid.length; i++) {
  for (let j = 0; j < grid[0].length; j++) {
    if (grid[i][j] == ROBOT) {
      robot = { i, j };
      break;
    }
  }
}

const stepDelta = {
  "^": [-1, 0],
  v: [1, 0],
  "<": [0, -1],
  ">": [0, 1],
};

printGrid();

// Go through steps
for (let i = 0; i < steps.length; i++) {
  const step = steps[i];
  const delta = stepDelta[step];
  const next = { i: robot.i + delta[0], j: robot.j + delta[1] };
  // Wall, nowhere to move
  if (grid[next.i][next.j] == WALL) {
    // Do nothing
  }
  // Empty space, move one step
  else if (grid[next.i][next.j] == EMPTY) {
    grid[next.i][next.j] = ROBOT;
    grid[robot.i][robot.j] = EMPTY;
    robot = { ...next };
  }
  // Try moving the boxes
  else if (grid[next.i][next.j] == BOX) {
    // Look for an empty space in front of the boxes
    let box = { i: next.i, j: next.j };
    while (grid[box.i][box.j] == BOX) {
      box = { i: box.i + delta[0], j: box.j + delta[1] };
    }
    // Ran into a wall, nowhere to move
    if (grid[box.i][box.j] == WALL) {
      continue;
    }
    // Found an empty space, can move all the boxes
    if (grid[box.i][box.j] == EMPTY) {
      grid[box.i][box.j] = BOX;
      grid[next.i][next.j] = ROBOT;
      grid[robot.i][robot.j] = EMPTY;
      robot = { ...next };
    }
  }
}

function printGrid() {
  for (let i = 0; i < grid.length; i++) {
    console.log(grid[i].join(""));
  }
  console.log("\n");
}

console.log("FINAL GRID");
printGrid();

let result = 0;
for (let i = 0; i < grid.length; i++) {
  for (let j = 0; j < grid[0].length; j++) {
    if (grid[i][j] == BOX) {
      result += i * 100 + j;
    }
  }
}

console.log("result", result);
