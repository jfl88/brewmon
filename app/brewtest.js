(function (){
    'use strict';

    angular
        .module('brewtest', ['nvd3'])
        .controller('homeCtrl', ['$scope','$interval', '$http',
        function ($scope, $interval, $http) {
            $scope.friend = 'alfred';

            $scope.chartOptions = {
                chart: {
                    type: "lineWithFocusChart",
                    height: 450,
                    margin: {
                    top: 20,
                    right: 20,
                    bottom: 40,
                    left: 55
                    },
                    useInteractiveGuideline: true,
                    dispatch: {},
                    xAxis: {
                        tickFormat: function(d) {
                            return d3.time.format('%H:%M:%S')(new Date(d));
                        },
                        axisLabel: "Timestamp"
                    },
                    yAxis: {
                        axisLabel: "Temperature (°C)",
                        axisLabelDistance: -10
                    },
                    x2Axis: {
                        tickFormat: function(d) {
                            return d3.time.format('%d-%m-%Y')(new Date(d));
                        },
                        showMaxMin: false,
                        "axisLabel": null,
                        "height": 60,
                        "ticks": null,
                        "width": 75,
                        "margin": {
                            "top": 0,
                            "right": 0,
                            "bottom": 0,
                            "left": 0
                        },
                        "duration": 250,
                        "orient": "bottom",
                        "tickValues": null,
                        "tickSubdivide": 0,
                        "tickSize": 6,
                        "tickPadding": 5,
                        "domain": [
                            0,
                            1
                        ],
                        "range": [
                            0,
                            1
                        ]   
                    }
                },
                title: {
                    enable: true,
                    text: "Brew Temperature"
                }
            };

            $http.get('/api/brews').then(function success(resp) {
                $scope.currentBrew = resp.data[0];

                $scope.chartData = [
                    {
                        values: [{
                            x: new Date($scope.currentBrew.tempData[0].timestamp),
                            y: $scope.currentBrew.tempData[0].temp
                        }],
                        key: 'Temp'
                    }
                ];
                
                $scope.currentBrew.tempData.forEach(function(record) {
                    $scope.chartData[0].values.push({
                        x: new Date(record.timestamp),
                        y: record.temp
                    });
                });

                console.log('min' + d3.min($scope.chartData[0].values, function (d){ return d.y; }));
            });

          $scope.liveTemp = 0.0;

          var socket = io('http://columbianpow.asuscomm.com:3001');

          socket.on('connect', function () { console.log('connected!'); });
          socket.on('liveTemp', function(data) { 
            console.log('received: ' + data.toString());

            $scope.$apply(function () {
              $scope.liveTemp = data.temp;
            });
          });

        }
    ]);
})();
