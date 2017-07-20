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
    return $http.get(endpoint,
      {method:"GET",
      params: formatParams(params)})
      .then(getChartDataComplete)
      .catch(getChartDataFailed);

    function formatParams(params) {
      var formattedParams = {};
      _.each(params, function(param) {
        formattedParams[param.key]=param.value;
      });
      console.log('formattedparams', formattedParams);
      return formattedParams;
    }



    function getChartDataComplete(response) {

      return response.data;
    }

    function getChartDataFailed(error) {
      console.error('XHR Failed for chartData.', error);
      return false;
    }
  }
}
