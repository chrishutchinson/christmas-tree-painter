# Paint your own Christmas Tree 🎄

> A Node.js server and TypeScript web client allow you to colour in your
> Christmas tree lights

## Compatible lights

- WS2811 and similar (https://www.espruino.com/WS2811)
- No-light testing mode using a console-based tree!

## Pre-requisites

- You'll need a device running Node.js 8+, I've tested using a Raspberry Pi 3
- Some basic wiring will be required to connect up your lights to your device

## Installation

**First!** Clone this repo down to your device

### Node.js server

1. `cd` into the `packages/server` directory
2. Install the dependencies using `$ npm install` or `$ yarn`
3. Start the server by running `$ npm run start` or `$ yarn start`

This will run the server on your device on port `2811`. You can then use the
client app to connect to this server.

### TypeScript Client

**Note!** While you can run your own client app, it is pre-deployed at
https://chrishutchinson.github.io/christmas-tree-painter

1. `cd` into the `packages/client` directory
2. Install the dependencies using `$ npm install` or `$ yarn`
3. Run the app with `$ yarn start`
4. The web UI should open in your browser, enter the IP address or hostname of
   the device running the Node.js server, with the port number `2811`, e.g.
   `192.168.0.10:2811`
