var gulp = require('gulp');
var args = require('yargs').argv;
var config = require('./gulp.config')();
var browserSync = require('browser-sync');
var del = require('del');
var path = require('path');
var _ = require('lodash');
var $ = require('gulp-load-plugins')({lazy: true});

gulp.task('help', $.taskListing);
gulp.task('default', ['help']);

gulp.task('vet', function () {

    log('vetting ours files');

    return gulp
        .src(config.files)
        .pipe($.if(args.verbose, $.print()))
        .pipe($.jshint())
        .pipe($.jscs())
        .pipe($.jshint.reporter('jshint-stylish', {verbose: true}))
        .pipe($.jshint.reporter('fail'));
});

gulp.task('wiredep', function () {

    log('wiredep - injecting bower dependencies on ' + config.index);

    var options = config.getWiredepDefaultOptions();
    var wiredep = require('wiredep').stream;
    return gulp
        .src(config.index)
        .pipe(wiredep(options))
        .pipe($.inject(gulp.src(config.js)))
        .pipe(gulp.dest(config.sourcePath));
});

gulp.task('inject', ['wiredep', 'templatecache', 'configuration'], function () {

    log('injecting on ' + config.index);

    var templateCache = config.temp + config.templateCache.file;
    var appConfiguration = config.temp + config.appConfigFile.file;

    return gulp
        .src(config.index)
        .pipe($.inject(gulp.src(config.css)))
        .pipe($.inject(gulp.src(templateCache, {read: false}), {
            starttag: '<!-- inject:templates.js -->'
        }))
        .pipe($.inject(gulp.src(appConfiguration, {read: false}), {
            starttag: '<!-- inject:app.config.js -->'
        }))
        .pipe(gulp.dest(config.sourcePath));
});

