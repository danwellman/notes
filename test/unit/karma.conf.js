// Karma configuration
// Generated on Thu Jan 07 2016 20:49:39 GMT+0000 (GMT Standard Time)

var sourcePreProcessors = ['coverage'],
    sourceReporters = ['progress', 'coverage'],
    singleRunSwitch = true;

function isDebug(argument) {
    return argument === '--debug';
}

if (process.argv.some(isDebug)) {
    sourcePreProcessors = [];
    sourceReporters = ['progress'];
    singleRunSwitch = false;
}

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '../../',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine', 'sinon'],


    // list of files / patterns to load in the browser
    files: [
      'app/vendor/angular.min.js',
      'test/angular-mocks.js',
      'app/js/**/*.js',
      'node_modules/jasmine-sinon/lib/jasmine-sinon.js',
      'test/unit/app/js/**/*.spec.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
        'app/js/**/*.js': sourcePreProcessors
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: sourceReporters,

    // configure reporters
    coverageReporter: {
        dir: 'test/unit/coverage',
        reporters: [
            { type: 'text-summary' },
            { type: 'html', subdir: 'report-html' }
        ]
    },

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: singleRunSwitch,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
