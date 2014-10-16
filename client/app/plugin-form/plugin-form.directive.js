'use strict';

angular.module('cmsApp')
  .directive('pluginForm', function () {
    return {
      templateUrl: function (el, attr) {
        return 'app/plugin-form/plugin-' + attr.type + '.html';
      },
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });