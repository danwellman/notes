(function () {
    'use strict';

    beforeEach(module('notes'));

    describe('the Truncate filter', function () {

        var truncateFilter, sandbox;

        beforeEach(inject(function (_truncateFilter_) {
            truncateFilter = _truncateFilter_;
        }));

        it('truncates a string at the specified length and adds an ellipsis', function () {
            var testString = 'Test',
                truncatedString = truncateFilter(testString, 1);

            expect(truncatedString.length).toEqual(4);
            expect(/\.\.\.$/.test(truncatedString)).toEqual(true);
        });

        it('does not truncate the string if less than or equal to the specified length', function () {
            var testString = 'Test',
                truncatedString = truncateFilter(testString, 4);

            expect(/\.\.\.$/.test(truncatedString)).toEqual(false);
        });

    });
}());
