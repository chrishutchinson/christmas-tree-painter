const fetch = require('isomorphic-fetch');

let Service;
let Characteristic;

module.exports = homebridge => {
  Service = homebridge.hap.Service;
  Characteristic  = homebridge.hap.Characteristic;
  homebridge.registerAccessory("christmas-tree-lights-plugin", "ChristmasTreeLights", christmasTreeLights);
}

const christmasTreeLights = function(log, config) {
  this.log = log;
  this.lightUrl = config.lightUrl;
};

christmasTreeLights.prototype = {
  getServices: function() {
    let informationService = new Service.AccessoryInformation();
    informationService
      .setCharacteristic(Characteristic.Manufacturer, "Chris Hutchinson")
      .setCharacteristic(Characteristic.Model, "ChristmasTreeLights")
      .setCharacteristic(Characteristic.SerialNumber, "808-080-808");
 
    let switchService = new Service.Switch("Christmas Tree");
    switchService
      .getCharacteristic(Characteristic.On)
        .on('get', this.getSwitchOnCharacteristic.bind(this))
        .on('set', this.setSwitchOnCharacteristic.bind(this));
 
    this.informationService = informationService;
    this.switchService = switchService;
    return [informationService, switchService];
  },
  getSwitchOnCharacteristic: function (next) {
    const me = this;
    fetch(`${me.lightUrl}/api/v1/status`)
      .then(res => res.json())
      .then(json => {
        return next(null, json.currentState);
      }); 
  },
   
  setSwitchOnCharacteristic: function (on, next) {
    const me = this;
    me.log({on});
    fetch(`${me.lightUrl}/api/v1/status`, {
      method: 'post',
      headers: {
       'Content-Type': 'application/json'
      },
      body: JSON.stringify({ targetState: on })
    })
    .then(() => next()); 
  }
};
