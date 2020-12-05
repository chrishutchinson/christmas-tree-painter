const express = require("express");

const router = express.Router();

const {
  setPixel,
  setPixels,
  getPixels,
  setPixelBrightness,
  getPixelBrightness,
  getPixelStatus,
  setPixelStatus,
} = require("./controllers/pixels");
const { getTree } = require("./controllers/tree");
const { getColors } = require("./controllers/colors");
const { setMode } = require("./controllers/mode");
const { connect } = require("./controllers/connection");

router.get("/pixels/status", getPixelStatus);
router.post("/pixels/status", setPixelStatus);
router.post("/pixels/brightness", setPixelBrightness);
router.get("/pixels/brightness", getPixelBrightness);
router.post("/pixel/:pixelId", setPixel);
router.post("/pixels", setPixels);
router.get("/pixels", getPixels);

router.get("/tree", getTree);
router.get("/colors", getColors);

router.post("/mode/:mode", setMode);

router.get("/connect", connect());
router.get("/connect/silent", connect("silent"));

module.exports = router;
