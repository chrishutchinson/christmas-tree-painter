const fetch = require("isomorphic-fetch");

let Service;
let Characteristic;

module.exports = (homebridge) => {
  Service = homebridge.hap.Service;
  Characteristic = homebridge.hap.Characteristic;
  homebridge.registerAccessory(
    "christmas-tree-lights-plugin",
    "ChristmasTreeLights",
    ChristmasTreeLights
  );
};

class ChristmasTreeLights {
  constructor(log, config) {
    this.log = log;
    this.lightUrl = config.lightUrl;
  }

  getServices() {
    const informationService = new Service.AccessoryInformation();
    informationService
      .setCharacteristic(Characteristic.Manufacturer, "Chris Hutchinson")
      .setCharacteristic(Characteristic.Model, "ChristmasTreeLights")
      .setCharacteristic(Characteristic.SerialNumber, "808-080-808");

    const treeService = new Service.Lightbulb("Christmas Tree");

    treeService
      .getCharacteristic(Characteristic.On)
      .on("get", this.getSwitchOnCharacteristic.bind(this))
      .on("set", this.setSwitchOnCharacteristic.bind(this));

    treeService
      .addCharacteristic(Characteristic.Brightness)
      .on("get", this.getSwitchBrightnessCharacteristic.bind(this))
      .on("set", this.setSwitchBrightnessCharacteristic.bind(this));

    this.informationService = informationService;
    this.treeService = treeService;
    return [informationService, treeService];
  }

  getSwitchOnCharacteristic(next) {
    fetch(`${this.lightUrl}/api/v1/pixels/status`)
      .then((res) => res.json())
      .then((json) => next(null, json.currentState));
  }

  setSwitchOnCharacteristic(on, next) {
    fetch(`${this.lightUrl}/api/v1/pixels/status`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ targetState: on }),
    }).then(() => next());
  }

  getSwitchBrightnessCharacteristic(next) {
    fetch(`${this.lightUrl}/api/v1/pixels/status`)
      .then((res) => res.json())
      .then((json) => next(null, json.brightness * 100));
  }

  setSwitchBrightnessCharacteristic(value, next) {
    const brightness = parseFloat((value / 100).toFixed(2));

    fetch(`${this.lightUrl}/api/v1/pixels/brightness`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ brightness }),
    }).then(() => next());
  }
}
