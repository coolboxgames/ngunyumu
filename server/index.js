var sensorLib = require('node-dht-sensor');
var firebase = require("firebase");
var CronJob = require('cron').CronJob;
// var myFirebaseRef = new Firebase("https://anga-2529d.firebaseio.com/");

var dht_sensor = {
  initialize: function() {
    return sensorLib.initialize(11, 4);
  },
  read: function() {
    var readout = sensorLib.read();
    console.log('Temperature: ' + readout.temperature.toFixed(2) + 'C, ' +
      'humidity: ' + readout.humidity.toFixed(2) + '%');
    // save function here
    setTimeout(function() {
      dht_sensor.read();
    }, 2000);
  }
};

if (dht_sensor.initialize()) {
  dht_sensor.read();
} else {
  console.warn('Failed to initialize sensor');
}
myFirebaseRef.set({
  Date: new Date(),
  location: {
    city: "San Francisco",
    state: "California",
    zip: 94103
  }
});
