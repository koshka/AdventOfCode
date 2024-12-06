const { parseInput } = require("./parseInput");
const input = parseInput();

function searchX(i, j) {
  const maxI = input.length - 1;
  const maxJ = input[0].length - 1;

  if (i == 0 || j == 0 || i == maxI || j == maxJ) {
    return 0;
  }

  const nw = input[i - 1][j - 1];
  const se = input[i + 1][j + 1];

  const ne = input[i - 1][j + 1];
  const sw = input[i + 1][j - 1];

  if (
    ((nw == "M" && se == "S") || (nw == "S" && se == "M")) &&
    ((ne == "M" && sw == "S") || (ne == "S" && sw == "M"))
  ) {
    return 1;
  }

  return 0;
}

let result = 0;
for (let i = 0; i < input.length; i++) {
  for (let j = 0; j < input[0].length; j++) {
    const char = input[i][j];
    if (char == "A") {
      const count = searchX(i, j);
      result += count;
    }
  }
}

console.log("result: ", result);
