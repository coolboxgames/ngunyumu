// var app = angular.module("ngunyumu", ["firebase"]);
// app.factory('MoisturesService', function($firebaseArray, $firebaseObject) {
//
//   var ref = new Firebase('https://anga-2529d.firebaseio.com');
//
//   return {
//     getMoistures: function() {
//       return $firebaseArray(ref.child('moistures'));
//     },
//     getMoisture: function(moistureId) {
//       return $firebaseObject(ref.child('moistures').child(moistureId));
//     }
//   }
// })
// app.controller("MainCtrl", function($scope, $firebaseObject, MoisturesService) {
//   var ref = new Firebase("https://anga-2529d.firebaseio.com");
//
//   // download the data into a local object
//   // $scope.data = $firebaseObject(ref);
//   // $scope.moistures = $firebaseArray(ref);
//
//   // console.log($scope.moistures);
//   // console.log("File is on");
//   // putting a console.log here won't work, see below
//   $scope.moistures = MoisturesService.getMoistures();
// console.log($scope.moistures);
// });
