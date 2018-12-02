const ws281x = require("rpi-ws281x-native");

const rgb2Int = (r, g, b) =>
  ((r & 0xff) << 16) + ((g & 0xff) << 8) + (b & 0xff);

module.exports.initialize = ledCount => {
  ws281x.init(ledCount);
};

module.exports.render = output => {
  ws281x.render(output.map(({ r, g, b }) => rgb2Int(g, r, b)));
};

module.exports.refreshRate = 1000 / 30;
