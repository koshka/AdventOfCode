const { parseInput } = require("./parseInput");
let input = parseInput();

const BLINKS = 25;

let stones = [...input];

for (let i = 0; i < BLINKS; i++) {
  let newStones = [];
  for (let j = 0; j < stones.length; j++) {
    const stone = stones[j];
    if (stone == 0) {
      newStones.push(1);
      continue;
    }
    const stoneStr = stone.toString();
    if (stoneStr.length % 2 == 0) {
      const half = stoneStr.length / 2;
      const first = parseInt(stoneStr.slice(0, half));
      const second = parseInt(stoneStr.slice(half));
      newStones.push(first);
      newStones.push(second);
      continue;
    }
    newStones.push(stone * 2024);
  }
  stones = [...newStones];
}

console.log(stones.length);
