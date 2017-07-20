'use strict';

/**
 * @ngdoc directive
 * @name exampleApp.directive:timeSeriesChart
 * @description
 * # timeSeriesChart
 */
angular.module('exampleApp')
  .directive('timeSeriesChart', function () {
    return {
      template: '<div id="chart1"><svg></svg></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        console.log('this is the timeSeriesChart directive', scope.chartData);

        function formatData(response) {
          var data = {'batt':[], 'value':[]};
          // %Y-%m-%d %H:%M:%S
          _.each(response, function(value) {
            data.batt.push({x:Date.parse(value.created.replace(/-/g,"/")), y:value.batt});
            data.value.push({x:Date.parse(value.created.replace(/-/g,"/")), y:value.value});
          });

          return [{key: "Batt",  values: data.batt, color:'#4848DE'},{key: 'Value', values: data.value, color:'#DE1F19'}];
        }

        function buildChart() {
          nv.addGraph(function() {

            var chart = nv.models.lineChart()
                .x(function(d) { return d['x'] })
                .y(function(d) { return d['y'];  });

            chart.dispatch.on('renderEnd', function() {
              console.log('render complete: cumulative line with guide line');
            });
            chart.xAxis.tickFormat(function(d) {
              return d3.time.format('%Y-%m-%d %H:%M:%S')(new Date(d))
            });
            chart.yAxis.tickFormat(d3.format('.1f'));
            chart.xScale(d3.time.scale());
            d3.select('#chart1 svg')
              .datum(formatData(scope.chartData))
              .call(chart);
            nv.utils.windowResize(chart.update);
            return chart;
          });
        }
        buildChart();
      }
    };
  });

