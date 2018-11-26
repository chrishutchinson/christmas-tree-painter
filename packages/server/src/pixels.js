const delay = (time = 500) => new Promise(resolve => setTimeout(resolve, time));

let pixelData;

module.exports.initializePixels = count => {
  pixelData = new Array(count).fill({ r: 0, g: 0, b: 0 });

  return pixelData;
};

module.exports.setPixelColor = (pixelId, { r, g, b }) => {
  pixelData[pixelId] = { r, g, b };

  return pixelData;
};

module.exports.setAllPixelsToColor = ({ r, g, b }) => {
  const color = { r, g, b };

  pixelData = pixelData.fill(color);

  return pixelData;
};

const setManyPixelColors = (module.exports.setManyPixelColors = pixels => {
  pixels.forEach(({ r, g, b }, pixelId) => {
    pixelData[pixelId] = { r, g, b };
  });

  return pixelData;
});

const resetAllPixels = (module.exports.resetAllPixels = () => {
  const color = { r: 0, g: 0, b: 0 };

  pixelData = pixelData.fill(color);

  return pixelData;
});

module.exports.getCurrentPixelState = () => pixelData;
