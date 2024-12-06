const { parseInput } = require("./parseInput");
const { rules, updates } = parseInput();

const ruleMap = new Map();
for (let i = 0; i < rules.length; i++) {
  ruleMap.set(rules[i], true);
}

function isUpdateValid(update) {
  for (let j = 0; j < update.length; j++) {
    for (let k = j + 1; k < update.length; k++) {
      const firstPage = update[j];
      const secondPage = update[k];
      const brokenRule = secondPage + "|" + firstPage;
      if (ruleMap.has(brokenRule)) {
        return false;
      }
    }
  }
  return true;
}

let result = 0;

for (let i = 0; i < updates.length; i++) {
  let update = updates[i];
  const isValid = isUpdateValid(update);
  if (isValid) {
    continue;
  }

  // Set of all the pages in the update
  const updateSet = new Set();
  for (let j = 0; j < update.length; j++) {
    updateSet.add(update[j]);
  }

  // Rule: "a|b", "a" goes before "b"
  // [b]: {a} - "b" is dependent on "a" to be ahead of it
  const dependencies = {};

  for (let i = 0; i < rules.length; i++) {
    const [first, second] = rules[i].split("|");
    // Rule is irrelevant to this update
    if (!updateSet.has(first) || !updateSet.has(second)) {
      continue;
    }

    if (dependencies[second] == null) {
      dependencies[second] = new Set([first]);
    } else {
      dependencies[second].add(first);
    }
  }

  let sortedUpdate = [];

  // Let's use "update" as a queue and move items from it to the sortedUpdate
  // once they no longer have dependencies (every item that should be before it is alredy in sortedUpdate)
  while (update.length > 0) {
    const current = update.shift(); // get the first element out of the queue

    // Check if current element doesn't have any dependencies
    if (dependencies[current] == null || dependencies[current].size == 0) {
      sortedUpdate.push(current); // added to the end of sorted list

      // Remove 'current' from all the dependencies
      const keys = Object.keys(dependencies);
      for (let k = 0; k < keys.length; k++) {
        dependencies[keys[k]].delete(current);
      }
    } else {
      update.push(current);
    }
  }

  result += parseInt(sortedUpdate[parseInt(sortedUpdate.length / 2)]);
}

console.log("result: ", result);
