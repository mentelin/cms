(function (angular) {
  'use strict';

  var config = function ($stateProvider) {
    $stateProvider
      .state('listing', {
        url: '/pages',
        templateUrl: 'app/page-listing/page-listing.html',
        controller: 'PageListingCtrl',
        controllerAs: 'pageListingCtrl'
      });
  };

  angular.module('cmsApp')
    .config(config);
})(window.angular);
