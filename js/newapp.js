var app = angular.module("ngunyumu", ['firebase', 'ngMaterial', 'angularMoment']);
app.factory('TemperaturesService', function($firebaseArray, $firebaseObject) {

  var ref = new Firebase('https://ngunyumu.firebaseio.com');

  return {
    getTemperatures: function() {
      return $firebaseArray(ref.child('temperatures'));
    },
    getTemperature: function(temperatureId) {
      return $firebaseObject(ref.child('temperatures').child(temperatureId));
    }
  }
})
app.factory('HumiditiesService', function($firebaseArray, $firebaseObject) {

  var ref = new Firebase('https://ngunyumu.firebaseio.com');

  return {
    getHumidities: function() {
      return $firebaseArray(ref.child('humidities'));
    },
    getHumidity: function(humidityId) {
      return $firebaseObject(ref.child('humidities').child(humidityId));
    }
  }
})
app.controller("MainCtrl", function($scope, TemperaturesService, HumiditiesService) {
  // var ref = new Firebase("https://nelionfarm.firebaseio.com");

  // download the data into a local object
  // $scope.data = $firebaseObject(ref);
  // $scope.moistures = $firebaseArray(ref);

  // console.log($scope.moistures);
  // console.log("File is on");
  // putting a console.log here won't work, see below
  $scope.temperatures = TemperaturesService.getTemperatures();
  console.log($scope.temperatures);

  // GET humidities
  $scope.humidities = HumiditiesService.getHumidities();
  console.log($scope.humidities);
  $scope.today = {
    time: new Date()
  };
  //average for temperature
  var temperaturestotal = 0;
  var temperatures = $scope.temperatures;
  for (var i = 0; i < temperatures.length; i++) {
    temperaturestotal += temperatures[i];
  }
  var temperaturesavg = temperaturestotal / temperatures.length;
  console.log(temperaturesavg);

  //average for humidities
  var humiditiestotal = 0;
  var humidities = $scope.humidities;
  console.log(humidities[0]);

  for (var i = 0; i < humidities.length; i++) {
    humiditiestotal += humidities[i];
  }
  var humiditiesavg = humiditiestotal / humidities.length;
  console.log(humiditiesavg);
  $scope.average = {
    humidities: humiditiesavg,
    temperatures: temperaturesavg
  };
});
