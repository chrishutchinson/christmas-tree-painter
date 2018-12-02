const ws281x = require("rpi-ws281x-native");

const resetAndExit = () => {
  ws281x.reset();
  process.nextTick(() => process.exit(0));
};

const delay = (milliseconds = 1000) =>
  new Promise(resolve => setTimeout(resolve, milliseconds));

const colorwheel = pos => {
  pos = 255 - pos;
  if (pos < 85) {
    return { r: 255 - pos * 3, g: 0, b: pos * 3 };
  } else if (pos < 170) {
    pos -= 85;
    return { r: 0, g: pos * 3, b: 255 - pos * 3 };
  } else {
    pos -= 170;
    return { r: pos * 3, g: 255 - pos * 3, b: 0 };
  }
};

const flatten = arr =>
  arr.reduce((acc, a) => {
    if (Array.isArray(a)) return [...acc, ...flatten(a)];
    return [...acc, a];
  }, []);

module.exports = {
  resetAndExit,
  delay,
  colorwheel,
  flatten
};
