'use strict';

var brewtest = angular.module('brewtest', ['nvd3']);

brewtest.controller('homeCtrl', ['$scope','$interval',
    function ($scope, $interval) {
        $scope.friend = 'alfred';

        $scope.chartOptions = {
            chart: {
                type: "lineChart",
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
                yDomain: [0,30]
            },
            title: {
                enable: true,
                text: "Brew Temperature"
            }
        };

        $scope.chartData = [
            {
                values: [{
                    x: new Date(),
                    y: Math.random() * 2 + 15
                }],
                key: 'Temp'
            }
        ];

        $interval(function () {
            $scope.chartData[0].values.push({
                        x: new Date(),
                        y: Math.random() * 2 + 15
                    });
            console.log($scope.chartData);
        }, 1000);
    }
]);