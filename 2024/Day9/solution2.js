const { parseInput } = require("./parseInput");
const input = parseInput();

let isFileBlock = true;
let fileBlockIndex = 0;
let arr = [];

let emptySpaceBlocks = [];
let fileBlocks = [];

let prevBlockEndIndex = -1;

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
    if (curr > 0) {
      fileBlocks.push({
        length: curr,
        startIndex: prevBlockEndIndex + 1,
        value: fileBlockIndex,
      });
    }
    fileBlockIndex++;
  } else {
    if (curr > 0) {
      emptySpaceBlocks.push({
        length: curr,
        startIndex: prevBlockEndIndex + 1,
      });
    }
  }

  prevBlockEndIndex += curr;
  isFileBlock = !isFileBlock;
}

const result = [...arr];

for (let i = fileBlocks.length - 1; i >= 0; i--) {
  const {
    length: fileLength,
    startIndex: fileStartIndex,
    value: fileValue,
  } = fileBlocks[i];
  // Find if there's an empty space that can fit this file

  const availableSpaceIndex = emptySpaceBlocks.findIndex((block) => {
    const { length: spaceLength, startIndex: spaceStartIndex } = block;
    if (spaceLength >= fileLength && spaceStartIndex < fileStartIndex) {
      return true;
    }
  });

  if (availableSpaceIndex != -1) {
    // Move the file to the available space
    const { length: spaceLength, startIndex: spaceStartIndex } =
      emptySpaceBlocks[availableSpaceIndex];

    for (
      let s = spaceStartIndex, f = fileStartIndex;
      s < spaceStartIndex + fileLength, f < fileStartIndex + fileLength;
      s++, f++
    ) {
      result[s] = fileValue;
      result[f] = ".";
    }

    // Re-save available space if there's remaining
    if (fileLength < spaceLength) {
      const newEmptySpace = {
        length: spaceLength - fileLength,
        startIndex: spaceStartIndex + fileLength,
      };
      emptySpaceBlocks[availableSpaceIndex] = newEmptySpace;
    } else {
      emptySpaceBlocks[availableSpaceIndex] = {
        length: 0,
        startIndex: spaceStartIndex,
      };
    }
  }
}

let checksum = 0;
for (let i = 0; i < result.length; i++) {
  const curr = result[i];
  if (curr != ".") {
    checksum += result[i] * i;
  }
}

console.log("checksum", checksum);
