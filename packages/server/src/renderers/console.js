const chalk = require("chalk");

let tree;

module.exports.initialize = (_, t) => {
  tree = t;
};

module.exports.render = output => {
  tree.forEach(row => {
    const diff = 14 - row.length;

    console.log(
      ...new Array(Math.floor(diff / 2)).fill(" "),
      ...row.map(led => {
        const { r, g, b } = output[led];
        return chalk.rgb(r, g, b)("*");
      }),
      ...new Array(Math.ceil(diff / 2)).fill(" ")
    );
  });
};

module.exports.refreshRate = 100;
