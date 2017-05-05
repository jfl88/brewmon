'use strict';

var brewtest = angular.module('brewtest', []);

brewtest.controller('homeCtrl', ['$scope',
    function ($scope) {
        $scope.friend = 'poo';
    }
]);