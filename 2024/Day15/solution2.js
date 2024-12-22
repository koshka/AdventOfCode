const { parseInput } = require("./parseInput");
const isTest = false;
let { grid: smallGrid, steps } = parseInput(isTest);

const ROBOT = "@";
const EMPTY = ".";
const SMALL_BOX = "O";
const BOX_START = "[";
const BOX_END = "]";
const WALL = "#";

// Create new grid
let grid = [];
for (let i = 0; i < smallGrid.length; i++) {
  let row = [];
  for (let j = 0; j < smallGrid[0].length; j++) {
    const value = smallGrid[i][j];
    if (value == ROBOT) {
      row.push(value);
      row.push(EMPTY);
    } else if (value == SMALL_BOX) {
      row.push("[");
      row.push("]");
    } else {
      row.push(value);
      row.push(value);
    }
  }
  grid.push(row);
}

function printGrid(grid) {
  for (let i = 0; i < grid.length; i++) {
    console.log(grid[i].join(""));
  }
  console.log("\n");
}

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

const DIRECTION = {
  UP: "^",
  DOWN: "v",
  RIGHT: ">",
  LEFT: "<",
};

const stepDelta = {
  [DIRECTION.UP]: [-1, 0],
  [DIRECTION.DOWN]: [1, 0],
  [DIRECTION.LEFT]: [0, -1],
  [DIRECTION.RIGHT]: [0, 1],
};

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
  // Found a box
  else if (step === DIRECTION.LEFT || step == DIRECTION.RIGHT) {
    // ------------- HORIZONTAL MOVEMENT --------------

    // When moving horizontally, only one line of boxes is affected,
    // on the same row. Similar algorithm to Part 1.

    let box = { i: next.i, j: next.j };
    while (grid[box.i][box.j] == BOX_START || grid[box.i][box.j] == BOX_END) {
      box = { i: box.i + delta[0], j: box.j + delta[1] };
    }
    // Ran into a wall, nowhere to move
    if (grid[box.i][box.j] == WALL) {
      continue;
    }
    // Found an empty space, can move all the boxes
    if (grid[box.i][box.j] == EMPTY) {
      // Move backwards to the first position before current robot
      // and shift all boxes by 1

      if (step === DIRECTION.LEFT) {
        for (let j = box.j; j <= next.j; j -= delta[1] * 2) {
          grid[box.i][j] = BOX_START;
          grid[box.i][j + 1] = BOX_END;
        }
      } else {
        for (let j = box.j; j >= next.j; j -= delta[1] * 2) {
          grid[box.i][j] = BOX_END;
          grid[box.i][j - 1] = BOX_START;
        }
      }

      grid[next.i][next.j] = ROBOT;
      grid[robot.i][robot.j] = EMPTY;
      robot = { ...next };
    }
  } else {
    // ------------- VERTICAL MOVEMENT --------------

    // Robot can move multiple rows of boxes, as long as box
    // on a row X touches at least one side of a box on net next row

    // If encountered a wall for at least one element going up/down
    // return "false"; Othewise return all elements that can be moved up/down.
    function search(i, j, deltaI) {
      const nextRowI = i + deltaI;
      const adjacentCell = grid[nextRowI][j];
      let result = [];
      if (adjacentCell == BOX_START) {
        result.push([nextRowI, j], [nextRowI, j + 1]);
      } else if (adjacentCell == BOX_END) {
        result.push([nextRowI, j - 1], [nextRowI, j]);
      } else if (adjacentCell == WALL) {
        return false; // ran into a wall, can't move anything
      }
      let newResult = [];
      for (let ind = 0; ind < result.length; ind++) {
        const item = result[ind];
        const nextRowResult = search(item[0], item[1], deltaI);
        if (nextRowResult === false) {
          return false;
        } else {
          newResult = [...nextRowResult, ...newResult];
        }
      }
      return [...newResult, ...result];
    }

    const deltaI = delta[0];
    const result = search(robot.i, robot.j, deltaI);

    // Found adjacent cells, move everything
    if (result != false) {
      // Copy grid
      const newGrid = new Array(grid.length).fill([]);
      for (let i = 0; i < newGrid.length; i++) {
        newGrid[i] = [...grid[i]];
      }
      // Empty all the old positions in the new grid
      for (let i = 0; i < result.length; i++) {
        const [itemI, itemJ] = result[i];
        newGrid[itemI][itemJ] = ".";
      }

      // Move the boxes
      for (let i = 0; i < result.length; i++) {
        // Coordinates of an element that needs to be moved up/down.
        const [itemI, itemJ] = result[i];
        newGrid[itemI + deltaI][itemJ] = grid[itemI][itemJ];
      }
      // Resave the grid
      grid = newGrid;

      // Move the robot
      grid[next.i][next.j] = ROBOT;
      grid[robot.i][robot.j] = EMPTY;
      robot = { ...next };
    }
  }
}

let result = 0;
for (let i = 0; i < grid.length; i++) {
  for (let j = 0; j < grid[0].length; j++) {
    const item = grid[i][j];
    if (item == BOX_START) {
      result += 100 * i + j;
    }
  }
}

console.log("result", result);
