(function () {
    'use strict';

    angular
        .module('blocks.api')
        .factory('usersApi', usersApi);

    function usersApi($http, EnvironmentConfig, Api) {
        var api = new Api($http, EnvironmentConfig.baseUrl, 'users');
        return {
            getAll: api.getAll,
            get: api.get,
            save: api.save,
            delete: api.delete
        };
    }
})();
