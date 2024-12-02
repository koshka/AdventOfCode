const { parseInput } = require("./parseInput");

let [list1, list2] = parseInput();
list1 = list1.sort();
list2 = list2.sort();

let result = 0;
for (let i = 0; i < list1.length; i++) {
  result += Math.abs(list1[i] - list2[i]);
}

console.log("result", result);
