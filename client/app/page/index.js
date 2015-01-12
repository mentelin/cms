'use strict';

angular.module('cmsApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('listing', {
        url: '/pages',
        templateUrl: 'app/page/listing/listing.html',
        controller: 'PageListingCtrl'
      })
      .state('page', {
        url: '/{path:.*}',
        templateUrl: 'app/page/page/page.html',
        controller: 'PageCtrl'
      });
  });