(function () {
    'use strict';

    beforeEach(module('notes'));

    describe('The localStorage service', function () {

        var localStorageService, $window, sandbox;

        beforeEach(inject(function (_localStorageService_, _$window_) {
            localStorageService = _localStorageService_;
            $window = _$window_;

            sandbox = sinon.sandbox.create();
        }));

        afterEach(function () {
            sandbox.restore();
        });

        describe('.supportsStorage()', function () {

            it('returns true if localStorage is supported', function () {
                expect(localStorageService.supportsStorage()).toEqual(true);
            });

            it('returns false if localStorage is not supported', function () {
                sandbox.stub($window, 'hasOwnProperty').returns(false);

                expect(localStorageService.supportsStorage()).toEqual(false);
            });

        });

        describe('.getNotes()', function () {

            it('returns an array of note objects', function () {
                var testJSON = JSON.stringify([{}]);

                sandbox.stub($window.localStorage, 'getItem').returns(testJSON);

                expect(localStorageService.getNotes().length).toEqual(1);
            });

            it('returns null when localStorage does contain any notes', function () {
                expect(localStorageService.getNotes()).toBe(null);
            });

        });

    });

}());
