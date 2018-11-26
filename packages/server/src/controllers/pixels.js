const { ledCount } = require("../config");
const {
  setPixelColor,
  setManyPixelColors,
  getCurrentPixelState
} = require("../pixels");

const setPixel = (req, res) => {
  const { pixelId } = req.params;
  const { color } = req.body;

  console.log(getCurrentPixelState());

  if (parseInt(pixelId) > ledCount || parseInt(pixelId) < 0) {
    res
      .status(400)
      .send(`Invalid pixel ID passed, must be between 0 and ${ledCount}`);
    return;
  }

  if (!color) {
    res.status(400).send("Please POST an RGB color object");
    return;
  }

  const { r, g, b } = color;

  if ([r, g, b].some(v => v > 255 || v < 0)) {
    res.status(400).send("Invalid RGB value passed, must be between 0 and 255");
    return;
  }

  req.ledRenderer.render(setPixelColor(pixelId, { r, g, b }));

  res.send(`Pixel #${pixelId} updated to ${r}, ${g}, ${b}`);
};

const setPixels = (req, res) => {
  const { pixels } = req.body;

  if (!pixels || !Array.isArray(pixels)) {
    res
      .status(400)
      .send(
        "Please POST a pixels array with items of structure `{ r: Int, g: Int, b: Int }`"
      );
    return;
  }

  req.ledRenderer.render(setManyPixelColors(pixels));

  res.send(`${pixels.length} pixels painted!`);
};

module.exports = {
  setPixel,
  setPixels
};
