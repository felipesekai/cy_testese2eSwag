Feature: login into site Etrium

    Background: Visit the Site Etrium
        Given: I visited the https://www.etrium.com.br
    # Successful Login Scenery
    Scenario: Successful Login
        Given I'm on the login page
        When I fill my email and my correct password
        And I click the login button
        Then I must be redirected to the homepage
    # Incorrect login scenario
    Scenario: Login with incorrect information
        Given I'm on the login page
        When I fill my email and/or my password incorrect
        And I click the login button
        Then I must see an error message stating that my credentials are incorrect
        And I must stay on the login page
    # Incorrect Email scenario
    Scenario: Login with wrong email
        Given I'm on the login page
        When I fill my email incorrect
        And  My password
        And I click the login button
        Then I must see an error message stating that my credentials are incorrect
        And I must stay on the login page