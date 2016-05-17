(function () {
    'use strict';

    angular
        .module('app.login')
        .controller('Login', Login);

    function Login($scope, auth, $state, $mdDialog, $mdToast) {
        var vm = this;

        $scope.authWithAccount = function() {
            auth.authenticateWithAccount(vm.username, vm.password)
                .then(function (result) {

                })
                .catch(function () {
                    console.log('authentication failed :(');
                });
        };
    }

})();
