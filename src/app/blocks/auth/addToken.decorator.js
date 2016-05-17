(function () {
    'use strict';

    angular.module('blocks.auth')
        .factory('addToken', addToken)
        .config(configureAddToken);

    function addToken(authenticatedUser, $q) {

        return {
            request: request
        };

        function request(config) {
            if (userAuthenticationIsValid()) {
                config.headers['x-access-token'] = authenticatedUser.profile.token;
            }
            return $q.when(config);
        }

        function userAuthenticationIsValid() {
            return authenticatedUser.profile.token;
        }
    }

    function configureAddToken($httpProvider) {
        $httpProvider.interceptors.push('addToken');
    }
})();
