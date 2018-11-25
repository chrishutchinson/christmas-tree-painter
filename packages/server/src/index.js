// const ws281x = require("rpi-ws281x-native");
const express = require("express");
const bodyParser = require("body-parser");

const renderer = require("./renderers");
const { resetAndExit, colorwheel } = require("./helpers");

const {
  initializePixels,
  setPixelColor,
  setAllPixelsToColor,
  resetAllPixels
} = require("./pixels");

process.on("SIGINT", resetAndExit);

const LED_COUNT = 50;

const app = express();

app.use(bodyParser.json());
app.use((req, res, next) => {
  initializePixels(LED_COUNT);
  next();
});
app.use(renderer("console", LED_COUNT));

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

app.get("/appState", (req, res) => {
  res.json(appState);
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

  switch (mode) {
    case "cycle":
      let offset = 0;
      setInterval(() => {
        const pixels = new Array(LED_COUNT)
          .fill(null)
          .map(index => colorwheel((offset + index) % 256));

        offset = (offset + 1) % 256;
        req.ledRenderer.render(pixels);
      }, 1000 / 30);
      break;
    case "paint":
      req.ledRenderer.render(resetAllPixels);
      break;
    case "block":
      req.ledRenderer.render(setAllPixelsToColor(body.color));
      break;
  }

  res.send(`Set mode to ${mode}!`);
});

// app.get('/red', (req, res) => {
//   const newPixels = pixelData.map(() => rgb2Int(1, 255, 1));
// //  pixelData[0] = rgb2Int(1, 255, 1);
//   ws281x.render(newPixels);
//   res.send("The strip is now red!");
// });

// app.get('/green', (req, res) => {
//   pixelData[0] = rgb2Int(255, 1, 1);
//   ws281x.render(pixelData);
//   res.send("The strip is now green!");
// });

// app.get('/blue', (req, res) => {
//   pixelData[0] = rgb2Int(1, 1, 255);
//   ws281x.render(pixelData);
//   res.send("The strip is now blue!");
// });

app.listen(3000, () => console.log(`App listening on port 3000!`));
