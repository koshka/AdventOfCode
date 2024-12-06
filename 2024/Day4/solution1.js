const { parseInput } = require("./parseInput");
const input = parseInput();

const nextLetterMap = {
  X: "M",
  M: "A",
  A: "S",
};

// searchLetter, i & j are current coordinates
function search(searchLetter, i, j, direction) {
  const currLetter = input[i][j];

  // Cound't find the next letter
  if (currLetter != searchLetter) {
    return 0;
  }

  // Last letter found
  if (currLetter === "S") {
    return 1;
  }

  // For the first letter we will look all 8 directions; for other letter we
  // will only continue search in one direction.
  const isFirstLetter = currLetter == "X";
  const nextLetter = nextLetterMap[currLetter];

  const maxI = input.length - 1;
  const maxJ = input[0].length - 1;

  let count = 0;

  if (j < maxJ && (isFirstLetter || direction == "e")) {
    const east = search(nextLetter, i, j + 1, "e");
    count += east;
  }
  if (j > 0 && (isFirstLetter || direction == "w")) {
    const west = search(nextLetter, i, j - 1, "w");
    count += west;
  }
  if (i > 0 && (isFirstLetter || direction == "n")) {
    const north = search(nextLetter, i - 1, j, "n");
    count += north;
  }
  if (i < maxI && (isFirstLetter || direction == "s")) {
    const south = search(nextLetter, i + 1, j, "s");
    count += south;
  }

  if (i > 0 && j > 0 && (isFirstLetter || direction == "nw")) {
    const northWest = search(nextLetter, i - 1, j - 1, "nw");
    count += northWest;
  }

  if (i < maxI && j < maxJ && (isFirstLetter || direction == "se")) {
    const southEast = search(nextLetter, i + 1, j + 1, "se");
    count += southEast;
  }

  if (i > 0 && j < maxJ && (isFirstLetter || direction == "ne")) {
    const northEast = search(nextLetter, i - 1, j + 1, "ne");
    count += northEast;
  }

  if (i < maxI && j > 0 && (isFirstLetter || direction == "sw")) {
    const southWest = search(nextLetter, i + 1, j - 1, "sw");
    count += southWest;
  }

  return count;
}

let result = 0;
for (let i = 0; i < input.length; i++) {
  for (let j = 0; j < input[0].length; j++) {
    const char = input[i][j];
    if (char == "X") {
      // Initially no direction is set
      const count = search(char, i, j);
      result += count;
    }
  }
}

console.log("result", result);
