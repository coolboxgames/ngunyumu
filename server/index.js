var sensorLib = require('node-dht-sensor');
//var sensorLib = require('/home/pi/node-dht-sensor');
var FirebaseClient = require('firebase-client');
var firebase = new FirebaseClient({
  url: "https://ngunyumu.firebaseio.com/",
  auth: "4Zg2MfwPSHZaIhG0MqderUKlt2Yh1sBHcWL54xnn"
});

var dht_sensor = {
  initialize: function() {
    return sensorLib.initialize(11, 4);
  },
  read: function() {
    var readout = sensorLib.read();
    console.log('Temperature: ' + readout.temperature.toFixed(2) + 'C, ' +
      'humidity: ' + readout.humidity.toFixed(2) + '%');
    // set to firebase
    /**
    firebase
    .set('humidity', { value: true })
    .then(function(body){
      console.log(body); // returns { value: true }
    })
    .fail(function(err){
      console.log(err);
    });
    **/
    firebase
      .push('humidities', {
        average: readout.humidity.toFixed(2)
      })
      .then(function(body) {
        console.log(body); // returns name ref, e.g. { name: "-JR-fhuV6T3vkTNSVrBs" }, of the child resource
      })
      .fail(function(err) {
        console.log(err);
      });
      firebase
      .push('temperatures', {
       average:  readout.temperature.toFixed(2),
       timestamp: new Date()
      })
      .then(function(body){
        console.log(body); // returns name ref, e.g. { name: "-JR-fhuV6T3vkTNSVrBs" }, of the child resource
      })
      .fail(function(err){
        console.log(err);
      });

             setTimeout(function () {
                  dht_sensor.read();
              }, 60000);
          }
      };

if (dht_sensor.initialize()) {
  dht_sensor.read();
} else {
  console.warn('Failed to initialize sensor');
}
