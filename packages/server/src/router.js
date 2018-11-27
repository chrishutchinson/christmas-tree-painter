const express = require("express");

const router = express.Router();

const { setPixel, setPixels, getPixels } = require("./controllers/pixels");
const { getTree } = require("./controllers/tree");
const { setMode } = require("./controllers/mode");
const { connect } = require("./controllers/connection");

router.post("/pixel/:pixelId", setPixel);
router.post("/pixels", setPixels);
router.get("/pixels", getPixels);

router.get("/tree", getTree);

router.post("/mode/:mode", setMode);

router.get("/connect", connect());
router.get("/connect/silent", connect("silent"));

module.exports = router;
