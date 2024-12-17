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

const uniqueLocations = new Set();

function findAntinodes(a1, a2) {
  const maxRow = input.length - 1;
  const maxCol = input[0].length - 1;

  const { i: i1, j: j1 } = a1;
  const { i: i2, j: j2 } = a2;

  let an1;
  let an2;

  // Same row
  if (i1 == i2) {
    const diffCol = Math.abs(j1 - j2);
    an1 = { i: i1, j: Math.min(j1, j2) - diffCol };
    an2 = { i: i2, j: Math.max(j1, j2) + diffCol };
  }
  // Same column
  else if (j1 == j2) {
    const diffRow = Math.abs(i1 - i2);
    an1 = { i: Math.min(i1, i2) - diffRow, j: j1 };
    an2 = { i: Math.max(i1, i2) + diffRow, j: j2 };
  }
  // Diagonal \
  else if (Math.sign(i1 - i2) == Math.sign(j1 - j2)) {
    const diffRow = Math.abs(i1 - i2);
    const diffCol = Math.abs(j1 - j2);
    an1 = { i: Math.min(i1, i2) - diffRow, j: Math.min(j1, j2) - diffCol };
    an2 = { i: Math.max(i1, i2) + diffRow, j: Math.max(j1, j2) + diffCol };
  }
  // Diagonal /
  else {
    const diffRow = Math.abs(i1 - i2);
    const diffCol = Math.abs(j1 - j2);
    an1 = { i: Math.min(i1, i2) - diffRow, j: Math.max(j1, j2) + diffCol };
    an2 = { i: Math.max(i1, i2) + diffRow, j: Math.min(j1, j2) - diffCol };
  }

  if (an1.i >= 0 && an1.i <= maxRow && an1.j >= 0 && an1.j <= maxCol) {
    uniqueLocations.add(`${an1.i},${an1.j}`);
  }
  if (an2.i >= 0 && an2.i <= maxRow && an2.j >= 0 && an2.j <= maxCol) {
    uniqueLocations.add(`${an2.i},${an2.j}`);
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
