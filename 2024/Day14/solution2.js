const { parseInput } = require("./parseInput");
const isTest = false;
let input = parseInput(isTest);

const GRID_WIDTH = isTest ? 11 : 101;
const GRID_HEIGHT = isTest ? 7 : 103;

function printGrid(robots, seconds) {
  console.log(
    `-------------------------------    ${seconds}    -------------------------------`
  );
  const grid = new Array(GRID_HEIGHT).fill(null);
  for (let i = 0; i < grid.length; i++) {
    grid[i] = new Array(GRID_WIDTH).fill(".");
  }
  for (let i = 0; i < robots.length; i++) {
    const [x, y] = robots[i];
    if (grid[y][x] == ".") {
      grid[y][x] = 1;
    } else {
      grid[y][x]++;
    }
  }
  for (let i = 0; i < grid.length; i++) {
    console.log(grid[i].join(""));
  }
  console.log("\n");
}

function simulateGrid(seconds) {
  let robots = [];

  for (let i = 0; i < input.length; i++) {
    const { position, velocity } = input[i];
    const [x, y] = position;
    const [vX, vY] = velocity;

    const deltaX = (Math.abs(vX) * seconds) % GRID_WIDTH;
    const deltaY = (Math.abs(vY) * seconds) % GRID_HEIGHT;
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

  // Sort robots
  robots = robots.sort((r1, r2) => {
    if (r1[0] != r2[0]) {
      return r1[0] - r2[0];
    }
    return r1[1] - r2[1];
  });

  // Find continious vetical set of robots
  let prevY = -1;
  let prevX = -200;
  let cnt = 0;
  for (let i = 0; i < robots.length; i++) {
    const [x, y] = robots[i];
    if (prevX != x) {
      prevX = x;
      cnt = 1;
    } else {
      //
      if (prevY + 1 == y) {
        cnt++;
      } else {
        cnt = 1;
      }
    }
    prevY = y;
    // Find the first Christmas tree appearance
    if (cnt >= 7) {
      console.log("x", x);
      printGrid(robots, seconds);
    }
  }
}

for (let s = 0; s < 10000; s++) {
  simulateGrid(s);
}
