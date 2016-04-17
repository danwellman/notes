(function () {
    'use strict';

    angular.module('notes').filter('truncate', truncate);

    function truncate() {
        return function (string, length) {
            return (string.length > length) ? string.slice(0, length - 1) + '...' : string;
        };
    }
}());
