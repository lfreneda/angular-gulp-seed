module.exports = function () {

    var sourcePath = './src/';
    var report = './report/';
    var appPath = sourcePath + 'app/';
    var contentPath = sourcePath + 'static/';

    var config = {
        files: [
            './src/**/*.js',
            '!' + appPath + '**/*.spec.js'
        ],
        index: sourcePath + 'index.html',
        sourcePath: sourcePath,
        temp: './temp/',
        build: './dist/',
        js: [
            appPath + '**/*.module.js',
            appPath + '**/*.js',
            contentPath + '**/*.js',
            '!' + appPath + '**/*.spec.js'
        ],
        fonts: [
          './bower_components/font-awesome/fonts/*.*'
        ],
        css: [
            contentPath + 'css/*.*',
            contentPath + 'css/**/*.*'
        ],
        htmlTemplates: [
            appPath + '**/*.html'
        ],
        favicons: [
            contentPath + 'favicons/*.*',
            contentPath + 'favicons/**/*.*'
        ],
        images: [
            contentPath + 'images/*.*',
        ],
        bower: {
            json: require('./bower.json'),
            directory: './bower_components/',
            ignorePath: /\.\./,
            exclude: [
                'bower_components/ng-tags-input/ng-tags-input.min.css'
            ]
        },
        /**
         * Template Cache
         */
        templateCache: {
            file: 'templates.js',
            options: {
                module: 'app.core',
                standAlone: false,
                root: 'app/'
            }
        },
        /**
         * App configuration file
         */
        appConfigFile: {
            file: 'app.config.js',
            source: './app.config.json'
        },
    };

    config.getWiredepDefaultOptions = function () {
        var options = {
            bowerJson: config.bower.json,
            directory: config.bower.directory,
            ignorePath: config.bower.ignorePath,
            exclude: config.bower.exclude
        };
        return options;
    };

    config.getKarmaOptions = function () {
        var options = {
            coverage: {
                dir: report + 'coverage',
                reporters: [
                    {type: 'html', subdir: 'report-html'},
                    {type: 'lcov', subdir: 'report-lcov'},
                    {type: 'text-summary'}
                ]
            },
            preprocessors: {}
        };
        options.preprocessors[appPath + '**/!(*.spec)+(.js)'] = ['coverage'];
        return options;
    };

    return config;
};
