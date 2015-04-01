(function (angular) {
  'use strict';

  var config = function ($stateProvider) {
    $stateProvider.state('PluginPage', {
      url: '/plugins/:id',
      templateUrl: 'app/plugin/plugin.html',
      controller: 'PluginCtrl',
      controllerAs: 'pluginCtrl'
    });
  };

  angular.module('cmsApp')
    .config(config);
})(window.angular);
