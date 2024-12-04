const { parseInput } = require("./parseInput");
const input = parseInput();

const instructions = Array.from(
  input.matchAll(/((do|don't)\(\))|(mul\([0-9]{1,3},[0-9]{1,3}\))/g)
).map((res) => {
  const str = res[0];
  let isEnabled;
  if (str == "do()") {
    isEnabled = true;
  } else if (str == "don't()") {
    isEnabled = false;
  }
  return { str: res[0], isEnabled };
});

let result = 0;
let isCurrentEnabled = true; // initially enabled

for (let i = 0; i < instructions.length; i++) {
  const { str, isEnabled } = instructions[i];
  // intruction is mul()
  if (isEnabled == null) {
    if (isCurrentEnabled) {
      const [num1, num2] = str
        .substring(4, str.length - 1) // separate "num1,num2" part
        .split(",")
        .map((num) => parseInt(num));
      result += num1 * num2;
    }
    // instruction is do() or don't()
  } else {
    isCurrentEnabled = isEnabled;
  }
}

console.log("result", result);
