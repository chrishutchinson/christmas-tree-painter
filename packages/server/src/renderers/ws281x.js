const ws281x = require("rpi-ws281x-native");

const rgb2Int = (r, g, b) =>
  ((r & 0xff) << 16) + ((g & 0xff) << 8) + (b & 0xff);

module.exports.initialize = () => {
  ws281x.init(LED_COUNT);
};

module.exports.render = output => {
  ws281x.render(output.map(({ r, g, b }) => rgb2Int(r, g, b)));
};
