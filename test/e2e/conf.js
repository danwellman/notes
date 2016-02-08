exports.config = {
    framework: 'custom',
    frameworkPath: '../../node_modules/protractor-cucumber-framework',
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: 'features/**/*.feature',
    cucumberOpts: {
        require: 'steps/**/*.steps.js',
        format: 'pretty'
    }
};
