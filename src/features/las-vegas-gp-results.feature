Feature: 2023 Las Vegas Grand Prix Results

  As a BBC editor
  I want to report on the top 3 finishers of the 2023 Las Vegas Grand Prix
  So that readers get a clear and accurate summary of the race results

  Scenario: Validation In A Table Of Results
    Given I navigate to the Las Vegas GP results page
    Then I should see "Max Verstappen" in position 1
    And I should see "George Russell" in position 2
    And I should see "Sergio Perez" in position 3