(function (angular) {
  'use strict';

  var config = function ($stateProvider) {
    $stateProvider.state('main', {
      url: '/',
      templateUrl: 'app/main/main.html',
      controller: 'MainCtrl',
      controllerAs: 'mainCtrl'
    });
  };

  angular.module('cmsApp')
    .config(config);
})(window.angular);
