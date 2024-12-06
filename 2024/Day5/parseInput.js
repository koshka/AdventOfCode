function parseInput(isTest = false) {
  const fs = require("fs");

  const inputRules = isTest
    ? fs.readFileSync("testInputRules.txt", "utf-8")
    : fs.readFileSync("inputRules.txt", "utf-8");
  const inputUpdates = isTest
    ? fs.readFileSync("testInputUpdates.txt", "utf-8")
    : fs.readFileSync("inputUpdates.txt", "utf-8");

  const rules = inputRules.split("\n");
  const updates = inputUpdates.split("\n").map((update) => update.split(","));

  return { rules, updates };
}

module.exports = { parseInput };
