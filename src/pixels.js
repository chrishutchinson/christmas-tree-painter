const { rgb2Int } = require('./helpers');

let pixelData;

module.exports.initializePixels = count => {
  pixelData = new Uint32Array(count);

  return pixelData;
};

module.exports.setPixelColor = (pixelId, { r, g, b}) => {
  pixelData[pixelId] = rgb2Int(r, g, b);

  return pixelData;
}

module.exports.setAllPixelsToColor = ({ r, g, b }) => {
  const color = rgb2Int(r, g, b);

  pixelData = pixelData.fill(color);

  return pixelData;
}

module.exports.resetAllPixels = () => {
  const color = rgb2Int(0, 0, 0);
  
  pixelData = pixelData.fill(color);

  return pixelData;
}

module.exports.getCurrentPixelState = () => pixelData;