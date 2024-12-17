const { parseInput } = require("./parseInput");
const input = parseInput();

const map = new Map();

// Find all matching sets of antennas
for (let i = 0; i < input.length; i++) {
  for (let j = 0; j < input[0].length; j++) {
    const node = input[i][j];
    if (node != ".") {
      if (map.has(node)) {
        const list = map.get(node);
        map.set(node, [...list, { i, j }]);
      } else {
        map.set(node, [{ i, j }]);
      }
    }
  }
}

const maxRow = input.length - 1;
const maxCol = input[0].length - 1;

const uniqueLocations = new Set();

function addToUniqueLocations(i, j) {
  uniqueLocations.add(`${i},${j}`);
}

function greatestCommonDivider(a, b) {
  const smaller = Math.min(a, b);
  let maxCommonDivider = 1;
  for (let i = 2; i <= smaller; i++) {
    if (a % i == 0 && b % i == 0) {
      maxCommonDivider = i;
    }
  }
  return maxCommonDivider;
}

function findStep(a1, a2) {
  const dX = Math.abs(a1.i - a2.i);
  const dY = Math.abs(a1.j - a2.j);

  // Perfect diagonal
  if (dX == dY) {
    return [1, 1];
  }

  // Find greatest common divider to calculate the smalles step in the
  // direction of the line
  const gcd = greatestCommonDivider(dX, dY);
  return [dX / gcd, dY / gcd];
}

function findAntinodes(a1, a2) {
  const { i: i1, j: j1 } = a1;
  const { i: i2, j: j2 } = a2;

  // For each case check every node outside the space between two matching antennas.
  // Antennas themselves in this case should be included.

  // Same row
  if (i1 == i2) {
    for (let j = 0; j <= maxCol; j++) {
      if (j <= Math.min(j1, j2) || j >= Math.max(j1, j2)) {
        addToUniqueLocations(i1, j);
      }
    }
  }
  // Same column
  else if (j1 == j2) {
    for (let i = 0; i <= maxRow; i++) {
      if (i <= Math.min(i1, i2) || i >= Math.max(i1, i2)) {
        addToUniqueLocations(i, j1);
      }
    }
  }
  // Diagonal \
  else if (Math.sign(i1 - i2) == Math.sign(j1 - j2)) {
    const [stepI, stepJ] = findStep(a1, a2);

    // ↖️
    let i = Math.min(i1, i2);
    let j = Math.min(j1, j2);

    while (i >= 0 && j >= 0) {
      addToUniqueLocations(i, j);
      i -= stepI;
      j -= stepJ;
    }

    // ↘️
    i = Math.max(i1, i2);
    j = Math.max(j1, j2);
    while (i <= maxRow && j <= maxCol) {
      addToUniqueLocations(i, j);
      i += stepI;
      j += stepJ;
    }
  }
  // Diagonal /
  else {
    const [stepI, stepJ] = findStep(a1, a2);

    // ↗️
    let i = Math.min(i1, i2);
    let j = Math.max(j1, j2);
    while (i >= 0 && j <= maxCol) {
      addToUniqueLocations(i, j);
      i -= stepI;
      j += stepJ;
    }

    // ↙️
    i = Math.max(i1, i2);
    j = Math.min(j1, j2);
    while (i <= maxRow && j >= 0) {
      addToUniqueLocations(i, j);
      i += stepI;
      j -= stepJ;
    }
  }
}

const keys = Array.from(map.keys());
for (let i = 0; i < keys.length; i++) {
  const key = keys[i];
  const list = map.get(key);
  // Chech every pair
  for (let j = 0; j < list.length - 1; j++) {
    for (let k = j + 1; k < list.length; k++) {
      findAntinodes(list[j], list[k]);
    }
  }
}

console.log("uniqueLocations", uniqueLocations.size);

// function printResult() {
//   for (let i = 0; i < input.length; i++) {
//     let row = "";
//     for (let j = 0; j < input[0].length; j++) {
//       if (uniqueLocations.has(`${i},${j}`) && input[i][j] == ".") {
//         row += "#";
//       } else {
//         row += input[i][j];
//       }
//     }
//     console.log(row);
//   }
//   console.log("\n");
// }
