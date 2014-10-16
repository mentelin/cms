'use strict';

angular.module('cmsApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('nav', {
        url: '/nav',
        templateUrl: 'app/nav/nav.html',
        controller: 'NavCtrl'
      });
  });