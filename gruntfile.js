module.exports = function (grunt) {
    'use strict';

    var config = {
        pkg: grunt.file.readJSON('package.json')
    };

    function loadConfig(path) {
        var glob = require('glob'),
            object = {},
            key;

        glob.sync('*', { cwd: path }).forEach(function (option) {
            key = option.replace(/\.js$/, '');
            object[key] = require(path + option);
        });

        return object;
    }

    grunt.util._.extend(config, loadConfig('./grunt-tasks/'));
    grunt.initConfig(config);

    require('load-grunt-tasks')(grunt);

    grunt.registerTask('scss', ['sass:dist']);
    grunt.registerTask('lint', ['jshint']);
    grunt.registerTask('test', ['clean:coverage', 'karma']);

};
