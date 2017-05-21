'use strict';

var brewtest = angular.module('brewtest', ['nvd3']);

brewtest.controller('homeCtrl', ['$scope','$interval', '$http',
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
                yDomain: [18,23],
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

        $http.get('/api/temps').then(function success(resp) {
            console.log(resp.data);
            
            console.log(resp.data[0]);

            $scope.chartData = [
                {
                    values: [{
                        x: new Date(resp.data[0].timestamp),
                        y: resp.data[0].temp
                    }],
                    key: 'Temp'
                }
            ];
            
            resp.data.forEach(function(record) {
                $scope.chartData[0].values.push({
                    x: new Date(record.timestamp),
                    y: record.temp
                });
            });
        });

        // $interval(function () {
        //     $scope.chartData[0].values.push({
        //                 x: new Date(),
        //                 y: Math.random() * 2 + 15
        //             });
        //     console.log($scope.chartData);
        // }, 1000);
    }
]);