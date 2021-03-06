var app = angular.module("ngunyumu", ['firebase', 'ngMaterial', 'angularMoment', 'angular.filter', 'chart.js', 'ui.grid']);
app.factory('TemperaturesService', function($firebaseArray, $firebaseObject) {

    var ref = new Firebase('https://thengunyumu.firebaseio.com');

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
        // console.log(averagetemperature);
        $scope.averagetemperature = averagetemperature;
    });
    // GET humidities
    $scope.humidities = HumiditiesService.getHumidities();
    // console.log($scope.humidities);
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
        // console.log(arrayplay);
        $scope.humiditiesplay = arrayplay;
        var timeplay = [];
        for (var i = 0; i < n; i++)
            timeplay.push(humidities[i].timestamp);
        // console.log(arrayplay);
        $scope.humiditiestime = timeplay;
        // Time Slicing
        var timepoop = timeplay.slice(1).slice(-24);
        var inverttimepoop = timepoop.reverse();
        console.log(inverttimepoop);


        // push array top grid object
        // Create new array-objet
        // for (var i = 0; i < n; i++)
        //     humiditiesgrid.push(humidities[i].average);
        // humiditiesgrid.push(humidities[i].average);


        var humiditiesgrid = [];
        var len = humidities.length;
        for (var i = 0; i < len; i++) {
            humiditiesgrid.push({
                date: humidities[i].day,
                month: humidities[i].month,
                hour: humidities[i].hour,
                amount: humidities[i].average
            });
        }
        // console.log(humiditiesgrid);
        $scope.humiditiesgrided = humiditiesgrid;
        console.log($scope.humiditiesgrid);

        // Do some slicing here
        // var poop = arrayplay.slice(Math.max(arrayplay.length - 5, 1))
        var poop = arrayplay.slice(1).slice(-24);
        var pooped = poop.reverse();

        // humidities array population
        console.log(poop);
        $scope.labels = ["6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM", "8 PM", "9 PM", "10 PM", "11 PM", "12 AM", "1 AM", "2 AM", "3 AM", "4 AM", "5 AM"];
        $scope.label = [inverttimepoop];
        $scope.series = ['Humidities'];
        $scope.humiditydata = [
            pooped.reverse()
        ];
        $scope.axised = ["Hum"];
        $scope.seriesed = ["Humidities"]
        $scope.humdatad = $scope.humiditiesplay;
        console.log($scope.humdatad.length);


        var now = moment().get('hour');
        console.log(now);

        // i couldn't think so u had to type this whole else if 23 times :(
        if (now == 0) {
            $scope.times = ["1 AM", "2 AM", "3 AM", "4 AM", "5 AM", "6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM", "8 PM", "9 PM", "10 PM", "11 PM", "12 AM"];
        } else if (now == 1) {
            $scope.times = ["2 AM", "3 AM", "4 AM", "5 AM", "6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM", "8 PM", "9 PM", "10 PM", "11 PM", "12 AM", "1 AM"];

        } else if (now == 2) {
            $scope.times = ["3 AM", "4 AM", "5 AM", "6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM", "8 PM", "9 PM", "10 PM", "11 PM", "12 AM", "1 AM", "2 AM"];

        } else if (now == 3) {
            $scope.times = ["4 AM", "5 AM", "6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM", "8 PM", "9 PM", "10 PM", "11 PM", "12 AM", "1 AM", "2 AM", "3 AM"];

        } else if (now == 4) {
            $scope.times = ["5 AM", "6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM", "8 PM", "9 PM", "10 PM", "11 PM", "12 AM", "1 AM", "2 AM", "3 AM", "4 AM"];

        } else if (now == 5) {
            $scope.times = ["6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM", "8 PM", "9 PM", "10 PM", "11 PM", "12 AM", "1 AM", "2 AM", "3 AM", "4 AM", "5 AM"];

        } else if (now == 6) {
            $scope.times = ["7 AM", "8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM", "8 PM", "9 PM", "10 PM", "11 PM", "12 AM", "1 AM", "2 AM", "3 AM", "4 AM", "5 AM", "6 AM"];

        } else if (now == 7) {
            $scope.times = ["8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM", "8 PM", "9 PM", "10 PM", "11 PM", "12 AM", "1 AM", "2 AM", "3 AM", "4 AM", "5 AM", "6 AM", "7 AM"];

        } else if (now == 8) {
            $scope.times = ["9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM",
                "7 PM", "8 PM", "9 PM", "10 PM", "11 PM", "12 AM", "1 AM", "2 AM", "3 AM", "4 AM", "5 AM", "6 AM", "7 AM", "8 AM"
            ];

        } else if (now == 9) {
            $scope.times = ["10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM",
                "7 PM", "8 PM", "9 PM", "10 PM", "11 PM", "12 AM", "1 AM", "2 AM", "3 AM", "4 AM", "5 AM", "6 AM", "7 AM", "8 AM", "9 AM"
            ];
        } else if (now == 10) {
            $scope.times = ["11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM",
                "7 PM", "8 PM", "9 PM", "10 PM", "11 PM", "12 AM", "1 AM", "2 AM", "3 AM", "4 AM", "5 AM", "6 AM", "7 AM", "8 AM", "9 AM", "10 AM"
            ];
        } else if (now == 11) {
            $scope.times = ["12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM",
                "7 PM", "8 PM", "9 PM", "10 PM", "11 PM", "12 AM", "1 AM", "2 AM", "3 AM", "4 AM", "5 AM", "6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM"
            ];
        } else if (now == 12) {
            $scope.times = ["1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM",
                "7 PM", "8 PM", "9 PM", "10 PM", "11 PM", "12 AM", "1 AM", "2 AM", "3 AM", "4 AM", "5 AM", "6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM", "12 PM"
            ];
        } else if (now == 13) {
            $scope.times = ["2 PM", "3 PM", "4 PM", "5 PM", "6 PM",
                "7 PM", "8 PM", "9 PM", "10 PM", "11 PM", "12 AM", "1 AM", "2 AM", "3 AM", "4 AM", "5 AM", "6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1 PM"
            ];
        } else if (now == 14) {
            $scope.times = ["3 PM", "4 PM", "5 PM", "6 PM",
                "7 PM", "8 PM", "9 PM", "10 PM", "11 PM", "12 AM", "1 AM", "2 AM", "3 AM", "4 AM", "5 AM", "6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM"
            ];
        } else if (now == 15) {
            $scope.times = ["4 PM", "5 PM", "6 PM", "7 PM", "8 PM", "9 PM", "10 PM", "11 PM", "12 AM", "1 AM", "2 AM", "3 AM", "4 AM", "5 AM", "6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM"];
        } else if (now == 16) {
            $scope.times = ["5 PM", "6 PM", "7 PM", "8 PM", "9 PM", "10 PM", "11 PM", "12 AM", "1 AM", "2 AM", "3 AM", "4 AM", "5 AM", "6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM"];
        } else if (now == 17) {
            $scope.times = ["6 PM", "7 PM", "8 PM", "9 PM", "10 PM", "11 PM", "12 AM", "1 AM", "2 AM", "3 AM", "4 AM", "5 AM", "6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM"];
        } else if (now == 18) {
            $scope.times = ["7 PM", "8 PM", "9 PM", "10 PM", "11 PM", "12 AM", "1 AM", "2 AM", "3 AM", "4 AM", "5 AM", "6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM"];
        } else if (now == 19) {
            $scope.times = ["8 PM", "9 PM", "10 PM", "11 PM", "12 AM", "1 AM", "2 AM", "3 AM", "4 AM", "5 AM", "6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM"];
        } else if (now == 20) {
            $scope.times = ["9 PM", "10 PM", "11 PM", "12 AM", "1 AM", "2 AM", "3 AM", "4 AM", "5 AM", "6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM", " PM"];

        } else if (now == 21) {
            $scope.times = ["10 PM", "11 PM", "12 AM", "1 AM", "2 AM", "3 AM", "4 AM", "5 AM", "6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM", "8 PM", "9 PM"];

        } else if (now == 22) {
            $scope.times = ["11 PM", "12 AM", "1 AM", "2 AM", "3 AM", "4 AM", "5 AM", "6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM", "8 PM", "9 PM", "10 PM"];

        } else if (now == 23) {
            $scope.times = ["12 AM", "1 AM", "2 AM", "3 AM", "4 AM", "5 AM", "6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM", "8 PM", "9 PM", "10 PM", "11 PM"];

        } else {
            $scope.times = ["6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM", "8 PM", "9 PM", "10 PM", "11 PM", "12 AM", "1 AM", "2 AM", "3 AM", "4 AM", "5 AM"];

        }
        // console.log($scope.times);
        var _reversetimes = $scope.times;
        console.log(_reversetimes);
        _reversetimes.reverse();
        // console.log(reversetimes);
        console.log(_reversetimes);
        $scope.humdatad = $scope.times.reverse();




    });

    //array push for temperature
    $scope.temperatures.$loaded().then(function(temperatures) {
        console.log(temperatures.length);
        var n = temperatures.length;
        var arrayplay = [];
        for (var i = 0; i < n; i++)
            arrayplay.push(temperatures[i].average);
        // console.log(arrayplay);
        $scope.temperaturesplay = arrayplay;
        // var nowed = temperatures[2].timestamp.moment().get('year');;
        // console.log(nowed);
        // Create Array For Time
        // new array to hold hourly time from 2 seconds
        var hourtemp = temperatures.slice(1).slice(-1800);
        var houravg = 0;
        var hourtotal = 0;
        for (var i = 0; i < 1800; i++) {
            hourtotal += hourtemp[i];
        }
        var houravg = hourtotal / hourtemp.length;
        console.log(hourtotal);
        $scope.hourtemp = hourtemp;
        $scope.houravg = houravg;
        var timeplay = [];
        for (var i = 0; i < n; i++)
            timeplay.push(temperatures[i].timestamp);
        // console.log(arrayplay);
        $scope.temperaturestime = timeplay;
        // Time Slicing
        var timepoop = timeplay.slice(1).slice(-24);
        var inverttimepoop = timepoop.reverse();
        console.log(inverttimepoop);

        // Do some slicing here
        // var poop = arrayplay.slice(Math.max(arrayplay.length - 5, 1))
        var poop = arrayplay.slice(1).slice(-24);
        var pooped = poop.reverse();

        console.log(pooped);
        console.log(poop);
        $scope.labels = ["6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM", "8 PM", "9 PM", "10 PM", "11 PM", "12 AM", "1 AM", "2 AM", "3 AM", "4 AM", "5 AM"];
        $scope.label = [inverttimepoop];
        $scope.series = ['Temperature'];
        $scope.temperaturedata = [
            pooped.reverse()
        ];
        $scope.seriesed = ["Temperatures"]
        $scope.tempdatad = $scope.temperaturesplay;
        $scope.humdatad = $scope.humiditiesplay;
        console.log($scope.tempdatad.length);
        var janad = temperatures.length - 1;
        var jana_ = temperatures[janad].timestamp;
        var jana = moment(jana_).add(-1, 'days');
        $scope.previousday = jana;
        // var jana = jana_ - 1;
        console.log(jana);
        var now = moment().get('hour');
        console.log(now);

        // i couldn't think so u had to type this whole else if 23 times :(
        if (now == 0) {
            $scope.times = ["1 AM", "2 AM", "3 AM", "4 AM", "5 AM", "6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM", "8 PM", "9 PM", "10 PM", "11 PM", "12 AM"];
        } else if (now == 1) {
            $scope.times = ["2 AM", "3 AM", "4 AM", "5 AM", "6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM", "8 PM", "9 PM", "10 PM", "11 PM", "12 AM", "1 AM"];

        } else if (now == 2) {
            $scope.times = ["3 AM", "4 AM", "5 AM", "6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM", "8 PM", "9 PM", "10 PM", "11 PM", "12 AM", "1 AM", "2 AM"];

        } else if (now == 3) {
            $scope.times = ["4 AM", "5 AM", "6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM", "8 PM", "9 PM", "10 PM", "11 PM", "12 AM", "1 AM", "2 AM", "3 AM"];

        } else if (now == 4) {
            $scope.times = ["5 AM", "6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM", "8 PM", "9 PM", "10 PM", "11 PM", "12 AM", "1 AM", "2 AM", "3 AM", "4 AM"];

        } else if (now == 5) {
            $scope.times = ["6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM", "8 PM", "9 PM", "10 PM", "11 PM", "12 AM", "1 AM", "2 AM", "3 AM", "4 AM", "5 AM"];

        } else if (now == 6) {
            $scope.times = ["7 AM", "8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM", "8 PM", "9 PM", "10 PM", "11 PM", "12 AM", "1 AM", "2 AM", "3 AM", "4 AM", "5 AM", "6 AM"];

        } else if (now == 7) {
            $scope.times = ["8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM", "8 PM", "9 PM", "10 PM", "11 PM", "12 AM", "1 AM", "2 AM", "3 AM", "4 AM", "5 AM", "6 AM", "7 AM"];

        } else if (now == 8) {
            $scope.times = ["9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM",
                "7 PM", "8 PM", "9 PM", "10 PM", "11 PM", "12 AM", "1 AM", "2 AM", "3 AM", "4 AM", "5 AM", "6 AM", "7 AM", "8 AM"
            ];

        } else if (now == 9) {
            $scope.times = ["10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM",
                "7 PM", "8 PM", "9 PM", "10 PM", "11 PM", "12 AM", "1 AM", "2 AM", "3 AM", "4 AM", "5 AM", "6 AM", "7 AM", "8 AM", "9 AM"
            ];
        } else if (now == 10) {
            $scope.times = ["11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM",
                "7 PM", "8 PM", "9 PM", "10 PM", "11 PM", "12 AM", "1 AM", "2 AM", "3 AM", "4 AM", "5 AM", "6 AM", "7 AM", "8 AM", "9 AM", "10 AM"
            ];
        } else if (now == 11) {
            $scope.times = ["12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM",
                "7 PM", "8 PM", "9 PM", "10 PM", "11 PM", "12 AM", "1 AM", "2 AM", "3 AM", "4 AM", "5 AM", "6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM"
            ];
        } else if (now == 12) {
            $scope.times = ["1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM",
                "7 PM", "8 PM", "9 PM", "10 PM", "11 PM", "12 AM", "1 AM", "2 AM", "3 AM", "4 AM", "5 AM", "6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM", "12 PM"
            ];
        } else if (now == 13) {
            $scope.times = ["2 PM", "3 PM", "4 PM", "5 PM", "6 PM",
                "7 PM", "8 PM", "9 PM", "10 PM", "11 PM", "12 AM", "1 AM", "2 AM", "3 AM", "4 AM", "5 AM", "6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1 PM"
            ];
        } else if (now == 14) {
            $scope.times = ["3 PM", "4 PM", "5 PM", "6 PM",
                "7 PM", "8 PM", "9 PM", "10 PM", "11 PM", "12 AM", "1 AM", "2 AM", "3 AM", "4 AM", "5 AM", "6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM"
            ];
        } else if (now == 15) {
            $scope.times = ["4 PM", "5 PM", "6 PM", "7 PM", "8 PM", "9 PM", "10 PM", "11 PM", "12 AM", "1 AM", "2 AM", "3 AM", "4 AM", "5 AM", "6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM"];
        } else if (now == 16) {
            $scope.times = ["5 PM", "6 PM", "7 PM", "8 PM", "9 PM", "10 PM", "11 PM", "12 AM", "1 AM", "2 AM", "3 AM", "4 AM", "5 AM", "6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM"];
        } else if (now == 17) {
            $scope.times = ["6 PM", "7 PM", "8 PM", "9 PM", "10 PM", "11 PM", "12 AM", "1 AM", "2 AM", "3 AM", "4 AM", "5 AM", "6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM"];
        } else if (now == 18) {
            $scope.times = ["7 PM", "8 PM", "9 PM", "10 PM", "11 PM", "12 AM", "1 AM", "2 AM", "3 AM", "4 AM", "5 AM", "6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM"];
        } else if (now == 19) {
            $scope.times = ["8 PM", "9 PM", "10 PM", "11 PM", "12 AM", "1 AM", "2 AM", "3 AM", "4 AM", "5 AM", "6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM"];
        } else if (now == 20) {
            $scope.times = ["9 PM", "10 PM", "11 PM", "12 AM", "1 AM", "2 AM", "3 AM", "4 AM", "5 AM", "6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM", " PM"];

        } else if (now == 21) {
            $scope.times = ["10 PM", "11 PM", "12 AM", "1 AM", "2 AM", "3 AM", "4 AM", "5 AM", "6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM", "8 PM", "9 PM"];

        } else if (now == 22) {
            $scope.times = ["11 PM", "12 AM", "1 AM", "2 AM", "3 AM", "4 AM", "5 AM", "6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM", "8 PM", "9 PM", "10 PM"];

        } else if (now == 23) {
            $scope.times = ["12 AM", "1 AM", "2 AM", "3 AM", "4 AM", "5 AM", "6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM", "8 PM", "9 PM", "10 PM", "11 PM"];

        } else {
            $scope.times = ["6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM", "8 PM", "9 PM", "10 PM", "11 PM", "12 AM", "1 AM", "2 AM", "3 AM", "4 AM", "5 AM"];

        }
        // console.log($scope.times);
        var _reversetimes = $scope.times;
        console.log(_reversetimes);
        _reversetimes.reverse();
        // console.log(reversetimes);
        console.log(_reversetimes);
        $scope.datad = $scope.times.reverse();

        //table data and config
        $scope.selected = [];

        $scope.query = {
            order: 'name',
            limit: 5,
            page: 1
        };
    });

    // $scope.previousmonth = moment().subtract(1, 'months');
    var ans = moment().months(); // Number
    $scope.previousmonth = ans - 1;

    console.log(ans);



});
