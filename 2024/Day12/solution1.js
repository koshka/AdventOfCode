const { parseInput } = require("./parseInput");
let grid = parseInput();

const MAX_ROW = grid.length - 1;
const MAX_COL = grid[0].length - 1;
const MAX_ELEMENT_PERIMETER = 4;

let visited = new Array(grid.length).fill(null);
for (let i = 0; i < visited.length; i++) {
  visited[i] = new Array(grid[0].length).fill(false);
}

function hasAdjacentElement(i, j, type) {
  if (
    i < 0 ||
    i > MAX_ROW ||
    j < 0 ||
    j > MAX_COL ||
    grid[i][j] != type // needs to be the same type
  ) {
    return false;
  }
  return true;
}

function search(i, j, prev) {
  if (
    i < 0 ||
    i > MAX_ROW ||
    j < 0 ||
    j > MAX_COL ||
    visited[i][j] ||
    grid[i][j] != prev // needs to be the same type
  ) {
    return [0, 0];
  }

  visited[i][j] = true;

  const type = grid[i][j];

  // Check all directions to find currentElementPerimeter
  let currentElementPerimeter = MAX_ELEMENT_PERIMETER;
  if (hasAdjacentElement(i - 1, j, type)) {
    currentElementPerimeter--;
  }
  if (hasAdjacentElement(i, j + 1, type)) {
    currentElementPerimeter--;
  }
  if (hasAdjacentElement(i + 1, j, type)) {
    currentElementPerimeter--;
  }
  if (hasAdjacentElement(i, j - 1, type)) {
    currentElementPerimeter--;
  }

  // Find area and perimeter for all adjacent elements that aren't visited yet
  const [topArea, topPerimeter] = search(i - 1, j, type);
  const [rightArea, rightPerimeter] = search(i, j + 1, type);
  const [bottomArea, bottomPerimeter] = search(i + 1, j, type);
  const [leftArea, leftPerimeter] = search(i, j - 1, type);

  const perimeter =
    currentElementPerimeter +
    topPerimeter +
    rightPerimeter +
    bottomPerimeter +
    leftPerimeter;

  const area = 1 + topArea + rightArea + bottomArea + leftArea;

  return [area, perimeter];
}

let result = 0;
for (let i = 0; i < grid.length; i++) {
  for (let j = 0; j < grid[0].length; j++) {
    const curr = grid[i][j];
    const [area, perimeter] = search(i, j, curr);
    result += area * perimeter;
  }
}

console.log("result", result);
