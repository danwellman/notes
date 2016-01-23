(function () {
    'use strict';

    beforeEach(module('notes'));

    describe('The enableSaveOnEdit directive', function () {

        var $scope, $compile, testElement, sandbox;

        beforeEach(inject(function (_$compile_, $rootScope) {
            $scope = $rootScope.$new();
            $compile = _$compile_;

            sandbox = sinon.sandbox.create();
        }));

        it('stores a reference to the element in the parent scope', function () {
            testElement = $compile('<textarea id="testElement" enable-save-on-edit></textarea>')($scope);

            expect($scope.$parent.editor.id).toEqual('testElement');
        });

        it('sets scope.$parent.edited = true when the input event fires', function () {
            var stub, handler;

            testElement = document.createElement('textarea');
            testElement.setAttribute('enable-save-on-edit');

            stub = sandbox.stub(testElement, 'addEventListener');

            $compile(testElement)($scope);

            handler = stub.args[0][1];
            handler();

            expect($scope.$parent.edited).toEqual(true);
        });
    });

}());
