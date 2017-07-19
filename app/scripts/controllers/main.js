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
        buildChart();
        return vm;
      });
  }

  function buildChart() {
    console.log('the data from the api', vm.chartData);

    nv.addGraph(function() {
      var chart = nv.models.cumulativeLineChart()
        .useInteractiveGuideline(true)
        .x(function(d) { return d[0] })
        .y(function(d) { return d[1]/100 })
        .color(d3.scale.category10().range())
        .average(function(d) { return d.mean/100; })
        .duration(300)
        .clipVoronoi(false);
      chart.dispatch.on('renderEnd', function() {
        console.log('render complete: cumulative line with guide line');
      });
      chart.xAxis.tickFormat(function(d) {
        return d3.time.format('%m/%d/%y')(new Date(d))
      });
      chart.yAxis.tickFormat(d3.format(',.1%'));
      d3.select('#chart1 svg')
        .datum(vm.chartData)
        .call(chart);
      //TODO: Figure out a good way to do this automatically
      nv.utils.windowResize(chart.update);
      chart.dispatch.on('stateChange', function(e) { nv.log('New State:', JSON.stringify(e)); });
      chart.state.dispatch.on('change', function(state){
        nv.log('state', JSON.stringify(state));
      });
      return chart;
    });


  }

}
