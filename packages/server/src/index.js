const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const router = require("./router");
const registerRenderer = require("./renderers");
const { resetAndExit } = require("./helpers");
const { tree, ledCount } = require("./config");

const { initializePixels } = require("./pixels");

const APP_PORT = 2811;

// Setup
const app = express();
process.on("SIGINT", resetAndExit);
initializePixels(ledCount);

app.use(bodyParser.json());
app.use(cors());
app.use(registerRenderer("ws281x", ledCount, tree));
app.use("/api/v1", router);

app.listen(APP_PORT, () => console.log(`App listening on port ${APP_PORT}!`));
