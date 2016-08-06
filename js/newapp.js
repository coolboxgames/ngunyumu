var app = angular.module("ngunyumu", ['firebase', 'ngMaterial', 'angularMoment', 'nvd3', 'nvd3ChartDirectives', 'angular.filter']);
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

    $scope.temperatures = TemperaturesService.getTemperatures();
    $scope.temperatures.$loaded().then(function(temperatures) {
        console.log(temperatures.length);
        var temperaturestotal = 0;
        var averagetemperature = 0;
        for (var i = 0; i < temperatures.length; i++) {
            // temperaturestotal += temperatures[i].average;
            temperaturestotal += parseInt(temperatures[i].average, 10)
                // console.log(temperatures[i].average);
                // console.log(temperaturestotal);
        }
        var averagetemperature = temperaturestotal / temperatures.length;
        console.log(averagetemperature);
        $scope.averagetemperature = averagetemperature;
    });
    // GET humidities
    $scope.humidities = HumiditiesService.getHumidities();
    console.log($scope.humidities);
    $scope.today = {
        time: new Date()
    };

    $scope.humidities.$loaded().then(function(humidities) {
        console.log(humidities.length);
        var humiditiestotal = 0;
        var averagehumidity = 0;
        for (var i = 0; i < humidities.length; i++) {
            // humiditiestotal += humidities[i].average;
            humiditiestotal += parseInt(humidities[i].average, 10)
                // console.log(humidities[i].average);
                // console.log(humiditiestotal);
        }
        var averagehumidity = humiditiestotal / humidities.length;
        console.log(averagehumidity);
        $scope.averagehumidity = averagehumidity;
    });

    $scope.humidities.$loaded().then(function(humidities) {
        console.log(humidities.length);
        var n = humidities.length;
        var arrayplay = [];
        for (var i = 0; i < n; i++)
            arrayplay.push(humidities[i].average);
        console.log(arrayplay);
        $scope.humiditiesplay = arrayplay;
    });

    //array push for temperature
    $scope.temperatures.$loaded().then(function(temperatures) {
        console.log(temperatures.length);
        var n = temperatures.length;
        var arrayplay = [];
        for (var i = 0; i < n; i++)
            arrayplay.push(temperatures[i].average);
        console.log(arrayplay);
        $scope.temperaturesplay = arrayplay;
    });


});
