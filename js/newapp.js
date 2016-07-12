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
app.controller("MainCtrl", function($scope, MoisturesService) {
  // var ref = new Firebase("https://nelionfarm.firebaseio.com");

  // download the data into a local object
  // $scope.data = $firebaseObject(ref);
  // $scope.moistures = $firebaseArray(ref);

  // console.log($scope.moistures);
  // console.log("File is on");
  // putting a console.log here won't work, see below
  $scope.moistures = MoisturesService.getMoistures();
console.log($scope.moistures);
});
