// const ws281x = require("rpi-ws281x-native");
const express = require("express");
const bodyParser = require("body-parser");

const registerRenderer = require("./renderers");
const { resetAndExit, colorwheel } = require("./helpers");
const tree = require("./tree");

const {
  initializePixels,
  setPixelColor,
  setAllPixelsToColor,
  resetAllPixels,
  setManyPixelColors
} = require("./pixels");

process.on("SIGINT", resetAndExit);

const LED_COUNT = 50;
let cycleInterval;

const app = express();

app.use(bodyParser.json());
app.use((req, res, next) => {
  initializePixels(LED_COUNT);
  next();
});
app.use(registerRenderer("console", LED_COUNT, tree));

app.post("/pixel/:pixelId", (req, res) => {
  const { pixelId } = req.params;
  const { color } = req.body;

  if (parseInt(pixelId) > LED_COUNT || parseInt(pixelId) < 0) {
    res
      .status(400)
      .send(`Invalid pixel ID passed, must be between 0 and ${LED_COUNT}`);
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
});

app.post("/pixels", (req, res) => {
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
});

app.get("/tree", (req, res) => {
  res.json(tree);
});

app.post("/mode/:mode", (req, res) => {
  const { mode } = req.params;
  const { body } = req;

  if (!["cycle", "paint", "block"].includes(mode)) {
    res
      .status(400)
      .send("Invalid mode set, expected one of 'cycle', 'paint' or 'block'");
    return;
  }

  if (cycleInterval) clearInterval(cycleInterval);

  switch (mode) {
    case "cycle":
      let offset = 0;
      cycleInterval = setInterval(() => {
        const pixels = new Array(LED_COUNT)
          .fill(null)
          .map(index => colorwheel((offset + index) % 256));

        offset = (offset + 1) % 256;
        req.ledRenderer.render(pixels);
      }, req.ledRenderer.refreshRate);
      break;
    case "paint":
      req.ledRenderer.render(resetAllPixels());
      break;
    case "block":
      req.ledRenderer.render(setAllPixelsToColor(body.color));
      break;
  }

  res.send(`Mode set to '${mode}'!`);
});

app.listen(3000, () => console.log(`App listening on port 3000!`));
