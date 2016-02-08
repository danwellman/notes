Feature: Save Button
    As a user of the application
    I would like to be able to save my notes

Scenario: Enabling Save Button
    Given I am using the app
    When I focus the textarea
        And I begin typing
    Then the save button is enabled
