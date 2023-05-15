Feature: Activities

Background: Visit the Site Etrium and Login
Given I visited the https://www.etrium.com.br
And I'm on the login page
When I fill my email and my correct password
And I click the login button
Then I must be redirected to the homepage

Scenario: Create a new activity
Given I'm on the homepage
And I click the "New Activity" button
When I add the title "atividade criada pelo cypress"
And I select the working groups and subgroups
And I select the responsible and interested parties
And I set the start and end dates
And I click the "Cadastrar" button
Then the activity must be created successfully

Scenario: View an activity
Given I'm on the homepage
And I click on the first activity in the list
Then I see the details of the activity

Scenario: Change activity title
Given I am on the homepage
And I click in an activity
And I go to the title field of the activity
When I change the title to "atividade cypress"
And I click the button to save the changes
Then I hope the activity title will be changed successfully

Scenario: Add description to the activity
Given I am on the homepage
And I click in an activity
And I go to the description field of the activity
When I add the description "descrição adicionada pelo cypress"
And I click the button to save the changes
Then I hope the activity description will be changed successfully

Scenario: Change activity status
Given I am on the homepage
And I click in an activity
And I go to the status field of the activity
When I select "Em Atendimento" status
And I click the button to save the changes
Then I hope the activity status will be changed successfully

Scenario: Search for a process that does not exist
Given I am on the homepage
And I click in an activity with process
When I search for a non-existent process
Then I should see an error message indicating that the process was not found

Scenario: Search for a process and add it to the activity
Given I am on the homepage
And I click in an activity with process
When I search for a process
And I select a process from the search results
And I select the working groups and subgroups
And I select the responsible and interested parties
And I save the changes
Then the process should be added to the activity successfully

Scenario: Remove process without selecting a responsible
Given I am on the homepage
And I click in an activity with process
And I see if there is a process
When I remove the process
And I change the working group to "cy_grup"
And I save the changes
Then I should see an error message indicating that the activity needs at least one responsible party

Scenario: Remove process of an activity
Given I am on the homepage
And I click in an activity with process
And I see if there is a process
When I remove the process
And I change the working group to "cy_grup"
And I select the responsible and interested parties
And I save the changes
Then the process should be added to the activity successfully

