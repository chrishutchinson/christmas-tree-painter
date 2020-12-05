const ws281x = require("rpi-ws281x-native");

let lastOutput;
let brightness = 1;

const rgb2Int = (r, g, b) =>
  ((r & 0xff) << 16) + ((g & 0xff) << 8) + (b & 0xff);

module.exports.initialize = (ledCount) => {
  ws281x.init(ledCount);
};

module.exports.setBrightness = (b) => {
  brightness = b;

  if (!lastOutput) return;

  ws281x.render(
    lastOutput.map(({ r, g, b }) =>
      rgb2Int(g * brightness, r * brightness, b * brightness)
    )
  );
};

module.exports.render = (output) => {
  lastOutput = output;

  ws281x.render(
    output.map(({ r, g, b }) =>
      rgb2Int(g * brightness, r * brightness, b * brightness)
    )
  );
};

module.exports.refreshRate = 1000 / 30;
