/// <reference path="bower_components/iCheck/icheck.js" />
/// <reference path="bower_components/iCheck/icheck.js" />
// Karma configuration
// Generated on Sun Jul 12 2015 15:03:42 GMT-0300 (E. South America Standard Time)

module.exports = function (config) {

    var gulpConfig = require('./gulp.config')();
    var karmaOptions = gulpConfig.getKarmaOptions();

    config.set({

        basePath: './',

        frameworks: ['mocha', 'chai', 'sinon', 'chai-sinon'],

        files: [

            './bower_components/jquery/dist/jquery.js',
            './bower_components/jquery-ui/jquery-ui.js',
            './bower_components/angular/angular.js',
            './bower_components/angular-mocks/angular-mocks.js',
            './bower_components/angular-sanitize/angular-sanitize.js',
            './bower_components/angular-animate/angular-animate.js',
            './bower_components/angular-cookies/angular-cookies.js',
            './bower_components/angular-ui-router/release/angular-ui-router.js',
            './bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
            './bower_components/angular-route/angular-route.js',
            './bower_components/angular-aria/angular-aria.js',
            './bower_components/angular-material/angular-material.js',
            './bower_components/angular-material-icons/angular-material-icons.min.js',
            './bower_components/angular-simple-logger/dist/angular-simple-logger.js',
            './bower_components/lodash/lodash.js',
            './bower_components/angular-google-maps/dist/angular-google-maps.js',
            './bower_components/moment/moment.js',
            './bower_components/angular-moment/angular-moment.js',
            './bower_components/angular-gantt/assets/angular-gantt.js',
            './bower_components/angular-gantt/assets/angular-gantt-plugins.js',
            './bower_components/angular-ui-tree/dist/angular-ui-tree.js',
            './bower_components/angular-ui-mask/dist/mask.js',
            './bower_components/cepdb-js/index.js',
            './bower_components/ngCepDbProvider/index.js',
            './bower_components/angular-directive.g-signin/google-plus-signin.js',
            './bower_components/angular-material-data-table/dist/md-data-table.js',

            './src/app/app.module.js',
            './src/app/**/*.module.js',
            './src/app/**/*.js',
            './temp/app.config.js',
            './src/app/**/*.spec.js',
            './test/templateCache.js'
        ],

        // list of files to exclude
        exclude: [],

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: karmaOptions.preprocessors,

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['mocha', 'coverage'],

        coverageReporter: {
            dir: karmaOptions.coverage.dir,
            reporters: karmaOptions.coverage.reporters
        },

        // reporter options
        mochaReporter: {
            output: 'autowatch'
        },

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_DISABLE,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        //browsers: ['PhantomJS', 'Chrome', 'IE'],
        browsers: ['PhantomJS'],

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false
    })

}
