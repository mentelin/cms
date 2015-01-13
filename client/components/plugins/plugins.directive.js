'use strict';

angular.module('cmsApp')
  .directive('pluginForm', function () {
    return {
      templateUrl: function (el, attr) {
        return 'components/plugins/' + attr.type + '/' + attr.type + '.html';
      },
      restrict: 'EA',
      link: function (scope, element, attrs) {
        console.log(scope, element, attrs);
      }
    };
  });