var app = angular.module("ngunyumu", ["firebase"]);
app.controller("MainCtrl", function($scope, $firebaseObject) {
  var ref = new Firebase("https://anga-2529d.firebaseio.com");

  // download the data into a local object
  $scope.data = $firebaseObject(ref);
  $scope.moistures = $firebaseArray(ref);

console.log($scope.moistures);
  // putting a console.log here won't work, see below
});
