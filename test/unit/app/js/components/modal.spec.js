(function () {
    'use strict';

    beforeEach(module('notes'));

    describe('the modal component', function () {

        var $scope, $rootScope, $componentController, modal, sandbox;

        beforeEach(inject(function (_$rootScope_, _$componentController_) {
            $rootScope = _$rootScope_;
            $scope = $rootScope.$new();
            $componentController = _$componentController_;

            sandbox = sinon.sandbox.create();
        }));

        afterEach(function () {
            sandbox.restore();
        });

        describe('.hideModal($event)', function () {

            it('sets the modalIsVisible property to false if the $event.target property is not defined', function () {
                modal = $componentController('modal', { $scope: $scope });

                expect(modal.modalIsVisible).not.toBeDefined();

                modal.hideModal({});

                expect(modal.modalIsVisible).toEqual(false);
            });

            it('sets the modalIsVisible property to true if the $event.target.classList.contains method returns false', function () {
                var mockEvent = { 
                    target: { 
                        classList: { 
                            contains: function () { return false; }
                        }
                    }
                };

                modal = $componentController('modal', { $scope: $scope });
                modal.hideModal(mockEvent);

                expect(modal.modalIsVisible).toEqual(true);
            });
        });

        describe('onInit', function () {

            it('binds handlers for the showModal and hideModal events', function () {
                var onSpy = sandbox.spy($scope, '$on');

                modal = $componentController('modal', { $scope: $scope });
                modal.$onInit();

                expect(onSpy.firstCall.args[0]).toEqual('showmodal');
                expect(onSpy.firstCall.args[1]).toEqual(modal.showModal);
                expect(onSpy.lastCall.args[0]).toEqual('hidemodal');
                expect(onSpy.lastCall.args[1]).toEqual(modal.hideModal);
            });

        });
    });

}());
