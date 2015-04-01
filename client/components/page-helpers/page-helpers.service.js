'use strict';

angular.module('cmsApp')
  .service('PageHelpers', function () {
    var vm = this,

        getURL = function (parent, link, pages) {
          if (typeof parent !== 'undefined') {
            return '/' + getLink(parent, pages) + '/' + link;
          }

          return '/' + link;
        },

        getTitle = function (id, pages) {
          for (var key in pages) {
            if (pages[key]._id === id) {
              return pages[key].title;
            }
          }
        },

        getLink = function (id, pages) {
          for (var key in pages) {
            if (pages[key]._id === id) {
              return pages[key].link;
            }
          }
        };

    return {
      getURL: getURL,

      getTitle: getTitle,

      getLink: getLink
    };
  });
