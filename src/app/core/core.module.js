(function() {
    'use strict';

    angular.module('app.core', [
        /*
         * Angular modules
         */
        'ngRoute',
        'ngSanitize',
        'ngAnimate',
        /*
         * Our reusable cross app code modules
         */
        'blocks.exception',
        'blocks.logger',
        'blocks.api',
        'blocks.common',
        'blocks.auth',
        /*
         * 3rd Party modules
         */
        'ui.bootstrap',
        'ui.router',
        'angularMoment',
        'ngMaterial',
        'ngMdIcons',
        'uiGmapgoogle-maps',
        'gantt',
        'gantt.movable',
        'gantt.bounds',
        'gantt.table',
        'gantt.tooltips',
        'md.data.table',
        'ui.mask',
        'ngCepDb',
        'directive.g+signin',
        'materialCalendar',
        'chart.js',
        'ui-rangeSlider',
        'ngTimeSlider',
        'ngclipboard',
        'angulartics',
        'angulartics.google.analytics'
    ]);
})();
