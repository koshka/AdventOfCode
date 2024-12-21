const { parseInput } = require("./parseInput");
let input = parseInput();

let result = 0;

// a1 * x + b1 * y = c1
// a2 * x + b2 * y = c2

const delta = 10000000000000;

for (let i = 0; i < input.length; i++) {
  const { a1, a2, b1, b2, c1: c1Init, c2: c2Init } = input[i];
  const c1 = delta + c1Init;
  const c2 = delta + c2Init;

  // There's no solution, two lines are parallel
  if (a1 * b2 === a2 * b1 && a1 * c2 !== a2 * c1) {
    continue;
  }

  // y = (a2 * c1 - a1 * c2) / (a2 * b1 - a1 * b2)
  const numeratorY = a2 * c1 - a1 * c2;
  const denominatorY = a2 * b1 - a1 * b2;

  if (denominatorY == 0 || numeratorY % denominatorY != 0) {
    continue;
  }

  const y = numeratorY / denominatorY;

  // a1 * x + b1 * y = c1
  const x = (c1 - b1 * y) / a1;
  if (x % 1 != 0) {
    continue;
  }
  result += x * 3 + y * 1;
}

console.log("result", result);
