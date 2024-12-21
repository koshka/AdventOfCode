const { parseInput } = require("./parseInput");
let input = parseInput();

const BLINKS = 75;

let stoneCount = new Map();

// Create initial stone count map
for (let i = 0; i < input.length; i++) {
  const stone = input[i];
  if (stoneCount.has(stone)) {
    stoneCount.set(stone, stoneCount.get(stone));
  } else {
    stoneCount.set(stone, 1);
  }
}

// Recalculate stone count map for each blink
for (let b = 0; b < BLINKS; b++) {
  const newStoneCount = new Map();
  const keys = Array.from(stoneCount.keys());

  function addNewCount(stone, count) {
    if (newStoneCount.has(stone)) {
      newStoneCount.set(stone, newStoneCount.get(stone) + count);
    } else {
      newStoneCount.set(stone, count);
    }
  }

  for (let k = 0; k < keys.length; k++) {
    const stoneValue = keys[k];
    const count = stoneCount.get(stoneValue);
    // Delete old stone count from the map
    stoneCount.delete(stoneValue);

    // Add new stones with their counts
    if (stoneValue == 0) {
      addNewCount(1, count);
      continue;
    }

    const stoneValueStr = stoneValue.toString();
    if (stoneValueStr.length % 2 == 0) {
      const half = stoneValueStr.length / 2;
      const first = parseInt(stoneValueStr.slice(0, half));
      const second = parseInt(stoneValueStr.slice(half));
      addNewCount(first, count);
      addNewCount(second, count);
      continue;
    }

    addNewCount(stoneValue * 2024, count);
  }

  stoneCount = newStoneCount;
}

let result = 0;
const values = Array.from(stoneCount.values());
for (let i = 0; i < values.length; i++) {
  result += values[i];
}

console.log("result", result);
