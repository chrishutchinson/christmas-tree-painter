const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const args = require("args");

const router = require("./router");
const { registerRenderer, validRenderers } = require("./renderers");
const { resetAndExit } = require("./helpers");
const { tree, ledCount } = require("./config");

const { initializePixels } = require("./pixels");

const APP_PORT = 2811;

args.option("renderer", "The renderer to use to output the lights", "ws281x");

const flags = args.parse(process.argv);

if (!validRenderers.includes(flags.renderer)) {
  console.error(
    "Please provide a valid renderer, options:",
    validRenderers.join(", ")
  );
  process.exit(0);
}

// Setup
const app = express();
process.on("SIGINT", resetAndExit);
initializePixels(ledCount);

app.use(bodyParser.json());
app.use(cors());
app.use(registerRenderer(flags.renderer, ledCount, tree));
app.use("/api/v1", router);

app.listen(APP_PORT, () => console.log(`App listening on port ${APP_PORT}!`));
