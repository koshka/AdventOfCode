function parseInput(isTest = false) {
  const fs = require("fs");
  const fileName = isTest ? "testInput.txt" : "input.txt";
  const input = fs
    .readFileSync(fileName, "utf-8")
    .split("\n\n")
    .map((item) => {
      const [button1, button2, prize] = item.split("\n");
      const [a1, a2] = button1.match(/\d+/g).map((n) => parseInt(n));
      const [b1, b2] = button2.match(/\d+/g).map((n) => parseInt(n));
      const [c1, c2] = prize.match(/\d+/g).map((n) => parseInt(n));
      return { a1, a2, b1, b2, c1, c2 };
    });

  // const resultInput = [];
  // for (let i = 0; i < input.length; i++) {}

  return input;
}

module.exports = { parseInput };
