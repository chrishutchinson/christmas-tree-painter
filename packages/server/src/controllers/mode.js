const { ledCount } = require("../config");
const { colorwheel } = require("../helpers");
const { resetAllPixels } = require("../pixels");
const { ledWipe } = require("../patterns");

let interval;

const setMode = async (req, res) => {
  const { mode } = req.params;

  if (!["cycle", "paint", "random"].includes(mode)) {
    res
      .status(400)
      .send("Invalid mode set, expected one of 'cycle' or 'paint'");
    return;
  }

  if (interval) clearInterval(interval);

  switch (mode) {
    case "cycle":
      let offset = 0;
      let cyclePixels = new Array(ledCount).fill(null);
      interval = setInterval(() => {
        req.ledRenderer.render(
          cyclePixels.map((index) => colorwheel((offset + index) % 256))
        );

        offset = (offset + 1) % 256;
      }, req.ledRenderer.refreshRate);
      break;
    case "random":
      let randomPixels = new Array(ledCount).fill(null);
      interval = setInterval(() => {
        req.ledRenderer.render(
          randomPixels.map(() => ({
            r: Math.floor(Math.random() * 255),
            g: Math.floor(Math.random() * 255),
            b: Math.floor(Math.random() * 255),
          }))
        );
      }, req.ledRenderer.refreshRate * 50);
      break;
    case "paint":
      await ledWipe(req.ledRenderer.render);
      req.ledRenderer.render(resetAllPixels());
      break;
  }

  res.send(`Mode set to '${mode}'!`);
};

module.exports = {
  setMode,
};
