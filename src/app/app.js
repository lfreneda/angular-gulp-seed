(function () {
    'use strict';

    angular
        .module('app')
        .config(config)
        .run(runApp);

    function runApp($rootScope, $state, $locale) {
        $locale.id = 'pt-br';
        $rootScope.$state = $state;
    }

    function config($stateProvider, $urlRouterProvider,
        uiGmapGoogleMapApiProvider, $analyticsProvider, $mdDateLocaleProvider, moment) {

        $analyticsProvider.firstPageview(true);
        $analyticsProvider.withAutoBase(true);

        $urlRouterProvider.otherwise('/app/login');

        //uiGmapGoogleMapApiProvider.configure({
        //    key: 'key',
        //    v: '3.20',
        //    libraries: 'geometry,visualization'
        //});

        $mdDateLocaleProvider.formatDate = function (date) {
            return moment(date).format('DD/MM/YYYY');
        };

        document.documentElement.lang = 'pt_BR';

        $stateProvider
            .state('main', {
                url: '/app',
                templateUrl: 'app/layout/shell.html',
                title: 'main'
            });
    }
})();
