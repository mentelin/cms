(function (angular) {
  'use strict';

  var PageCtrl = function ($http, $stateParams, socket, Auth, $rootScope, PageHelpers, Page) {
    var vm = this,
        path = $stateParams.path,
        notFound = {
          title: '404 page not found',
          link: path
        },
        pathArr = path.split('/');

    if (typeof pathArr[pathArr.length - 1] === 'undefined') {
      pathArr = pathArr.slice(0, -1);
    }

    this.page = [];

    this.pages = Page.query();

    socket.syncUpdates('page', this.pages);

    this.parents = [];

    this.childs = [];

    this.plugins = [];

    this.predicate = 'order';

    $http.get('/api/pages').success(function (pages) {
      for (var key in pages) {
        if (pathArr.length > 1) {
          for (var i = pathArr.length - 1; i >= 0; i--) {
            if (pages[key].link === pathArr[i]) {
              vm.page = pages[key];
            }
          }
        }
        else {
          if (pages[key].link === pathArr[0]) {
            vm.page = pages[key];
          }
        }

        if (pages[key].link !== pathArr[pathArr.length - 1]) {
          vm.parents.push(pages[key].title);
        }
      }

      for (var val in pages) {
        if (typeof pages[val].parent !== 'undefined' && pages[val].parent === vm.page._id) {
          vm.childs.push(pages[val]);
        }
      }

      if (vm.page.length === 0) {
        vm.page = notFound;
      }

      $rootScope.title = vm.page.title;
    });

    $http.get('/api/plugins').success(function (plugins) {
      for (var key in plugins) {
        if (plugins[key].idPage === vm.page._id) {
          vm.plugins.push(plugins[key]);
        }
      }

      socket.syncUpdates('plugin', vm.plugins);
    });

    this.editPage = function (page) {
      page.$update();
    };

    this.deletePage = function (page) {
      page.$delete();
    };

    this.isLoggedIn = Auth.isLoggedIn;

    this.isAdmin = Auth.isAdmin;

    this.getURL = PageHelpers.getURL;

    this.getTitle = PageHelpers.getTitle;

    this.getLink = PageHelpers.getLink;
  };

  angular.module('cmsApp')
    .controller('PageCtrl', PageCtrl);
})(window.angular);
