Feature: Search Process

  Background:
    Given I am logged in
    And I navigate to the process page

  Scenario: Search for a process by folder name and display the results in a table
    When I search for a process by folder name
    Then I should see the process "AUTO-1" in the table

  Scenario: Search for a process by folder name, open the first process, and display its details
    When I search for a process by folder name
    And I open the first process
    Then I should see the process details page

  Scenario: Add a process to the push
    When I search for a process by folder name
    And I open the first process
    And I add the process to the push
    Then I should see a success message

  Scenario: Remove a process from the push
    When I search for a process by folder name
    And I open the first process
    And I remove the process from the push
    Then I should see a success message

  Scenario: Register a process with an error because the system is off
    When I register a process
    Then I should see an error message

  Scenario: Register a process successfully
    When I register a process
    Then I should see a success message

  Scenario: Seek and delete a process
    When I search for a process
    Then I should see the process in the results
    And I delete the process
    Then I should see a confirmation message

  Scenario: Seek and restore a deleted process
    Given I navigate to the deleted process page
    When I search for a deleted process
    And I restore the process
    Then I should see a success message
