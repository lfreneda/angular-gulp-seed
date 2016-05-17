(function () {
    'use strict';

    angular.module('blocks.auth').factory('auth', auth);

    function auth($http, EnvironmentConfig, authenticatedUser) {

        var authenticationUrl = EnvironmentConfig.baseUrl + 'authenticate';

        return {
            authenticateWithGoogle: authenticateWithGoogle,
            authenticateWithAccount: authenticateWithAccount
        };

        function authenticateWithGoogle(googleAccessToken) {
            return $http.post(authenticationUrl, {
                token: googleAccessToken,
                provider: 'google'
            }).then(setAuthenticatedProfile);
        }

        function authenticateWithAccount(username, password) {
            return $http.post(authenticationUrl, {
                email: username,
                password: password
            }).then(setAuthenticatedProfile);
        }

        function setAuthenticatedProfile(response) {
            authenticatedUser.setProfile(response.data);
            return response.data;
        }
    }
})();
