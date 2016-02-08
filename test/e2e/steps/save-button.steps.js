var chai = require('chai');

module.exports = function () {
    this.Given(/^I am using the app$/, function (callback) {
        browser.get('http://localhost:55345/app/app.html').then(function () {
            callback();
        });
    });

    this.When(/^I focus the textarea$/, function (callback) {
        var textarea = element(by.css('textarea'));

        textarea.click().then(function () {
            callback();
        });
    });

    this.When(/^I begin typing$/, function (callback) {
        var textarea = element(by.css('textarea'));

        textarea.sendKeys('a').then(function () {
            callback();
        });
    });

    this.Then(/^the save button is enabled$/, function (callback) {
        var button = element(by.id('save'));

        button.isEnabled().then(function (enabledState) {
            chai.expect(enabledState).to.equal(true);
            callback();
        });
    });
};
