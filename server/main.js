var sensorLib = require('node-dht-sensor');
//var sensorLib = require('/home/pi/node-dht-sensor');
var FirebaseClient = require('firebase-client');
var firebase = new FirebaseClient({
  url: "https://ngunyumu.firebaseio.com/",
  auth: "4Zg2MfwPSHZaIhG0MqderUKlt2Yh1sBHcWL54xnn"
});
var moment = require('moment');
moment().format();

var dht_sensor = {
    initialize: function () {
        return sensorLib.initialize(11, 4);
    },
    read: function () {
        var readout = sensorLib.read();
        console.log('Temperature: ' + readout.temperature.toFixed(2) + 'C, ' +
            'humidity: ' + readout.humidity.toFixed(2) + '%');
// set to firebase
/**
firebase
.set('humidities', { value: true })
.then(function(body){
  console.log(body); // returns { value: true }
})
.fail(function(err){
  console.log(err);
});
**/
// push to humidity
firebase
.push('humidities', {
 average:  readout.humidity.toFixed(2),
 timestamp: new Date(),
time: new Date().toJSON,
hour: new Date().getHours(),
month: new Date().getMonth(),
day: new Date().getDate(),
year: new Date().getFullYear()
})
.then(function(body){
  console.log(body); // returns name ref, e.g. { name: "-JR-fhuV6T3vkTNSVrBs" }, of the child resource
})
.fail(function(err){
  console.log(err);
});
// Push to temperature
firebase
.push('temperatures', {
 average:  readout.temperature.toFixed(2),
 timestamp: new Date(),
time: new Date().toJSON,
hour: new Date().getHours(),
month: new Date().getMonth(),
day: new Date().getDate(),
year: new Date().getFullYear()

})
.then(function(body){
  console.log(body); // returns name ref, e.g. { name: "-JR-fhuV6T3vkTNSVrBs" }, of the child resource
})
.fail(function(err){
  console.log(err);
});

       setTimeout(function () {
            dht_sensor.read();
        }, 3600000);
    }
};

if (dht_sensor.initialize()) {
    dht_sensor.read();
} else {
    console.warn('Failed to initialize sensor');
}
