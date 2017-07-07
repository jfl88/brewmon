(function (){
    'use strict';

    angular
        .module('brewtest', ['nvd3'])
        .controller('homeCtrl', ['$scope','$interval', '$http',
        function ($scope, $interval, $http) {
            $http.get('/api/brews').then(function success(resp) {
                $scope.currentBrew = resp.data[0];
                
                $scope.brewData = [{
                    x: [],
                    y: [],
                    type: 'scatter'
                }];

                var layout = {
                    title: 'Brew Temperature',
                    showlegend: false,
                    xaxis: { title: 'Date / Time' },
                    yaxis: { title: 'Temperature (°C)', nticks: 10 }
                };

                $scope.currentBrew.tempData.forEach(function(record) {
                    $scope.brewData[0].x.push(new Date(record.timestamp));
                    $scope.brewData[0].y.push(record.temp)
                });

                Plotly.newPlot('brewGraph', $scope.brewData, layout, { displaylogo: false });
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
