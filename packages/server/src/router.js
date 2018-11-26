const express = require("express");

const router = express.Router();

const { setPixel, setPixels } = require("./controllers/pixels");
const { getTree } = require("./controllers/tree");
const { setMode } = require("./controllers/mode");

router.post("/pixel/:pixelId", setPixel);
router.post("/pixels", setPixels);

router.get("/tree", getTree);

router.post("/mode/:mode", setMode);

router.get("/test", (req, res) => {
  res.end();
});

module.exports = router;
