(function () {
    'use strict';

    angular
        .module('app.layout')
        .controller('Header', Header);

    function Header($scope, authenticatedUser, $state, $timeout, $mdDialog, usersApi) {

        $scope.logout = function () {
            authenticatedUser.logout();
            $timeout(function () {
                $state.go('login');
            }, 2000);
        };
    }
})();
