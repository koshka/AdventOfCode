const { parseInput } = require("./parseInput");
const isTest = false;
let input = parseInput(isTest);

const GRID_WIDTH = isTest ? 11 : 101;
const GRID_HEIGHT = isTest ? 7 : 103;
const SECONDS = 100;

const robots = [];
for (let i = 0; i < input.length; i++) {
  const { position, velocity } = input[i];
  const [x, y] = position;
  const [vX, vY] = velocity;

  const deltaX = (Math.abs(vX) * SECONDS) % GRID_WIDTH;
  const deltaY = (Math.abs(vY) * SECONDS) % GRID_HEIGHT;
  let newX = x + deltaX * Math.sign(vX);
  if (newX < 0) {
    newX = newX + GRID_WIDTH;
  } else if (newX > GRID_WIDTH - 1) {
    newX = newX - GRID_WIDTH;
  }
  let newY = y + deltaY * Math.sign(vY);
  if (newY < 0) {
    newY = newY + GRID_HEIGHT;
  } else if (newY > GRID_HEIGHT - 1) {
    newY = newY - GRID_HEIGHT;
  }

  robots.push([newX, newY]);
}

// Count robots in each quadrant
const quadrants = [0, 0, 0, 0];
const WIDTH_MIDDLE = parseInt(GRID_WIDTH / 2);
const HEIGHT_MIDDLE = parseInt(GRID_HEIGHT / 2);

for (let i = 0; i < robots.length; i++) {
  const [x, y] = robots[i];

  // First
  if (x < WIDTH_MIDDLE && y < HEIGHT_MIDDLE) {
    quadrants[0]++;
    continue;
  }
  // Second
  if (x > WIDTH_MIDDLE && y < HEIGHT_MIDDLE) {
    quadrants[1]++;
    continue;
  }
  // Third
  if (x < WIDTH_MIDDLE && y > HEIGHT_MIDDLE) {
    quadrants[2]++;
    continue;
  }
  // Fourth
  if (x > WIDTH_MIDDLE && y > HEIGHT_MIDDLE) {
    quadrants[3]++;
  }
}

// function printGrid() {
//   const grid = new Array(GRID_HEIGHT).fill(null);
//   for (let i = 0; i < grid.length; i++) {
//     grid[i] = new Array(GRID_WIDTH).fill(".");
//   }
//   for (let i = 0; i < robots.length; i++) {
//     const [x, y] = robots[i];
//     if (grid[y][x] == ".") {
//       grid[y][x] = 1;
//     } else {
//       grid[y][x]++;
//     }
//   }
//   for (let i = 0; i < grid.length; i++) {
//     console.log(grid[i].join(""));
//   }
//   console.log("\n");
// }

let result = 1;
for (let i = 0; i < quadrants.length; i++) {
  result *= quadrants[i];
}
console.log("result", result);
