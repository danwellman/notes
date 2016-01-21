(function () {
    'use strict';

    beforeEach(module('notes'));

    describe('the Notes controller', function () {

        var $scope, $document, $timeout, localStorageService, uuid, sandbox;

        beforeEach(inject(function ($rootScope, _localStorageService_) {
            localStorageService = _localStorageService_;

            $scope = $rootScope.$new();

            sandbox = sinon.sandbox.create();
        }));

        afterEach(function () {
            sandbox.restore();
        });

        describe('when localStorage is not supported', function () {

            beforeEach(inject(function ($controller) {
                sandbox.stub(localStorageService, 'supportsStorage').returns(false);

                $controller('notesController', { $scope: $scope });
            }));

            it('sets the localStorageSupported property to false', function () {
                expect($scope.localStorageSupported).toEqual(false);
            });

        });

        describe('.hideModal()', function () {

            beforeEach(inject(function ($controller) {
                $controller('notesController', { $scope: $scope });
            }));

            describe('when the triggering element has the overlay class', function () {

                it('sets the showModal property to false', function () {

                    var fakeEvent = {
                        target: {
                            classList: {
                                contains: function () {
                                    return true;
                                }
                            }
                        }
                    };

                    $scope.showModal = true;
                    $scope.hideModal(fakeEvent);

                    expect($scope.showModal).toEqual(false);
                });

            });

        });

    });

}());
