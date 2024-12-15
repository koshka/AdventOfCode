const { parseInput } = require("./parseInput");
const input = parseInput();

function isSolvableCheck(operators, numbers, value) {
  let res = numbers[0];
  for (let i = 1; i < numbers.length; i++) {
    const num = numbers[i];
    const op = operators[i - 1];
    if (op == "+") {
      res += num;
    } else {
      res *= num;
    }
  }
  if (res == value) {
    return true;
  }
}

function search(prefix, numbers, value) {
  if (prefix.length == numbers.length - 1) {
    return isSolvableCheck(prefix, numbers, value);
  }
  let isSolvable = search(prefix + "+", numbers, value);
  if (isSolvable) {
    return true;
  }
  return search(prefix + "*", numbers, value);
}

let result = 0;

for (let i = 0; i < input.length; i++) {
  const [value, numbers] = input[i];
  const isCurrSolvable = search("", numbers, value);
  if (isCurrSolvable) {
    result += value;
  }
}

console.log("result", result);
