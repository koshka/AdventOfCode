const { parseInput } = require("./parseInput");
const input = parseInput();

let result = 0;

// Find all the occurances of "mul(num1, num2)"
const starts = Array.from(input.matchAll(/mul\([0-9]{1,3},[0-9]{1,3}\)/g)).map(
  (res) => res[0]
);

for (let i = 0; i < starts.length; i++) {
  const [num1, num2] = starts[i]
    .substring(4, starts[i].length - 1) // separate "num1,num2" part
    .split(",")
    .map((num) => parseInt(num));
  result += num1 * num2;
}

console.log("result", result);
