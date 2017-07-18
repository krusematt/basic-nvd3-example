'use strict';

/**
 * @ngdoc service
 * @name exampleApp.dataService
 * @description
 * # dataService
 * Factory in the exampleApp.
 */
angular.module('exampleApp')
  .factory('dataService', function () {
    // Service logic
    // ...

    var meaningOfLife = 42;

    // Public API here
    return {
      someMethod: function () {
        return meaningOfLife;
      }
    };
  });
