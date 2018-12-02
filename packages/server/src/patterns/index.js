const { tree } = require("../config");
const { flatten } = require("../helpers");

module.exports.ledWipe = render =>
  new Promise(resolve => {
    const longestRowLength = tree[tree.length - 1].length - 1;
    const colorSegmentBlock = Math.floor(100 / tree.length);
    let count = 0;

    interval = setInterval(() => {
      if (count === longestRowLength) {
        clearInterval(interval);
        resolve();
      }

      render(
        flatten(
          tree.map((row, rowIndex) =>
            row.map((_, index) =>
              index + Math.ceil((longestRowLength - row.length) / 2) === count
                ? {
                    r: colorSegmentBlock * rowIndex,
                    g: colorSegmentBlock * rowIndex - 55,
                    b: colorSegmentBlock * rowIndex - 155
                  }
                : { r: 0, g: 0, b: 0 }
            )
          )
        )
      );

      count = count + 1;
    }, 100);
  });
