const { parseInput } = require("./parseInput");
const input = parseInput();

let isFileBlock = true;
let fileBlockIndex = 0;
let arr = [];

// Generate files and empty spaces representation
for (let i = 0; i < input.length; i++) {
  const curr = parseInt(input[i]);
  for (let j = 0; j < curr; j++) {
    if (isFileBlock) {
      arr.push(fileBlockIndex);
    } else {
      arr.push(".");
    }
  }
  if (isFileBlock) {
    fileBlockIndex++;
  }
  isFileBlock = !isFileBlock;
}

// Save all empty space indices
let emptySpaceIndices = [];
for (let i = 0; i < arr.length; i++) {
  const curr = arr[i];
  if (curr === ".") {
    emptySpaceIndices.push(i);
  }
}

const nonEmptySpacesCnt = arr.length - emptySpaceIndices.length;

let result = [...arr];
let lastEmptySpaceArrIndex = 0;
for (let i = arr.length - 1; i >= nonEmptySpacesCnt; i--) {
  const curr = arr[i];
  if (curr !== ".") {
    result[emptySpaceIndices[lastEmptySpaceArrIndex]] = curr;
    result[i] = ".";
    lastEmptySpaceArrIndex++;
  }
}

let checksum = 0;
for (let i = 0; i < nonEmptySpacesCnt; i++) {
  checksum += result[i] * i;
}

console.log("checksum", checksum);
