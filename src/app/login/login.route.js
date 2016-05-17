(function () {
    'use strict';

    angular
        .module('app.login')
        .config(config);

    function config($stateProvider) {

        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'app/login/login.html',
                controller: 'Login',
                controllerAs: 'vm'
            });
    }
})();
