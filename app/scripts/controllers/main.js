'use strict';

/**
 * @ngdoc function
 * @name exampleApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the exampleApp
 */
angular.module('exampleApp')
  .controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['$scope','DataService'];
function MainCtrl($scope, dataService) {
  var vm = this;
  $scope.endpoint = 'http://nvd3.org/examples/cumulativeLineData.json';
  $scope.params = [];
  vm.chartData = [];
  //fetch();

  $scope.addParam = function() {
    console.log('inaddparam');
    $scope.params.push({'key':'', 'value': ''});
  }

  $scope.removeParam = function(param) {
    $scope.params.splice($scope.params.indexOf(param), 1);
  }

  $scope.generate = function() {
    fetch();
  }


  function fetch() {
    return getData().then(function() {
      //logger.info('chart data received');
      console.info('chart data received');
    });
  }

  function getData() {
    // 'http://64.137.170.243/v1/data', {'enrollid':'sdfsdfsdf','deviceid':'1944566','since':'2017-06-30T09:00:00'}
    return dataService.getChartData($scope.endpoint, $scope.params)
      .then(function(data) {
        vm.chartData = data;
        return vm;
      });
  }

}
