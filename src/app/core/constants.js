/* global toastr:false, swal:false */
(function() {
    'use strict';

    angular
        .module('app.core')
        .constant('_', window._)
        .constant('$', window.$)
        .constant('moment', window.moment);
})();
