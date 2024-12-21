const { parseInput } = require("./parseInput");
let grid = parseInput();

const MAX_ROW = grid.length - 1;
const MAX_COL = grid[0].length - 1;

const CORNER = {
  TOP_LEFT: "TOP_LEFT",
  TOP_RIGHT: "TOP_RIGHT",
  BOTTOM_LEFT: "BOTTOM_LEFT",
  BOTTOM_RIGHT: "BOTTOM_RIGHT",
};

let visited = new Array(grid.length).fill(null);
for (let i = 0; i < visited.length; i++) {
  visited[i] = new Array(grid[0].length).fill(false);
}

function isCorner(adjacent1, adjacent2, diagonal, current) {
  if (adjacent1 == adjacent2 && adjacent1 == current) {
    return diagonal != current;
  }
  if (adjacent1 != current && adjacent2 != current) {
    return true;
  }
  return false;
}

function addToCorners(i, j, location, corners) {
  let corner;
  switch (location) {
    case CORNER.TOP_LEFT:
      corner = `${i},${j}`;
      break;
    case CORNER.TOP_RIGHT:
      corner = `${i},${j + 1}`;
      break;
    case CORNER.BOTTOM_LEFT:
      corner = `${i + 1},${j}`;
      break;
    case CORNER.BOTTOM_RIGHT:
      corner = `${i + 1},${j + 1}`;
  }
  corners.push(corner);
}

function search(i, j, prev, corners) {
  if (
    i < 0 ||
    i > MAX_ROW ||
    j < 0 ||
    j > MAX_COL ||
    visited[i][j] ||
    grid[i][j] != prev // needs to be the same type
  ) {
    return 0;
  }

  visited[i][j] = true;

  const current = grid[i][j];

  // Check corners
  const top = i - 1 >= 0 ? grid[i - 1][j] : null;
  const right = j + 1 <= MAX_COL ? grid[i][j + 1] : null;
  const bottom = i + 1 <= MAX_ROW ? grid[i + 1][j] : null;
  const left = j - 1 >= 0 ? grid[i][j - 1] : null;
  const topLeft = i - 1 >= 0 && j - 1 >= 0 ? grid[i - 1][j - 1] : null; // ↖️
  const topRight = i - 1 >= 0 && j + 1 <= MAX_COL ? grid[i - 1][j + 1] : null; // ↗️
  const bottomLeft = i + 1 <= MAX_ROW && j - 1 >= 0 ? grid[i + 1][j - 1] : null; // ↙️
  const bottomRight =
    i + 1 <= MAX_ROW && j + 1 <= MAX_COL ? grid[i + 1][j + 1] : null; // ↘️

  const isTopLeftCorner = isCorner(top, left, topLeft, current);
  if (isTopLeftCorner) {
    addToCorners(i, j, CORNER.TOP_LEFT, corners);
  }
  const isTopRightCorner = isCorner(top, right, topRight, current);
  if (isTopRightCorner) {
    addToCorners(i, j, CORNER.TOP_RIGHT, corners);
  }
  const isBottomLeftCorner = isCorner(bottom, left, bottomLeft, current);
  if (isBottomLeftCorner) {
    addToCorners(i, j, CORNER.BOTTOM_LEFT, corners);
  }
  const isBottomRightCorner = isCorner(bottom, right, bottomRight, current);
  if (isBottomRightCorner) {
    addToCorners(i, j, CORNER.BOTTOM_RIGHT, corners);
  }

  // Find area all adjacent elements that aren't visited yet
  const topArea = search(i - 1, j, current, corners);
  const rightArea = search(i, j + 1, current, corners);
  const bottomArea = search(i + 1, j, current, corners);
  const leftArea = search(i, j - 1, current, corners);
  const area = 1 + topArea + rightArea + bottomArea + leftArea;
  return area;
}

let result = 0;
for (let i = 0; i < grid.length; i++) {
  for (let j = 0; j < grid[0].length; j++) {
    const curr = grid[i][j];
    const corners = [];
    const area = search(i, j, curr, corners);
    result += area * corners.length;
  }
}

console.log("result", result);
