const { parseInput } = require("./parseInput");

let [list1, list2] = parseInput();

const count = {};
for (let i = 0; i < list2.length; i++) {
  const num = list2[i];
  if (count[num] == null) {
    count[num] = 1;
  } else {
    count[num]++;
  }
}

let result = 0;
for (let i = 0; i < list1.length; i++) {
  const num = list1[i];
  const numCount = count[num] ?? 0;
  result += num * numCount;
}

console.log("result", result);
