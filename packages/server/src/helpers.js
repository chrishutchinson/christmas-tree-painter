const ws281x = require("rpi-ws281x-native");

const resetAndExit = () => {
  ws281x.reset();
  process.nextTick(() => process.exit(0));
};

const delay = (milliseconds = 1000) =>
  new Promise(resolve => setTimeout(resolve, milliseconds));

const colorwheel = position => {
  position = 255 - position;

  const scaledPosition = position * 3;

  if (position < 85)
    return { r: 255 - scaledPosition, g: 0, b: scaledPosition };

  if (position < 170) {
    position -= 85;
    return { r: 0, g: scaledPosition, b: 255 - scaledPosition };
  }

  position -= 170;
  return { r: scaledPosition, g: 255 - scaledPosition, b: 0 };
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
