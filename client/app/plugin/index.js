'use strict';

angular.module('cmsApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('PluginListing', {
        url: '/plugins',
        templateUrl: 'app/plugin/listing/listing.html',
        controller: 'PluginListingCtrl'
      })
      .state('PluginPage', {
        url: '/plugins/:id',
        templateUrl: 'app/plugin/page/page.html',
        controller: 'PluginCtrl'
      });
  });