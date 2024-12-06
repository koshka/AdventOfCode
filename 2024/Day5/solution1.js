const { parseInput } = require("./parseInput");
const { rules, updates } = parseInput();

const ruleMap = new Map();
for (let i = 0; i < rules.length; i++) {
  ruleMap.set(rules[i], true);
}

let result = 0;

for (let i = 0; i < updates.length; i++) {
  const update = updates[i];
  let isUpdateValid = true;
  for (let j = 0; j < update.length; j++) {
    if (!isUpdateValid) {
      break;
    }
    for (let k = j + 1; k < update.length; k++) {
      const firstPage = update[j];
      const secondPage = update[k];
      const brokenRule = secondPage + "|" + firstPage;
      if (ruleMap.has(brokenRule)) {
        isUpdateValid = false;
        break;
      }
    }
  }

  if (isUpdateValid) {
    result += parseInt(update[parseInt(update.length / 2)]);
  }
}

console.log("result: ", result);
