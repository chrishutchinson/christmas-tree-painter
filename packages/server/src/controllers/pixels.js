const { ledCount } = require("../config");
const {
  setPixelColor,
  setManyPixelColors,
  getCurrentPixelState,
  getCurrentBrightnessState,
  setBrightness,
  getSwitchState,
  setSwitchState,
  getBlankPixels,
} = require("../pixels");

const getPixelStatus = (req, res) => {
  res.json({
    currentState: getSwitchState(),
  });
};

const setPixelStatus = (req, res) => {
  const currentState = getSwitchState();

  if (req.body.targetState === currentState) {
    res.end();
    return;
  }

  if (req.body.targetState) {
    const pixels = getCurrentPixelState();
    setSwitchState(true);
    req.ledRenderer.render(pixels);
    res.json({
      currentState: true,
    });
    return;
  }

  setSwitchState(false);
  req.ledRenderer.render(getBlankPixels(ledCount));
  res.json({
    currentState: false,
  });
};

const getPixels = (req, res) => {
  const pixels = getCurrentPixelState();

  res.json(pixels);
};

const setPixel = (req, res) => {
  const { pixelId } = req.params;
  const { color } = req.body;

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

  if ([r, g, b].some((v) => v > 255 || v < 0)) {
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

const setPixelBrightness = (req, res) => {
  const { brightness } = req.body;

  if (brightness === false || brightness < 0 || brightness > 1) {
    res.status(400).send("Please POST a brightness value between 0 and 1");
    return;
  }

  req.ledRenderer.setBrightness(setBrightness(brightness));

  res.send(`Brightness set to ${brightness}!`);
};

const getPixelBrightness = (req, res) => {
  res.json(getCurrentBrightnessState());
};

module.exports = {
  setPixel,
  setPixels,
  getPixels,
  setPixelBrightness,
  getPixelBrightness,
  getPixelStatus,
  setPixelStatus,
};
