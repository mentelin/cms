(function (angular) {
  'use strict';

  var AdminCtrl = function ($http, Auth, User) {
    var vm = this;

    this.users = User.query();

    this.delete = function (user) {
      User.remove({
        id: user._id
      });

      angular.forEach(vm.users, function (u, i) {
        if (u === user) {
          vm.users.splice(i, 1);
        }
      });
    };
  };

  angular.module('cmsApp')
    .controller('AdminCtrl', AdminCtrl);
})(window.angular);