gulp.task('build', ['inject', 'images', 'favicon', 'fonts'], function () {

    log('Optimizing...');

    var assets = $.useref.assets({searchPath: './'});
    var templateCache = config.temp + config.templateCache.file;
    var appConfiguration = config.temp + config.appConfigFile.file;
    var cssFilter = $.filter('**/*.css');
    var jsLibFilter = $.filter('**/lib.js');
    var jsAppFilter = $.filter('**/app.js');

    return gulp
        .src(config.index)
        .pipe($.plumber())
        .pipe($.inject(gulp.src(templateCache, {read: false}), {
            starttag: '<!-- inject:templates.js -->'
        }))
        .pipe($.inject(gulp.src(appConfiguration, {read: false}), {
            starttag: '<!-- inject:app.config.js -->'
        }))
        .pipe(assets)
        .pipe(cssFilter)
        .pipe($.csso())
        .pipe(cssFilter.restore())
        .pipe(jsLibFilter)
        .pipe($.uglify())
        .pipe(jsLibFilter.restore())
        .pipe(jsAppFilter)
        .pipe($.ngAnnotate())
        .pipe($.uglify())
        .pipe(jsAppFilter.restore())
        .pipe($.rev())
        .pipe(assets.restore())
        .pipe($.useref())
        .pipe($.revReplace())
        .pipe($.replacePath(/\/src\/static\/favicons\//g, '/static/favicons/'))
        .pipe(gulp.dest(config.build));
});

gulp.task('images', ['clean-images'], function () {

    log('Copying images..');

    return gulp
        .src(config.images)
        .pipe($.imagemin())
        .pipe(gulp.dest(config.build + 'static/images/'));
});

gulp.task('fonts', ['clean-fonts'], function () {

    log('Copying fonts..');

    return gulp
        .src(config.fonts)
        .pipe(gulp.dest(config.build + 'fonts/'));
});


gulp.task('favicon', ['clean-favicon'], function () {
    return gulp
        .src(config.favicons)
        .pipe(gulp.dest(config.build + 'static/favicons/'));
});

gulp.task('templatecache', ['clean-template-cache'], function () {

    log('Creating AngularJS $templateCache');

    defineConfigurationEnvironment();

    if (args.environment === 'development') {
        log('Skipping template cache');
        return;
    }

    return gulp
        .src(config.htmlTemplates)
        .pipe($.if(args.verbose, $.print()))
        .pipe($.minifyHtml({empty: true}))
        .pipe($.angularTemplatecache(config.templateCache.file, config.templateCache.options))
        .pipe($.if(args.verbose, $.print()))
        .pipe(gulp.dest(config.temp));
});

gulp.task('serve-dev', ['inject'], function () {

    startBrowserSync();

    return gulp
        .src('./')
        .pipe($.webserver({
            port: 8889,
            livereload: false,
            open: 'http://localhost:3000/src/index.html'
        }));
});

gulp.task('serve-build', function () {
    return gulp
        .src('./dist/')
        .pipe($.webserver({
            port: 9000,
            livereload: false,
            open: 'http://localhost:9000/'
        }));
});

gulp.task('clean-template-cache', function () {
    log('Cleaning all temporary files');
    del(config.temp + config.templateCache.file);
});

gulp.task('clean-configuration', function () {
    log('Cleaning configuration at /temp/' + config.appConfigFile.file);
    del(config.temp + config.appConfigFile.file);
});

gulp.task('clean-images', function () {
    log('Cleaning all images on dist/');
    del(config.build + 'static/images/**/*');
    del(config.build + 'static/images/*.*');
});


gulp.task('clean-fonts', function () {
    log('Cleaning all fonts on dist/');
    del(config.build + 'fonts/*.*');
});


gulp.task('clean-favicon', function () {
    log('Cleaning all favicons on dist/');
    del(config.build + 'static/favicons/*.*');
});

gulp.task('clean', function () {
    log('Cleaning all distribution files');
    del(config.build);
    del(config.temp);
});

gulp.task('test', ['configuration'], function () {
    startTests(true, function () {
    });
});

gulp.task('autotest', ['configuration'], function () {
    startTests(false, function () {
    });
});

gulp.task('configuration', ['clean-configuration'], function () {

    defineConfigurationEnvironment();

    var ngConfigOptions = {
        wrap: true,
        createModule: false,
        environment: args.environment
    };

    return gulp
        .src(config.appConfigFile.source)
        .pipe($.ngConfig('app.core', ngConfigOptions))
        .pipe(gulp.dest('./temp/'));
});

//////////////////////////////////////////////////////////////////////////////////////////////////

function startTests(singleRun, done) {
    var karma = require('karma').server;
    var excludeFiles = [];

    karma.start({
        configFile: __dirname + '/karma.conf.js',
        excludeFiles: excludeFiles,
        singleRun: !!singleRun
    }, karmaCompleted);

    function karmaCompleted(karmaResult) {
        if (karmaResult === 1) {
            done('karma tests failed with code: ' + karmaResult);
        }
        else {
            done();
        }
    }
}

function defineConfigurationEnvironment() {
    if (!args.environment) {
        args.environment = 'development';
    }
}

function startBrowserSync() {
    if (browserSync.active) {
        return;
    }

    log('Starting browser sync');

    var options = {
        proxy: 'localhost:8889',
        port: 3000,
        files: [
            config.sourcePath + '**/*.*'
        ],
        ghostMode: {
            clicks: true,
            location: true,
            forms: true,
            scroll: true
        },
        injectChanges: true,
        logFileChanges: true,
        logLevel: true,
        logPrefix: 'gulp-patterns',
        notify: true,
        reloadDealy: 1000,
        open: false
    };

    browserSync(options);
}

function log(text) {
    if (typeof(text) === 'object') {
        for (var item in text) {
            if (text.hasOwnProperty(item)) {
                $.util.log($.util.colors.white(text[item]));
            }
        }
    }
    else {
        $.util.log($.util.colors.white(text));
    }
}
