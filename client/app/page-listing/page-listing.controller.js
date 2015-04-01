(function (angular) {
  'use strict';

  var PageListingCtrl = function ($http, socket, Auth, $rootScope, PageHelpers, Page) {
    var vm = this;

    this.pages = Page.query();

    socket.syncUpdates('page', this.pages);

    this.parents = this.pages;

    this.childs = [];

    this.newPage = new Page();

    $rootScope.title = 'Pages';

    this.isAdmin = Auth.isAdmin;

    this.addPage = function () {
      this.newPage.$save(function () {
        vm.newPage = new Page();
      });
    };

    this.deletePage = function (page) {
      page.$delete();
    };

    this.getURL = PageHelpers.getURL;

    this.getTitle = PageHelpers.getTitle;

    this.getLink = PageHelpers.getLink;

    this.setLink = function (link) {
      vm.newPage.link = link.replace(/\s+/g, '-').toLowerCase();
    };
  };

  angular.module('cmsApp')
    .controller('PageListingCtrl', PageListingCtrl);
})(window.angular);
