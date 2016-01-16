(function () {
    'use strict';

    angular.module('notes').directive('modal', modal);

    function modal() {
        return {
            restrict: 'E',
            templateUrl: 'templates/modal.html'
        };
    }
}());
