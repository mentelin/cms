'use strict';

angular.module('cmsApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('PluginListing', {
        url: '/plugin',
        templateUrl: 'app/plugin/listing/listing.html',
        controller: 'PluginListingCtrl'
      })
      .state('PluginPage', {
        url: '/plugin/:link',
        templateUrl: 'app/plugin/page/page.html',
        controller: 'PluginCtrl'
      });
  });