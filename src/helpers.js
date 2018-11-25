const ws281x = require('rpi-ws281x-native');

module.exports.resetAndExit = () => {
  ws281x.reset();
  process.nextTick(() => process.exit(0));
};

module.exports.rgb2Int = (r, g, b) => ((r & 0xff) << 16) + ((g & 0xff) << 8) + (b & 0xff);