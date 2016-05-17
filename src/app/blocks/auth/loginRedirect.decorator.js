(function () {
    'use strict';

    angular.module('blocks.auth')
        .factory('loginRedirect', loginRedirect)
        .config(configureLoginRedirect);

    function loginRedirect($q, $injector) {

        return {
            responseError: responseError
        };

        function responseError(response) {
            if (response.status === 401) {
                var $state = $injector.get('$state');
                $state.go('login');
            }
            return $q.reject(response);
        }
    }

    function configureLoginRedirect($httpProvider) {
        $httpProvider.interceptors.push('loginRedirect');
    }
})();
