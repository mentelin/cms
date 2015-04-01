(function (angular) {
  'use strict';

  var config = function ($stateProvider) {
    $stateProvider.state('PluginListing', {
      url: '/plugins',
      templateUrl: 'app/plugin-listing/plugin-listing.html',
      controller: 'PluginListingCtrl',
      controllerAs: 'pluginListingCtrl'
    });
  };

  angular.module('cmsApp')
    .config(config);
})(window.angular);