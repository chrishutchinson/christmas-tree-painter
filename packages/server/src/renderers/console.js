const chalk = require("chalk");

let tree;
let lastOutput;
let brightness = 1;

const setOutput = (output) => {
  const maxRow = tree.reduce(
    (acc, row) => (row.length > acc ? row.length : acc),
    0
  );
  return tree.forEach((row) => {
    const diff = maxRow - row.length;

    console.log(
      ...new Array(Math.floor(diff / 2)).fill(" "),
      ...row.map((led) => {
        const { r, g, b } = output[led];
        return chalk.rgb(r * brightness, g * brightness, b * brightness)("*");
      }),
      ...new Array(Math.ceil(diff / 2)).fill(" ")
    );
  });
};

module.exports.initialize = (_, t) => {
  tree = t;
};

module.exports.setBrightness = (b) => {
  brightness = b;

  if (!lastOutput) return;

  setOutput(lastOutput);
};

module.exports.render = (output) => {
  lastOutput = output;
  setOutput(output);
  console.log("\n");
};

module.exports.refreshRate = 50;
