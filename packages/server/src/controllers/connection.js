const { ledWipe } = require("../patterns");
const { resetAllPixels } = require("../pixels");

module.exports.connect = (mode = null) => async (req, res) => {
  if (!mode) {
    await ledWipe(req.ledRenderer.render);
    await ledWipe(req.ledRenderer.render);
    await ledWipe(req.ledRenderer.render);
    req.ledRenderer.render(resetAllPixels());
  }

  res.end();
};
