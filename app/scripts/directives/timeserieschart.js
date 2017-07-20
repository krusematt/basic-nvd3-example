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
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the timeSeriesChart directive');
      }
    };
  });
