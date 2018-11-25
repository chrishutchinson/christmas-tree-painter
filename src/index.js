const ws281x = require('rpi-ws281x-native');
const express = require('express');
const bodyParser = require('body-parser');

const { resetAndExit } = require('./helpers');

const {
  initializePixels,
  setPixelColor,
  getCurrentPixelState,
  setAllPixelsToColor,
  resetAllPixels
} = require('./pixels');

process.on('SIGINT', resetAndExit);

const app = express();

app.use(bodyParser.json());

const LED_COUNT = 50;
ws281x.init(LED_COUNT);

const tree = [
                                [0],
                             [1, 2, 3],
                          [4, 5, 6, 7, 8],
                      [9, 10, 11, 12, 13, 14],
                    [15, 16, 17, 18, 19, 20, 21],
              [22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32],
[33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50],
];

const appState = {
  mode: 'paint',
  pixels: initializePixels(LED_COUNT)
};

const setMode = (mode, args = {}) => {
  appState.mode = mode;

  switch(mode) {
    case 'paint':
      ws281x.render(resetAllPixels());
      break;
    case 'block':
      ws281x.render(setAllPixelsToColor(args.color || { r: 255, g: 255, b: 255 }));
      break;
    // case 'cycle':
    //   ws281x.render(getCurrentPixelState());
    //   break;
  }
};

const setPixel = (pixel, color) => {
  appState.pixels = setPixelColor(pixel, color);

  ws281x.render(appState.pixels);
};

app.post('/pixel/:pixelId', (req, res) => {
  const { pixelId } = req.params;
  const { color } = req.body;

  if(parseInt(pixelId) > LED_COUNT || parseInt(pixelId) < 0) {
    res.status(400).send(`Invalid pixel ID passed, must be between 0 and ${LED_COUNT}`);
    return;
  }

  if(!color) {
    res.status(400).send("Please POST an RGB color object");
    return;
  }
  
  const { r, g, b } = color;

  if([r, g, b].some(v => v > 255 || v < 0)) {
    res.status(400).send("Invalid RGB value passed, must be between 0 and 255");
    return;
  }
  
  setPixelColor(pixelId, { r, g, b });

  res.send(`Pixel #${pixelId} updated to ${r}, ${g}, ${b}`);
});

app.get('/appState', (req, res) => {
  res.json(appState);
});

app.post('/mode/:mode', (req, res) => {
  const { mode } = req.params;
  const { body } = req;

  if(!['cycle', 'paint', 'block'].includes(mode)) {
    res.status(400).send("Invalid mode set, expected one of 'cycle', 'paint' or 'block'");
    return;
  }

  setMode(mode, body);

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

app.listen(3000, () => console.log(`App listening on port 3000!`))