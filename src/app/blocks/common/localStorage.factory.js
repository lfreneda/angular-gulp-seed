(function () {
    'use strict';

    angular.module('blocks.common')
        .factory('$localStorage', function ($window) {
            return {
                set: set,
                get: get,
                setObject: setObject,
                getObject: getObject,
                remove: remove
            };

            function set(key, value) {
                $window.localStorage[key] = value;
            }

            function get(key, defaultValue) {
                return $window.localStorage[key] || defaultValue;
            }

            function setObject(key, value) {
                $window.localStorage[key] = JSON.stringify(value);
            }

            function getObject(key) {
                return JSON.parse($window.localStorage[key] || '{}');
            }

            function remove(key) {
                $window.localStorage.removeItem(key);
            }
        });
})();
