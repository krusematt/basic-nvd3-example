'use strict';

/**
 * @ngdoc service
 * @name exampleApp.dataService
 * @description
 * # dataService
 * Factory in the exampleApp.
 */
angular.module('exampleApp')
  .factory('DataService', DataService);

DataService.$inject = ['$http'];
function DataService($http) {
  return {
    getChartData: getChartData
  };

  function getChartData(endpoint, params) {
    return $http.get(endpoint, 'http://64.137.170.243/v1/data',
      {method:"GET",
      params: params})
      .then(getChartDataComplete)
      .catch(getChartDataFailed);

    function getChartDataComplete(response) {
      return response.data.results;
    }

    function getChartDataFailed(error) {
      console.error('XHR Failed for chartData.' + error.data);
      return false;
    }
  }
}
