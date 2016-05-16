(function () {
    'use strict';

    angular.module('notes').component('modal', {
        templateUrl: 'templates/modal.html',
        bindings: {
            modalTitle: '@?',
            modalId: '@',
            modalType: '@?',
            onConfirm: '&'
        },
        transclude: true,
        controllerAs: 'modal',
        controller: ['$scope', function ($scope) {
            var modal = this;

            modal.hideModal = function ($event) {
                if (!$event.target) {
                    $event.target = {
                        classList: {
                            contains: function () { return true; }
                        }
                    };
                }
                modal.modalIsVisible = !$event.target.classList.contains('overlay');
            };

            modal.showModal = function ($event, data) {
                if (data && data.id === modal.modalId) {
                    modal.modalIsVisible = true;
                }
            };

            modal.$onInit = function () {
                $scope.$on('showmodal', modal.showModal);
                $scope.$on('hidemodal', modal.hideModal);
            };
        }]
    });
}());
