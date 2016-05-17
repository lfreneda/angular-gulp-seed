(function () {
    'use strict';
    angular
        .module('blocks.api', [])
        .constant('Api', Api);

    function Api($http, baseUrl, resourceName) {
        var self = this;
        self.baseUrl = baseUrl;
        self.resourceName = resourceName;

        self.getUrl = function () {
            return self.baseUrl + self.resourceName + '/';
        };

        self.delete = function(id) {
            return $http.delete(self.getUrl() + id).then(self.whenCompleted);
        };

        self.getAll = function () {
            return $http.get(self.getUrl()).then(self.whenCompleted);
        };

        self.get = function (id) {
            return $http.get(self.getUrl() + id).then(self.whenCompleted);
        };

        self.save = function (resource) {
            if (resource.id) {
                return $http.put(self.getUrl() + resource.id, resource)
                            .then(self.whenCompleted);
            } else {
                return $http.post(self.getUrl(), resource)
                            .then(self.whenCompleted);
            }
        };

        self.whenCompleted = function (result) {
            return result.data;
        };

    }
})();
