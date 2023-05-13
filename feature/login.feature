Feature: login into site swag labs

    Background: Visit the Site swag labs
    Given: I visited the https://www.saucedemo.com
    # Successful Login Scenery
    Scenario: Successful Login
        Given I'm on the login page    
        When I fill my username and my correct password
        And I click the login button
        Then I must be redirected to the homepage
# Incorrect login scenario
   Scenario: Login with incorrect information
        Given I'm on the login page
        When I fill my username and/or my password incorrect
        And I click the login button
        Then I must see an error message stating that my credentials are incorrect
        And I must stay on the login page