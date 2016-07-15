var app = angular.module("ngunyumu", ['firebase', 'ngMaterial', 'angularMoment']);
app.factory('MoisturesService', function($firebaseArray, $firebaseObject) {

  var ref = new Firebase('https://nelionfarm.firebaseio.com');

  return {
    getMoistures: function() {
      return $firebaseArray(ref.child('moistures'));
    },
    getMoisture: function(moistureId) {
      return $firebaseObject(ref.child('moistures').child(moistureId));
    }
  }
})
app.factory('HumiditiesService', function($firebaseArray, $firebaseObject) {

  var ref = new Firebase('https://nelionfarm.firebaseio.com');

  return {
    getHumidities: function() {
      return $firebaseArray(ref.child('humidities'));
    },
    getHumidity: function(humidityId) {
      return $firebaseObject(ref.child('humidities').child(humidityId));
    }
  }
})
app.controller("MainCtrl", function($scope, MoisturesService, HumiditiesService) {
  // var ref = new Firebase("https://nelionfarm.firebaseio.com");

  // download the data into a local object
  // $scope.data = $firebaseObject(ref);
  // $scope.moistures = $firebaseArray(ref);

  // console.log($scope.moistures);
  // console.log("File is on");
  // putting a console.log here won't work, see below
  $scope.moistures = MoisturesService.getMoistures();
  console.log($scope.moistures);

  // GET humidities
  $scope.humidities = HumiditiesService.getHumidities();
  console.log($scope.humidities);
  $scope.today = {
   time: new Date()
};
});
