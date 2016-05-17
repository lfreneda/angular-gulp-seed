(function () {
    'use strict';

    angular.module('blocks.common')
        .factory('guidGenerator', guidGenerator);

    function guidGenerator() {

        return {
            generateGuid: generateGuid,
            generateShortGuid: generateShortGuid
        };

        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }

        function generateShortGuid() {
            return s4() + s4();
        }

        function generateGuid() {
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();
        }
    }
})();