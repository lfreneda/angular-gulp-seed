(function () {
    'use strict';

    angular
        .module('app.dashboard')
        .config(config);

    function config($stateProvider) {

        $stateProvider
            .state('dashboard', {
                parent: 'main',
                url: '/dashboard',
                templateUrl: 'app/dashboard/dashboard.html',
                controller: 'dashboard',
                controllerAs: 'vm'
            });
    }
})();
